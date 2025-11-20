// Dashboard main page - /dashboard
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
        Overview
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-500">Users</p>
          <p className="text-2xl font-bold text-black dark:text-white">1,234</p>
        </div>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-500">Sales</p>
          <p className="text-2xl font-bold text-black dark:text-white">
            $12,345
          </p>
        </div>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-500">Conversion</p>
          <p className="text-2xl font-bold text-black dark:text-white">3.2%</p>
        </div>
      </div>
    </div>
  );
}
