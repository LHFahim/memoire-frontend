"use server";

import { ILoginResponse, ILoginState } from "@/interfaces/auth.interface";
import { API_BASE_URL } from "@/lib/auth.lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (
  prevState: ILoginState,
  formData: FormData
): Promise<ILoginState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: Record<string, string> = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please fix errors and try again.",
      errors,
    };
  }

  const res = await fetch("http://localhost:5000/auth/login/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return {
      ok: false,
      message: "Invalid credentials",
      errors: { email: "Invalid credentials" },
    };
  }

  const data: ILoginResponse = await res.json();

  // createAuthCookies(data);
  const jar = await cookies();

  jar.set("access_token", data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  jar.set("refresh_token", data.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  const name = (data.user?.firstName + " " + data.user?.lastName).trim();
  jar.set("user_name", name || data.user.email, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  redirect("/dashboard");

  return {
    ok: true,
    message: "Logged in successfully.",
    errors: {},
  };
};

export const logoutAction = async () => {
  const jar = await cookies();

  jar.delete("access_token");
  jar.delete("refresh_token");
  jar.delete("user_name");

  redirect("/login");
};

export const changePasswordAction = async (formData: FormData) => {
  console.log("hi ");
  const access_token = (await cookies()).get("access_token")?.value;

  const currentPassword = (formData.get("currentPassword") || "").toString();
  const newPassword = (formData.get("newPassword") || "").toString();
  const confirmPassword = (formData.get("confirmPassword") || "").toString();

  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirm password do not match.");
  }

  const res = await fetch(`${API_BASE_URL}/admin/auth/change-password`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPassword: currentPassword,
      newPassword,
      confirmPassword,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.log("text", text);
    throw new Error(text || "Failed to change password");
  }

  const data = await res.json();

  return data;
};
