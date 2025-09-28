// components/Topbar.tsx
export default function Topbar() {
  return (
    <div className="flex h-14 items-center gap-4 px-4">
      <div className="flex-1">
        <div className="text-xs text-gray-500">Let’s begin your journey</div>
        <div className="text-sm font-medium">Hello Fahim</div>
      </div>
      <form className="hidden w-full max-w-sm md:block">
        <input
          type="search"
          placeholder="Search…"
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </form>
      <div className="h-8 w-8 rounded-full bg-gray-200" />
    </div>
  );
}
