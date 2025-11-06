import HabitTrackerCard from "@/components/habit-tracker/habit-tracker-card";
import { IHabitTrackerResponse } from "@/interfaces/habit-tracker.interface";
import { fetchAllHabitTrackers } from "@/lib/habit-tracker.api";

export default async function HabitTrackerPage() {
  const data: IHabitTrackerResponse = await fetchAllHabitTrackers();

  return (
    <div>
      <HabitTrackerCard habits={data.items} />
    </div>
  );
}
