import { ReflectionForm } from "@/components/reflection/reflection-form";
import { IDashboardResponse } from "@/interfaces/dashboard.interface";
import { fetchAllBoards } from "@/lib/board.api";

export default async function NotePage() {
  const data: IDashboardResponse = await fetchAllBoards();

  return (
    <div>
      Note Page
      <section className="mt-10 ml-10 mr-10">
        <ReflectionForm boards={data?.items || []} />
      </section>
    </div>
  );
}
