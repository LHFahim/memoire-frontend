import {
  IHabitTracker,
  IHabitTrackerResponse,
} from "@/interfaces/habit-tracker.interface";
import { cookies } from "next/headers";
import { API_BASE_URL, getTokens } from "./auth.lib";

export const fetchAllHabitTrackers = async () => {
  const { access_token } = await getTokens();

  const res = await fetch(
    `${API_BASE_URL}/habits?page=1&pageSize=20&sortBy=createdAt&sort=desc`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch habit trackers");

  const data: IHabitTrackerResponse = await res.json();

  return data;
};

export const fetchHabitTrackerById = async (id: string) => {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_BASE_URL}/habits/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch habit tracker by ID");

  const data: IHabitTracker = await res.json();

  return data;
};

export const fetchLastActiveSession = async (
  habitId: string,
  sessionId: string
) => {
  const access_token = (await cookies()).get("access_token")?.value;

  const res = await fetch(
    `${API_BASE_URL}/habits/${habitId}/session/${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    // throw new Error(text || "Failed to fetch last active session");
  }

  if (res.ok) {
    const data = await res.json();

    return data;
  }
};

export const fetchAllHabitSessions = async (habitId: string) => {
  const access_token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${API_BASE_URL}/habits/${habitId}/habit-sessions`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to fetch habit sessions");
  }

  const data = await res.json();

  return data;
};
