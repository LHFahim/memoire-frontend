"use server";

import { API_BASE_URL } from "@/lib/auth.lib";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export const createHabitTrackerAction = async (formData: FormData) => {
  const access_token = (await cookies()).get("access_token")?.value;

  const title = (formData.get("title") || "").toString().trim();
  const description = (formData.get("description") || "").toString().trim();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const res = await fetch(`${API_BASE_URL}/habits`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, timezone }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to create habit tracker");
  }

  const data = await res.json();

  revalidatePath("/habit-tracker");
  redirect(`/habit-tracker/${data.id}`);
};
