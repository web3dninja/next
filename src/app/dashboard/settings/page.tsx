// Dashboard Settings - /dashboard/settings
export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
        Settings
      </h1>

      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <h3 className="font-medium text-black dark:text-white mb-2">
            Profile
          </h3>
          <p className="text-sm text-zinc-500">Profile settings...</p>
        </div>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <h3 className="font-medium text-black dark:text-white mb-2">
            Notifications
          </h3>
          <p className="text-sm text-zinc-500">Notification settings...</p>
        </div>
      </div>
    </div>
  );
}
