import Link from "next/link";
import { DocPage } from "../types";

export const introPage: DocPage = {
  title: "Introduction",
  content: (
    <div className="space-y-6">
      <p className="text-zinc-600 dark:text-zinc-400">
        Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
      </p>

      <h2 className="text-xl font-semibold text-black dark:text-white">Main Features</h2>
      <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
        <li><strong>Routing</strong> - File-system based router built on top of Server Components</li>
        <li><strong>Rendering</strong> - Client-side and Server-side Rendering with Client and Server Components</li>
        <li><strong>Data Fetching</strong> - Simplified data fetching with async/await in Server Components</li>
        <li><strong>Styling</strong> - Support for CSS Modules, Tailwind CSS, and CSS-in-JS</li>
        <li><strong>Optimizations</strong> - Image, Fonts, and Script Optimizations</li>
        <li><strong>TypeScript</strong> - Improved TypeScript support</li>
      </ul>

      <h2 className="text-xl font-semibold text-black dark:text-white">Next Steps</h2>
      <div className="flex gap-4">
        <Link href="/docs/guides" className="text-blue-600 dark:text-blue-400 hover:underline">
          Read the Guides →
        </Link>
      </div>
    </div>
  ),
};
