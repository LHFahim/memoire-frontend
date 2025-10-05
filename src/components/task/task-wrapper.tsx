"use client";

import { createTaskAction, updateTaskStatus } from "@/actions/task-actions";
import {
  ICreateTaskPayload,
  ITaskResponse,
  TaskStatusEnum,
} from "@/interfaces/task.inferface";
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
    next: TaskStatusEnum
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

  const handleCreateTask = async (
    dashboardId: string,
    payload: ICreateTaskPayload
  ) => {
    // api call
    try {
      const newTask = await createTaskAction({ dashboardId, payload });

      setDataState((prevState) => ({
        ...prevState,
        items: [...prevState.items, newTask],
      }));
    } catch (error) {
      console.error("Error creating task:", error);
      setDataState(dataState);
    }
  };

  return (
    <TaskTable
      data={dataState}
      onToggle={handleToggle}
      onCreate={handleCreateTask}
    />
  );
}
