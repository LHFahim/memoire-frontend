import ReflectionDetails from "@/components/reflection/reflection-details";
import { fetchReflectionById } from "@/lib/reflections.api";

export default async function ReflectionPage({
  params,
}: {
  params: { dashboardId: string; reflectionId: string };
}) {
  const { dashboardId, reflectionId } = params;

  const reflection = await fetchReflectionById(dashboardId, reflectionId);

  return (
    <div>
      <ReflectionDetails reflection={reflection} />
    </div>
  );
}
