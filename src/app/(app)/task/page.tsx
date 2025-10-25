import TaskWrapper from "@/components/task/task-wrapper";
import { ITaskResponse } from "@/interfaces/task.inferface";
import { fetchTasks } from "@/lib/tasks.api";

export default async function TaskPage() {
  const data: ITaskResponse = await fetchTasks({
    dashboardId: "",
  });

  return (
    <>
      <h1 className="mt-10 ml-10 text-2xl font-bold">All Tasks</h1>
      <section className="mt-10 ml-10 mr-10 border border-border rounded-md p-6">
        <TaskWrapper initialData={data} canCreate={false} />
      </section>
    </>
  );
}
