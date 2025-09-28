// components/Sidebar.tsx
import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/reports", label: "Reports" },
];

export default function Sidebar() {
  return (
    <nav className="p-4">
      <div className="mb-4 text-lg font-semibold">Wellnessty</div>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
