"use client";

import { updateTaskStatus } from "@/actions/task-actions";
import { ITaskResponse, TaskStatus } from "@/interfaces/task.inferface";
import { startTransition, useState } from "react";
import TaskTable from "./task-table";

export default function TaskWrapper({
  initialData,
}: {
  initialData: ITaskResponse;
}) {
  const [dataState, setDataState] = useState<ITaskResponse>(initialData);

  const handleToggle = async (
    dashboardId: string,
    taskId: string,
    next: TaskStatus
  ) => {
    // optimistic update
    const nextData = {
      ...dataState,
      items: dataState.items.map((task) =>
        task.id === taskId ? { ...task, status: next } : task
      ),
    };
    setDataState(nextData);

    // API call
    startTransition(async () => {
      try {
        await updateTaskStatus({ dashboardId, taskId, status: next });
      } catch (error) {
        console.error("Error toggling task status:", error);
        setDataState(dataState);
      }
    });
  };

  return <TaskTable data={dataState} onToggle={handleToggle} />;
}
