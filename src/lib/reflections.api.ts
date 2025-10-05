import {
  IReflection,
  IReflectionResponse,
} from "@/interfaces/reflection.interface";
import { cookies } from "next/headers";
import { API_BASE_URL, getTokens } from "./auth.lib";

export const fetchReflections = async (dashboardId: string) => {
  const { access_token } = await getTokens();

  const res = await fetch(
    `${API_BASE_URL}/reflections?page=1&pageSize=20&sortBy=createdAt&sort=desc&boardId=${dashboardId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch reflections");

  const data: IReflectionResponse = await res.json();

  return data;
};

export const fetchReflectionById = async (
  dashboardId: string,
  reflectionId: string
) => {
  const jar = await cookies();
  const access_token = jar.get("access_token")?.value || null;

  const res = await fetch(
    `${API_BASE_URL}/reflections/${dashboardId}/${reflectionId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch reflection");

  const data: IReflection = await res.json();

  return data;
};
