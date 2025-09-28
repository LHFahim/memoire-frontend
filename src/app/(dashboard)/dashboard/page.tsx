import { IDashboard } from "@/interfaces/dashboard.interface";
import { fetchDashboards } from "@/libs/api";
import { requireAuth } from "@/libs/auth.lib";

export default async function DashboardPage() {
  await requireAuth();

  const data: IDashboard = await fetchDashboards();
  console.log("🚀 ~ DashboardPage ~ dashboards: from page.tsx", data);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
