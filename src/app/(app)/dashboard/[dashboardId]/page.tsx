import TaskWrapper from "@/components/task/task-wrapper";
import { ITaskResponse } from "@/interfaces/task.inferface";
import { fetchDashboardById } from "@/lib/dashboard.api";
import { fetchTasks } from "@/lib/tasks.api";

export default async function DashboardPage({
  params,
}: {
  params: { dashboardId: string };
}) {
  const dashboard = await fetchDashboardById(params?.dashboardId || "");

  const tasks: ITaskResponse = await fetchTasks({
    dashboardId: dashboard.id || "",
  });

  return (
    <>
      <section className="mt-10 ml-10 space-y-2">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage all your tasks here
        </p>
      </section>
      <section className="ml-28 mt-10 mr-28 border border-border rounded-md p-6">
        <TaskWrapper initialData={tasks} />
      </section>
    </>
  );
}
