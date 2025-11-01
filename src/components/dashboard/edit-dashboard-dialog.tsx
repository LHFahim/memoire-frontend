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
import { Label } from "@/components/ui/label";
import { IDashboard } from "@/interfaces/dashboard.interface";

export function EditDashboardDialog({
  dashboard,
  action,
}: {
  dashboard: IDashboard;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit this dashboard</DialogTitle>
          <DialogDescription>
            Edit your dashboard&apos;s name and description.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <Input type="hidden" name="dashboardId" value={dashboard.id} />
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={dashboard.name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={dashboard.description}
              />
            </div>
          </div>{" "}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>{" "}
        </form>
      </DialogContent>
    </Dialog>
  );
}
