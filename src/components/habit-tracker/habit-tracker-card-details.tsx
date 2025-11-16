import {
  endHabitSessionAction,
  startHabitSessionAction,
} from "@/actions/habit-actions";
import {
  IHabitSession,
  IHabitTracker,
} from "@/interfaces/habit-tracker.interface";
import { fetchAllHabitSessions } from "@/lib/habit-tracker.api";
import { formatDate } from "@/lib/utils.lib";
import { Label } from "../ui/label";
import Clock from "./clock";
import HabitSessionsTable from "./habit-sessions-table";

export default async function HabitTrackerCardDetails({
  habit,
}: {
  habit: IHabitTracker;
}) {
  const allHabitSessions = await fetchAllHabitSessions(habit.id);
  const sortedSessions = allHabitSessions.sort(
    (a: { startedAt: string }, b: { startedAt: string }) =>
      new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );

  const lastActiveSession = allHabitSessions.find(
    (session: IHabitSession) => session.endedAt === null
  );

  const shouldClockBeActive = Boolean(lastActiveSession);

  // const lastActiveSession = await fetchLastActiveSession(
  //   habit.id,
  //   habit.lastHabitSession!
  // );

  // const shouldClockBeActive = Boolean(
  //   lastActiveSession && !lastActiveSession.endedAt
  // );

  const endHSAction = endHabitSessionAction.bind(null, {
    habitId: (habit.id as string) || "",
    sessionId: (lastActiveSession?.id as string) || "",
  });

  const startHSAction = startHabitSessionAction.bind(null, {
    habitId: habit.id as string,
  });

  return (
    <div className="space-y-30">
      <section className="grid grid-cols-1 md:grid-cols-2">
        <section className="space-y-2 p-5">
          <Label className="font-black text-lg">Habit Details</Label>
          <Label>
            Name:{" "}
            <span className="text-sm text-muted-foreground">{habit.title}</span>
          </Label>

          <Label>
            Description:{" "}
            <span className="text-sm text-muted-foreground">
              {habit.description}
            </span>
          </Label>

          <Label>
            Created on
            <span className="text-sm text-muted-foreground">
              {formatDate(habit.createdAt)}
            </span>
          </Label>

          <Label>
            You are in{" "}
            <span className="text-sm text-muted-foreground">
              {habit.timezone}
            </span>{" "}
            timezone
          </Label>
        </section>
        <section className="flex items-center justify-center">
          <Clock
            shouldClockBeActive={shouldClockBeActive}
            lastActiveSessionStartedAt={lastActiveSession?.startedAt}
            endAction={endHSAction}
            startAction={startHSAction}
          />
        </section>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <section className="p-5">
          <Label className="font-black text-lg">Sessions History</Label>
          <HabitSessionsTable sessions={sortedSessions} />
        </section>
        <section>{/* graphic representation of sessions */}</section>
      </section>
    </div>
  );
}
