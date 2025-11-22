import Link from "next/link";
import { DocPage } from "../types";

export const homePage: DocPage = {
  title: "Documentation",
  content: (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400">
        Welcome to the Next.js Demo documentation. Learn how to build modern web applications with Next.js App Router.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/docs/intro" className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
          <h3 className="font-semibold text-black dark:text-white mb-1">Introduction</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Get started with Next.js basics</p>
        </Link>

        <Link href="/docs/guides" className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
          <h3 className="font-semibold text-black dark:text-white mb-1">Guides</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Step-by-step tutorials</p>
        </Link>

        <Link href="/docs/api" className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
          <h3 className="font-semibold text-black dark:text-white mb-1">API Reference</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Detailed API documentation</p>
        </Link>

        <Link href="/docs/examples" className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
          <h3 className="font-semibold text-black dark:text-white mb-1">Examples</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Code examples and patterns</p>
        </Link>
      </div>
    </div>
  ),
};
