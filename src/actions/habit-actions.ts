"use server";

import { API_BASE_URL } from "@/lib/auth.lib";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function endHabitSessionAction({
  habitId,
  sessionId,
}: {
  habitId: string;
  sessionId: string;
}) {
  const access_token = (await cookies()).get("access_token")?.value;

  const res = await fetch(
    `${API_BASE_URL}/habits/${habitId}/session/${sessionId}/end`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endedAt: new Date().toISOString() }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to create dashboard");
  }

  const data = await res.json();

  revalidatePath("/habit-tracker");

  return data;
}
