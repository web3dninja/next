import Link from "next/link";

// Layout for dashboard - shared across all dashboard pages
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4">
        <h2 className="font-semibold text-black dark:text-white mb-4">
          Dashboard
        </h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/analytics"
            className="block px-3 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-3 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Settings
          </Link>
        </nav>
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
