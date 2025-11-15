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

// planning to make it dynamic later
export function CreateHabitTrackerDialog({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <section className="flex justify-end">
          <Button variant="outline">New Habit</Button>
        </section>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Habit Tracker</DialogTitle>
          <DialogDescription>
            Provide a name and description for your new habit.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue="Mindful Meditation"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue="Practice 10 minutes of meditation each morning to improve focus and calm the mind."
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
