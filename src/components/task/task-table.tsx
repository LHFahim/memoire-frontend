"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITaskResponse, TaskStatus } from "@/interfaces/task.inferface";
import { useParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

interface TodoBoardProps {
  data: ITaskResponse;
  onToggle?: (dashboardId: string, taskId: string, next: TaskStatus) => void;
}

export default function TaskTable({ data, onToggle }: TodoBoardProps) {
  const params = useParams();

  const tasks = data?.items ?? [];

  if (!tasks.length) {
    return <div className="text-sm text-muted-foreground">No tasks yet.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead className="w-[500px]">Description</TableHead>
          <TableHead className="w-[500px]">Status</TableHead>
          <TableHead className="w-[300px]">Priority</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Checkbox
                id={`task-${task.id}`}
                defaultChecked={task.status === TaskStatus.COMPLETED}
                onClick={() =>
                  onToggle?.(
                    params.dashboardId as string,
                    task.id,
                    task.status === TaskStatus.COMPLETED
                      ? TaskStatus.PENDING
                      : TaskStatus.COMPLETED
                  )
                }
              />
            </TableCell>

            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell className="space-x-2 text-center">{task.type}</TableCell>
            <TableCell className="text-center">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
