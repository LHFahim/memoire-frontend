"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IDashboard } from "@/interfaces/dashboard.interface";

export function DeleteDashboardDialog({
  dashboard,
  action,
}: {
  dashboard: IDashboard;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this dashboard</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your dashboard?
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <Input type="hidden" name="dashboardId" value={dashboard.id} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              Delete dashboard
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
