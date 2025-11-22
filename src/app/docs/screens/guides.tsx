import Link from "next/link";
import { DocPage } from "../types";

export const guidesPage: DocPage = {
  title: "Guides",
  content: (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400">
        Step-by-step tutorials to help you build with Next.js.
      </p>

      <div className="space-y-4">
        <Link href="/docs/guides/routing" className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
          <h3 className="font-semibold text-black dark:text-white mb-1">Routing</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Learn about the App Router and file-based routing</p>
        </Link>

        <Link href="/docs/guides/data-fetching" className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
          <h3 className="font-semibold text-black dark:text-white mb-1">Data Fetching</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Fetch and cache data in Server Components</p>
        </Link>

        <Link href="/docs/guides/styling" className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
          <h3 className="font-semibold text-black dark:text-white mb-1">Styling</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Different ways to style your application</p>
        </Link>
      </div>
    </div>
  ),
};

export const routingPage: DocPage = {
  title: "Routing",
  content: (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400">
        Next.js uses a file-system based router where folders are used to define routes.
      </p>

      <h2 className="text-xl font-semibold text-black dark:text-white">Route Types</h2>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <h3 className="font-medium text-black dark:text-white mb-2">Static Routes</h3>
          <code className="text-sm">app/about/page.tsx → /about</code>
        </div>

        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <h3 className="font-medium text-black dark:text-white mb-2">Dynamic Routes</h3>
          <code className="text-sm">app/blog/[slug]/page.tsx → /blog/:slug</code>
        </div>

        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <h3 className="font-medium text-black dark:text-white mb-2">Catch-all Routes</h3>
          <code className="text-sm">app/docs/[...slug]/page.tsx → /docs/*</code>
        </div>

        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <h3 className="font-medium text-black dark:text-white mb-2">Route Groups</h3>
          <code className="text-sm">app/(marketing)/pricing/page.tsx → /pricing</code>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/docs/guides" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          ← Back to Guides
        </Link>
        <Link href="/docs/guides/data-fetching" className="text-blue-600 dark:text-blue-400 hover:underline">
          Data Fetching →
        </Link>
      </div>
    </div>
  ),
};

export const dataFetchingPage: DocPage = {
  title: "Data Fetching",
  content: (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400">
        Next.js extends the native fetch API to allow you to configure caching and revalidating behavior for each fetch request on the server.
      </p>

      <h2 className="text-xl font-semibold text-black dark:text-white">Server Components</h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        You can fetch data directly in Server Components using async/await:
      </p>

      <div className="p-4 rounded-lg bg-zinc-900 text-zinc-100 font-mono text-sm overflow-x-auto">
        <pre>{`async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <main>{/* render data */}</main>
}`}</pre>
      </div>

      <h2 className="text-xl font-semibold text-black dark:text-white">Caching</h2>
      <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
        <li><code>cache: &apos;force-cache&apos;</code> - Cache the data (default)</li>
        <li><code>cache: &apos;no-store&apos;</code> - Don&apos;t cache, fetch fresh data</li>
        <li><code>next: &#123; revalidate: 3600 &#125;</code> - Revalidate after 1 hour</li>
      </ul>

      <div className="flex gap-4">
        <Link href="/docs/guides/routing" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          ← Routing
        </Link>
        <Link href="/docs/guides/styling" className="text-blue-600 dark:text-blue-400 hover:underline">
          Styling →
        </Link>
      </div>
    </div>
  ),
};

export const stylingPage: DocPage = {
  title: "Styling",
  content: (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400">
        Next.js supports different ways of styling your application.
      </p>

      <h2 className="text-xl font-semibold text-black dark:text-white">Styling Options</h2>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <h3 className="font-medium text-black dark:text-white mb-2">CSS Modules</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Locally scoped CSS using <code>.module.css</code> files
          </p>
        </div>

        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <h3 className="font-medium text-black dark:text-white mb-2">Tailwind CSS</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Utility-first CSS framework (used in this demo)
          </p>
        </div>

        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <h3 className="font-medium text-black dark:text-white mb-2">CSS-in-JS</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Libraries like styled-components (Client Components only)
          </p>
        </div>

        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <h3 className="font-medium text-black dark:text-white mb-2">Global CSS</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Import CSS files in <code>app/layout.tsx</code>
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/docs/guides/data-fetching" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          ← Data Fetching
        </Link>
        <Link href="/docs/guides" className="text-blue-600 dark:text-blue-400 hover:underline">
          All Guides →
        </Link>
      </div>
    </div>
  ),
};
