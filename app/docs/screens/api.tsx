import { DocPage } from "../types";

export const apiPage: DocPage = {
  title: "API Reference",
  content: (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400">
        Detailed API documentation for Next.js features.
      </p>

      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-black dark:text-white mb-1">Components</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Image, Link, Script, Font</p>
        </div>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-black dark:text-white mb-1">Functions</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">fetch, cookies, headers, redirect</p>
        </div>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-black dark:text-white mb-1">next.config.js</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Configuration options</p>
        </div>
      </div>
    </div>
  ),
};
