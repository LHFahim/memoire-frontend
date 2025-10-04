import { IDashboard } from "@/interfaces/dashboard.interface";
import DashboardTable from "../table/table";

interface DashboardProps {
  dashboards: IDashboard[];
}

export default function Dashboard({ dashboards }: DashboardProps) {
  return (
    <>
      <section className="p-4 m-10 border rounded-lg">
        <DashboardTable dashboards={dashboards} />
      </section>
    </>
  );
}
