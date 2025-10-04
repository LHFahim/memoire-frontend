import {
  IDashboard,
  IDashboardResponse,
} from "@/interfaces/dashboard.interface";
import { cookies } from "next/headers";
import { API_BASE_URL } from "./auth.lib";

export const fetchDashboards = async () => {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(
    `${API_BASE_URL}/boards?page=1&pageSize=20&sortBy=createdAt&sort=desc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: IDashboardResponse = await res.json();

  return data;
};

export const fetchDashboardById = async (id: string) => {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_BASE_URL}/boards/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: IDashboard = await res.json();

  return data;
};
