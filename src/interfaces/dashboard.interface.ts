export interface DashboardSettings {
  isCommentsEnabled?: boolean;
  isAttachmentsEnabled?: boolean;
}

export enum BoardVisibilityEnum {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  SHARED = "SHARED",
}

export interface IDashboard {
  _id?: string;
  name: string;
  description: string;
  visibility: BoardVisibilityEnum;
  members?: string[];
  settings?: DashboardSettings;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
