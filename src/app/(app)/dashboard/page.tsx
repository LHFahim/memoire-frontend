// import data from "./data.json";

import { IDashboard } from "@/interfaces/dashboard.interface";
import { fetchDashboards } from "@/lib/api";

export default async function Page() {
  const data: IDashboard = await fetchDashboards();
  console.log("🚀 ~ Page ~ data:", data);
  const { name, description, visibility } = data;
  return (
    <>
      <h1>This is your {name}!</h1>
      <h1>{description}:</h1>
      {/* <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div> */}
    </>
  );
}
