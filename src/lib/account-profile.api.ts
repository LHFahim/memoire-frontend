import { IAccountProfile } from "@/interfaces/account-profile.interface";
import { cookies } from "next/headers";
import { API_BASE_URL } from "./auth.lib";

export const fetchAccountProfile = async () => {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_BASE_URL}/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: IAccountProfile = await res.json();

  return data;
};
