"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function Clock({
  shouldClockBeActive,
  lastActiveSessionStartedAt,
  endAction,
  startAction,
}: {
  shouldClockBeActive: boolean;
  lastActiveSessionStartedAt?: string;
  endAction?: () => Promise<void>;
  startAction: () => Promise<void>;
}) {
  const [elapsed, setElapsed] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!shouldClockBeActive || !lastActiveSessionStartedAt) {
      setElapsed({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const calcElapsed = () => {
      const startedAt = new Date(lastActiveSessionStartedAt).getTime();
      if (Number.isNaN(startedAt)) return;

      const diffMs = Date.now() - startedAt;
      const totalSec = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setElapsed({ hours, minutes, seconds });
    };

    calcElapsed();
    const id = setInterval(calcElapsed, 1000);

    return () => clearInterval(id);
  }, [lastActiveSessionStartedAt, shouldClockBeActive]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-1">
      <div className="text-sm text-muted-foreground">Active Duration</div>
      <div className="flex flex-col text-lg font-semibold tabular-nums">
        <span>Hours: {shouldClockBeActive ? elapsed.hours : 0}</span>
        <span>Minutes: {shouldClockBeActive ? elapsed.minutes : 0}</span>
        <span>Seconds: {shouldClockBeActive ? elapsed.seconds : 0}</span>

        {endAction && (
          <form action={endAction} className="mt-5 w-full">
            <Button
              className="bg-red-500 text-white py-1 px-2 rounded-lg w-full"
              disabled={!shouldClockBeActive}
            >
              End Session
            </Button>
          </form>
        )}

        <form action={startAction} className="mt-2 w-full">
          <Button
            className="bg-green-700 w-full"
            disabled={shouldClockBeActive}
          >
            Start a new Session
          </Button>
        </form>
      </div>
    </div>
  );
}
