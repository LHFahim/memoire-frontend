import HabitTrackerCardDetails from "@/components/habit-tracker/habit-tracker-card-details";
import { fetchHabitTrackerById } from "@/lib/habit-tracker.api";

interface HabitTrackerPageProps {
  params: { habitId: string };
}

export default async function HabitTrackerDetailsPage({
  params,
}: HabitTrackerPageProps) {
  const habit = await fetchHabitTrackerById(params.habitId);

  return (
    <div>
      <HabitTrackerCardDetails habit={habit} />
    </div>
  );
}
