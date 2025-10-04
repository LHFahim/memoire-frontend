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
import { Button } from "../ui/button";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
              <Button variant="outline" size="sm">
                <Link href={`/dashboard/${dashboard._id}/edit`}>Edit</Link>
              </Button>
              <Button variant="outline" size="sm">
                <Link href={`/dashboard/${dashboard._id}/delete`}>Delete</Link>
              </Button>
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
