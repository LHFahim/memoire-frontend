import { IDashboardResponse } from "@/interfaces/dashboard.interface";
import { API_BASE_URL, getTokens } from "./auth.lib";

export const fetchAllBoards = async () => {
  const { access_token } = await getTokens();

  const res = await fetch(
    `${API_BASE_URL}/boards?page=1&pageSize=20&sortBy=createdAt&sort=desc`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch boards");

  const data: IDashboardResponse = await res.json();

  return data;
};
