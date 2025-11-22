import { DocPage } from "../types";

export const examplesPage: DocPage = {
  title: "Examples",
  content: (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400">
        Code examples and common patterns for Next.js applications.
      </p>

      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-black dark:text-white mb-1">Authentication</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">User login and session management</p>
        </div>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-black dark:text-white mb-1">Database</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Prisma, Drizzle, MongoDB integration</p>
        </div>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-black dark:text-white mb-1">Forms</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Server Actions and form handling</p>
        </div>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-black dark:text-white mb-1">Testing</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Jest, Playwright, Cypress</p>
        </div>
      </div>
    </div>
  ),
};
