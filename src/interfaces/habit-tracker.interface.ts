import { IPagination } from "./task.inferface";

export interface IHabitTracker {
  id: string;
  title: string;
  description: string;
  timezone: string;
  lastHabitSession: string | null;
  firstStartedAt: string;
  lastStartedAt: string;
  lastStoppedAt: string | null;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IHabitTrackerResponse {
  items: IHabitTracker[];
  pagination: IPagination;
}
