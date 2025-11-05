import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IHabitSession } from "@/interfaces/habit-tracker.interface";
import { formatDate } from "@/lib/utils.lib";

interface HabitSessionProps {
  sessions: IHabitSession[];
}

export default function HabitSessionsTable({ sessions }: HabitSessionProps) {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Started At</TableHead>
          <TableHead className="w-[200px]">Ended At</TableHead>
          <TableHead className="w-[200px]">Duration</TableHead>
          <TableHead className="w-[200px]">Current</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell className="font-medium">
              {formatDate(session.startedAt)}
            </TableCell>
            <TableCell>
              {session.endedAt ? formatDate(session.endedAt || "") : "Ongoing"}
            </TableCell>
            <TableCell>{session.durationInHours}</TableCell>
            <TableCell>{session.isActive ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
