import { IDashboard } from "@/interfaces/dashboard.interface";
import { cookies } from "next/headers";

const API_BASE_URL = "http://localhost:5000";

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

  const data: IDashboard = await res.json();

  // console.log("Fetch dashboards response:", data);

  return data;
};
