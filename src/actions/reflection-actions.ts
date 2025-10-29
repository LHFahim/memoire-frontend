"use server";

import { ICreateReflectionPayload } from "@/interfaces/reflection.interface";
import { API_BASE_URL } from "@/lib/auth.lib";
import { cookies } from "next/headers";

export const createReflectionAction = async (
  payload: ICreateReflectionPayload
) => {
  const jar = await cookies();
  const access_token = jar.get("access_token")?.value;

  const res = await fetch(`${API_BASE_URL}/reflections`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: payload.title,
      content: payload.content,
      image_url: payload.image_url,
      board: payload.board,
    }),
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`Failed to upload image (${res.status}): ${message}`);
    // throw new Error("Failed to create reflection");
  }

  const data = await res.json();
  return data;
};

export const uploadReflectionImageAction = async (payload: FormData) => {
  const access_token = (await cookies()).get("access_token")?.value || null;

  const res = await fetch(`${API_BASE_URL}/reflections/upload-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: payload,
  });

  if (!res.ok) throw new Error("Failed to upload image");

  const data = await res.json();

  return data;
};

export const deleteReflectionAction = async ({
  reflectionId,
  dashboardId,
}: {
  reflectionId: string;
  dashboardId: string;
}) => {
  const jar = await cookies();
  const access_token = jar.get("access_token")?.value;

  const res = await fetch(
    `${API_BASE_URL}/reflections/${dashboardId}/${reflectionId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to delete reflection");

  const data = await res.json();

  return data;
};
