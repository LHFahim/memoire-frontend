"use server";

import { API_BASE_URL } from "@/lib/auth.lib";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateProfileAction = async (formData: FormData) => {
  const access_token = (await cookies()).get("access_token")?.value;

  const firstName = (formData.get("firstName") || "").toString().trim();
  const lastName = (formData.get("lastName") || "").toString().trim();

  const res = await fetch(`${API_BASE_URL}/profile/update`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to edit dashboard");
  }

  const data = await res.json();

  revalidatePath("/account");
};
