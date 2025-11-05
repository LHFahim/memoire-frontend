import { IHabitTracker } from "@/interfaces/habit-tracker.interface";
import { fetchLastActiveSession } from "@/lib/habit-tracker.api";
import { formatDate } from "@/lib/utils.lib";
import { Label } from "../ui/label";
import Clock from "./clock";

export default async function HabitTrackerCardDetails({
  habit,
}: {
  habit: IHabitTracker;
}) {
  const lastActiveSession = await fetchLastActiveSession(
    habit.id,
    habit.lastHabitSession!
  );

  return (
    <div>
      {/* divide-x border rounded-lg */}
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
          <Clock lastActiveSessionStartedAt={lastActiveSession.startedAt} />
        </section>
      </section>
    </div>
  );
}
