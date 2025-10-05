import { ITaskResponse } from "@/interfaces/task.inferface";
import { cookies } from "next/headers";
import { API_BASE_URL } from "./auth.lib";

export const fetchTasks = async ({ dashboardId }: { dashboardId?: string }) => {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(
    `${API_BASE_URL}/todos?page=1&pageSize=20&sortBy=createdAt&sort=desc&boardId=${dashboardId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: ITaskResponse = await res.json();

  return data;
};

// export const updateTaskStatus = async ({
//   dashboardId,
//   taskId,
//   status,
// }: {
//   dashboardId: string;
//   taskId: string;
//   status: TaskStatus;
// }) => {
//   const { access_token } = await getTokens();

//   const res = await fetch(`${API_BASE_URL}/todos/${dashboardId}/${taskId}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ status }),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to update task status");
//   }

//   const data = await res.json();
//   return data;
// };
