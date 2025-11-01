import {
  deleteDashboardAction,
  editDashboardAction,
} from "@/actions/dashboard-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDashboard } from "@/interfaces/dashboard.interface";
import Link from "next/link";
import { DeleteDashboardDialog } from "../dashboard/delete-dashboard-dialog";
import { EditDashboardDialog } from "../dashboard/edit-dashboard-dialog";
import { Button } from "../ui/button";

interface DashboardProps {
  dashboards: IDashboard[];
}

export default function DashboardTable({ dashboards }: DashboardProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your boards.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[500px]">Description</TableHead>
          <TableHead className="w-[300px]">Visibility</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dashboards.map((dashboard) => (
          <TableRow key={dashboard.id}>
            <TableCell className="font-medium">{dashboard.name}</TableCell>
            <TableCell>{dashboard.description}</TableCell>
            <TableCell>{dashboard.visibility}</TableCell>
            <TableCell className="space-x-2 text-center">
              <Button variant="outline" size="sm">
                <Link href={`/dashboard/${dashboard.id}`}>View</Link>
              </Button>

              <EditDashboardDialog
                dashboard={dashboard}
                action={editDashboardAction}
              />

              <DeleteDashboardDialog
                dashboard={dashboard}
                action={deleteDashboardAction}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
