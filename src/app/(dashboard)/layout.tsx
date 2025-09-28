"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "Dashboard", href: "#", icon: "🏠" },
  { label: "Manage Habit", href: "#", icon: "🧭" },
  { label: "Analytics & Report", href: "#", icon: "📈" },
  { label: "Fun Challenges", href: "#", icon: "🎯" },
  { label: "Community", href: "#", icon: "👥" },
  { label: "Assessment", href: "#", icon: "✅" },
];

export default function DashboardLayout({
  children,
  greeting = "Hello Fahim!",
}: {
  children: React.ReactNode;
  greeting?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* shell grid: sidebar + main */}
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px,1fr]">
        {/* Sidebar */}
        <aside className="border-r border-stone-200 bg-stone-100/70 md:sticky md:top-0 md:h-screen">
          {/* mobile header */}
          <div className="flex items-center justify-between px-4 py-4 md:hidden">
            <div className="font-semibold">Wellnessty</div>
            <button
              onClick={() => setOpen((p) => !p)}
              className="rounded-xl border border-stone-300 px-3 py-2 text-sm"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>

          {/* desktop brand */}
          <div className="hidden items-center gap-2 px-5 py-5 md:flex">
            <div className="h-8 w-8 rounded-full bg-stone-300" />
            <span className="text-lg font-semibold">Memoire</span>
          </div>

          {/* nav */}
          <nav
            id="mobile-nav"
            className={`md:block ${open ? "block" : "hidden"}`}
          >
            <ul className="space-y-1 px-2 pb-6 md:px-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-stone-200/70 aria-[current=page]:bg-stone-300/70"
                  >
                    <span className="w-5 text-center">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main column: topbar + content */}
        <div className="flex min-h-screen flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/80 backdrop-blur supports-[backdrop-filter]:bg-stone-50/60">
            <div className="flex h-16 items-center gap-4 px-4 md:px-6">
              {/* greeting */}
              <div className="flex-1">
                <p className="text-sm text-stone-500">
                  Let’s begin your wellness journey
                </p>
                <h1 className="text-lg font-semibold">{greeting}</h1>
              </div>

              {/* search */}
              <form
                role="search"
                className="relative hidden w-full max-w-sm md:block"
              >
                <input
                  type="search"
                  placeholder="Search here"
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-2 text-sm outline-none ring-0 placeholder:text-stone-400 focus:border-stone-400"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                  ⌘K
                </span>
              </form>

              {/* profile / actions */}
              <div className="flex items-center gap-2">
                <button
                  className="rounded-2xl border border-stone-300 px-3 py-2 text-sm hover:bg-white"
                  aria-label="Notifications"
                >
                  🔔
                </button>
                <div
                  className="h-8 w-8 rounded-full bg-stone-300"
                  aria-hidden
                />
              </div>
            </div>
          </header>

          {/* Content area */}
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
            {/* page max width */}
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
