// import data from "./data.json";

import Dashboard from "@/components/dashboard/dashboard";
import { requireAuth } from "@/lib/auth.lib";
import { fetchDashboards } from "@/lib/dashboard.api";

export default async function DashboardPage() {
  await requireAuth();

  const { items } = await fetchDashboards();

  return (
    <>
      <Dashboard dashboards={items} />
    </>
  );
}
