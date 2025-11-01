"use server";

import { API_BASE_URL } from "@/lib/auth.lib";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createDashboardAction(formData: FormData) {
  const access_token = (await cookies()).get("access_token")?.value;

  const name = (formData.get("name") || "").toString().trim();
  const description = (formData.get("description") || "").toString().trim();

  const res = await fetch(`${API_BASE_URL}/boards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to create dashboard");
  }

  const data = await res.json();

  revalidatePath("/dashboard");
  redirect(`/dashboard/${data.id}`);
}
