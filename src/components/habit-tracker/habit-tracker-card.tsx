import { IHabitTracker } from "@/interfaces/habit-tracker.interface";
import { SectionCards } from "../section-cards";

export default function HabitTrackerCard({
  habits,
}: {
  habits: IHabitTracker[];
}) {
  return (
    <div>
      <SectionCards habits={habits} />
    </div>
  );
}
