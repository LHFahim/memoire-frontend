export enum TaskStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum TaskPriorityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TaskTypeEnum {
  PERSONAL = "PERSONAL",
  WORK = "WORK",
  OTHER = "OTHER",
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  type: TaskTypeEnum;
  dueDate: string;
  attachments: string[];
  color: string;
  isPinned: boolean;
  board: string;
  createdBy: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPagination {
  total: number;
  current: number;
  previous: number | null;
  next: number | null;
}

export interface ITaskResponse {
  items: ITask[];
  pagination: IPagination;
}

export interface ICreateTaskPayload {
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  type: TaskTypeEnum;
  dueDate?: string | null;
}
