"use server";

import { TaskStatus } from "@/interfaces/task.inferface";
import { API_BASE_URL } from "@/lib/auth.lib";
import { cookies } from "next/headers";

export const updateTaskStatus = async ({
  dashboardId,
  taskId,
  status,
}: {
  dashboardId: string;
  taskId: string;
  status: TaskStatus;
}) => {
  const jar = await cookies();
  const access_token = jar.get("access_token")?.value || null;

  const res = await fetch(`${API_BASE_URL}/todos/${dashboardId}/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update task status");
  }

  const data = await res.json();
  return data;
};
