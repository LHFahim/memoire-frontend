import { createHabitTrackerAction } from "@/actions/habit-actions";
import { CreateHabitTrackerDialog } from "@/components/habit-tracker/create-habit-tracker-dialog";
import HabitTrackerCard from "@/components/habit-tracker/habit-tracker-card";
import { IHabitTrackerResponse } from "@/interfaces/habit-tracker.interface";
import { fetchAllHabitTrackers } from "@/lib/habit-tracker.api";

export default async function HabitTrackerPage() {
  const data: IHabitTrackerResponse = await fetchAllHabitTrackers();

  return (
    <div>
      <section>
        <CreateHabitTrackerDialog action={createHabitTrackerAction} />
      </section>
      <HabitTrackerCard habits={data.items} />
    </div>
  );
}
