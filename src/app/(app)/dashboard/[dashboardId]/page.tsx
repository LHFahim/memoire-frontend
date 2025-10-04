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
      {/* <div>{dashboard.name} board!</div> */}
      <section className="m-28">
        {/* <h1>{dashboard.description}</h1> */}
        <TaskWrapper initialData={tasks} />
      </section>
    </>
  );
}
