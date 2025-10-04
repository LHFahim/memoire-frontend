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
      <TableHeader style={{ backgroundColor: "#f3f4f6" }}>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[200px] px-4 py-3">Title</TableHead>
          <TableHead className="w-[500px] px-4 py-3">Description</TableHead>
          <TableHead className="w-[500px] px-4 py-3">Status</TableHead>
          <TableHead className="w-[300px] px-4 py-3">Priority</TableHead>
          <TableHead className="text-center px-4 py-3">Type</TableHead>
          <TableHead className="text-center px-4 py-3">Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className="hover:bg-muted">
            <TableCell className="px-4 py-3">
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

            <TableCell className="px-4 py-3 font-medium ">
              {task.title}
            </TableCell>
            <TableCell className="px-4 py-3">{task.description}</TableCell>
            <TableCell className="px-4 py-3">{task.status}</TableCell>
            <TableCell className="px-4 py-3">{task.priority}</TableCell>
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
