import { createDashboardAction } from "@/actions/dashboard-actions";
import { IDashboard } from "@/interfaces/dashboard.interface";
import DashboardTable from "../table/table";
import { Label } from "../ui/label";
import { CreateDashboardDialog } from "./create-dashboard-dialog";

interface DashboardProps {
  dashboards: IDashboard[];
}

export default function Dashboard({ dashboards }: DashboardProps) {
  return (
    <>
      <section className="flex items-center justify-between mb-4 ml-4 mt-4 mr-4">
        <Label className="text-2xl font-bold">Dashboards</Label>
        <CreateDashboardDialog action={createDashboardAction} />
      </section>
      <section className="p-4 m-10 border rounded-lg">
        <DashboardTable dashboards={dashboards} />
      </section>
    </>
  );
}
