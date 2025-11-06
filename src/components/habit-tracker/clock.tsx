"use client";

import { useEffect, useState } from "react";

export default function Clock({
  lastActiveSessionStartedAt,
  endAction,
}: {
  lastActiveSessionStartedAt: string;
  endAction: () => Promise<void>;
}) {
  const [elapsed, setElapsed] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calcElapsed = () => {
      const diffMs =
        Date.now() - new Date(lastActiveSessionStartedAt).getTime();
      const totalSec = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setElapsed({ hours, minutes, seconds });
    };

    calcElapsed();
    const id = setInterval(calcElapsed, 1000);

    return () => clearInterval(id);
  }, [lastActiveSessionStartedAt]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-1">
      <div className="text-sm text-muted-foreground">Active Duration</div>
      <div className="flex flex-col text-lg font-semibold tabular-nums">
        <span>Hours: {elapsed.hours}</span>
        <span>Minutes: {elapsed.minutes}</span>
        <span>Seconds: {elapsed.seconds}</span>
        <button
          className="bg-red-500 text-white py-1 px-2 rounded-lg mt-5"
          onClick={endAction}
        >
          End Session
        </button>
      </div>
    </div>
  );
}
