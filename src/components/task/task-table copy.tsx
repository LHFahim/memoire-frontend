"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ICreateTaskPayload,
  ITask,
  ITaskResponse,
  TaskPriorityEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from "@/interfaces/task.inferface";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface TodoBoardProps {
  data: ITaskResponse;
  onToggle?: (
    dashboardId: string,
    taskId: string,
    next: TaskStatusEnum
  ) => void;
  onCreate?: (
    dashboardId: string,
    payload: {
      title: string;
      description: string;
      status: TaskStatusEnum;
      priority: TaskPriorityEnum;
      type: TaskTypeEnum;
      dueDate?: string | null;
    }
  ) => Promise<void> | void;
}

export default function TaskTable({
  data,
  onToggle,
  onCreate,
}: TodoBoardProps) {
  const params = useParams();

  const tasks = data?.items ?? [];

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(TaskStatusEnum.PENDING);
  const [priority, setPriority] = useState(TaskPriorityEnum.LOW);
  const [type, setType] = useState(TaskTypeEnum.PERSONAL);
  const [dueDate, setDueDate] = useState<string>(""); // yyyy-mm-dd

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus(TaskStatusEnum.PENDING);
    setPriority(TaskPriorityEnum.LOW);
    setType(TaskTypeEnum.PERSONAL);
    setDueDate("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const payload: ICreateTaskPayload = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      type,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };

    if (onCreate) {
      await onCreate(params.dashboardId as string, payload);
      resetForm();
      setShowForm(false);
    }
  };

  const sortedTasks = [...tasks].sort((a: ITask, b: ITask) => {
    if (a.status !== b.status) {
      if (a.status === TaskStatusEnum.PENDING) return -1;
      if (b.status === TaskStatusEnum.PENDING) return 1;
    }

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const totalPages = Math.ceil(sortedTasks.length / pageSize);
  const paginatedTasks = sortedTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  console.log("Paginated Tasks:", paginatedTasks);
  console.log("Sorted Tasks:", sortedTasks);

  return (
    <div className="min-h-[300px] overflow-auto">
      <Table className="w-full">
        <TableHeader style={{ backgroundColor: "#f3f4f6" }}>
          <TableRow>
            <TableHead />
            <TableHead className="w-[200px] px-4 py-3">Title</TableHead>
            <TableHead className="w-[500px] px-4 py-3">Description</TableHead>
            <TableHead className="w-[500px] px-4 py-3">Status</TableHead>
            <TableHead className="w-[300px] px-4 py-3">Priority</TableHead>
            <TableHead className="text-center px-4 py-3">Type</TableHead>
            <TableHead className="text-center px-4 py-3">Due Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="min-h-[400px]">
          {showForm && (
            <TableRow>
              <TableCell />
              {/* empty cell to align with checkbox column */}

              {/* title */}
              <TableCell className="px-2 py-2">
                <input
                  className="w-full rounded border px-2 py-1 text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                />
              </TableCell>

              {/* description */}
              <TableCell className="px-2 py-2">
                <input
                  className="w-full rounded border px-2 py-1 text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description"
                />
              </TableCell>

              {/* status */}
              <TableCell className="px-2 py-2">
                <select
                  className="rounded border px-2 py-1 text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatusEnum)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </TableCell>

              {/* priority  */}
              <TableCell className="px-2 py-2">
                <select
                  className="rounded border px-2 py-1 text-sm"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as TaskPriorityEnum)
                  }
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </TableCell>

              {/* type dropdown */}
              <TableCell className="px-2 py-2 text-center">
                <select
                  className="rounded border px-2 py-1 text-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value as TaskTypeEnum)}
                >
                  <option value="PERSONAL">PERSONAL</option>
                  <option value="WORK">WORK</option>
                </select>
              </TableCell>

              {/* due date*/}
              <TableCell className="px-2 py-2 text-center">
                <input
                  type="date"
                  className="rounded border px-2 py-1 text-sm"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </TableCell>
            </TableRow>
          )}

          {paginatedTasks.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-sm text-gray-500"
              >
                No tasks on this page.
              </TableCell>
            </TableRow>
          )}

          {/* existing tasks */}
          {sortedTasks.length === 0 && !showForm ? (
            <TableRow>
              <TableCell colSpan={7} className="text-sm text-muted-foreground">
                No tasks yet.
              </TableCell>
            </TableRow>
          ) : (
            paginatedTasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-muted">
                <TableCell className="px-4 py-3">
                  <Checkbox
                    id={`task-${task.id}`}
                    defaultChecked={task.status === TaskStatusEnum.COMPLETED}
                    onClick={() =>
                      onToggle?.(
                        params.dashboardId as string,
                        task.id,
                        task.status === TaskStatusEnum.COMPLETED
                          ? TaskStatusEnum.PENDING
                          : TaskStatusEnum.COMPLETED
                      )
                    }
                  />
                </TableCell>

                <TableCell className="px-4 py-3 font-medium">
                  {task.title}
                </TableCell>
                <TableCell className="px-4 py-3">{task.description}</TableCell>
                <TableCell className="px-4 py-3">{task.status}</TableCell>
                <TableCell className="px-4 py-3">{task.priority}</TableCell>
                <TableCell className="text-center">{task.type}</TableCell>
                <TableCell className="text-center">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground" />
                {!showForm ? (
                  <Button size="sm" onClick={() => setShowForm(true)}>
                    Add Task
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        resetForm();
                        setShowForm(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleFormSubmit}>
                      Save Task
                    </Button>
                  </div>
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
