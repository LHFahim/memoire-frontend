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
import { IHabitTracker } from "@/interfaces/habit-tracker.interface";

export function DeleteHabitTrackerDialog({
  habit,
  action,
}: {
  habit: IHabitTracker;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this habit tracker</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your habit tracker?
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <Input type="hidden" name="habitId" value={habit.id} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
