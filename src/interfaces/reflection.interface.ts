import { IPagination } from "./task.inferface";

export enum ReflectionMoodEnum {
  HAPPY = "HAPPY",
  SAD = "SAD",
  NEUTRAL = "NEUTRAL",
}

export enum ReflectionVisibilityEnum {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  SHARED = "SHARED",
}

export interface IReflection {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  image_url?: string;
  board: string;
  visibility: ReflectionVisibilityEnum;
  mood: ReflectionMoodEnum;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReflectionResponse {
  items: IReflection[];
  pagination: IPagination;
}

export interface ICreateReflectionPayload {
  title: string;
  content: string;
  image_url: string;
  board: string;
}
