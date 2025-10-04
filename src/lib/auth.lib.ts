// "use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const API_BASE_URL = "http://localhost:5000";

export const getTokens = async () => {
  const jar = await cookies();
  const access_token = jar.get("access_token")?.value || null;
  const refresh_token = jar.get("refresh_token")?.value || null;

  return { access_token, refresh_token };
};

export const verifyAuthCookies = async (): Promise<string> => {
  const { access_token, refresh_token } = await getTokens();
  if (access_token) return access_token;

  redirect("/login");
};

export const requireAuth = async () => {
  const access_token = await verifyAuthCookies();

  return { access_token };
};

// export const createAuthCookies = async (data: ILoginResponse) => {
//   const jar = await cookies();

//   jar.set("access_token", data.access_token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 30 * 24 * 60 * 60,
//   });

//   jar.set("refresh_token", data.refresh_token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 30 * 24 * 60 * 60,
//   });

//   const name = (data.user?.firstName + " " + data.user?.lastName).trim();
//   jar.set("user_name", name || data.user.email, {
//     httpOnly: false,
//     secure: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 30 * 24 * 60 * 60,
//   });
// };

export const clearAuthCookies = async () => {
  const jar = await cookies();

  jar.delete("access_token");
  jar.delete("refresh_token");
  jar.delete("user_name");
};

export const getAuthUser = async () => {
  const { access_token } = await getTokens();

  if (!access_token) {
    throw new Error("No access token");
  }

  const res = await fetch(`${API_BASE_URL}/profile/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data;
};
