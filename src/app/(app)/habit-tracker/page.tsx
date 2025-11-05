import Clock from "@/components/habit-tracker/clock";
import HabitTrackerCard from "@/components/habit-tracker/habit-tracker-card";
import { IHabitTrackerResponse } from "@/interfaces/habit-tracker.interface";
import { fetchAllHabitTrackers } from "@/lib/habit-tracker.api";

export default async function HabitTrackerPage() {
  const data: IHabitTrackerResponse = await fetchAllHabitTrackers();

  return (
    <div>
      Habit Tracker Page
      <Clock />
      <HabitTrackerCard habits={data.items} />
    </div>
  );
}
