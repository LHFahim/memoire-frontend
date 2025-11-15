"use server";

import { IconHealthRecognition } from "@tabler/icons-react";

import { deleteHabtitTrackerAction } from "@/actions/habit-actions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IHabitTracker } from "@/interfaces/habit-tracker.interface";
import Link from "next/link";
import { DeleteHabitTrackerDialog } from "./habit-tracker/delete-habit-tracker-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export async function SectionCards({ habits }: { habits: IHabitTracker[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {habits.map((habit) => {
        return (
          <Card key={habit.id} className="@container/card">
            <CardHeader>
              <CardTitle className="font-semibold tabular-nums @[250px]/card:text-2xl mb-5">
                {habit.title}
              </CardTitle>
              <CardDescription>{habit.description}</CardDescription>
              <CardAction className="flex flex-col gap-2 w-full">
                <Badge
                  variant="outline"
                  className={`w-full justify-center ${
                    habit.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <IconHealthRecognition className="ml-1 size-4" />
                  {habit.isActive ? (
                    <Label>Active</Label>
                  ) : (
                    <Label>Inactive</Label>
                  )}
                </Badge>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                >
                  <Link href={`/habit-tracker/${habit.id}`}>View here</Link>
                </Button>

                <section className="w-full flex justify-center">
                  {" "}
                  <DeleteHabitTrackerDialog
                    habit={habit}
                    action={deleteHabtitTrackerAction}
                  />
                </section>
              </CardAction>
            </CardHeader>
            {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Visitors for the last 6 months
              </div>
            </CardFooter> */}
          </Card>
        );
      })}
    </div>
  );
}
