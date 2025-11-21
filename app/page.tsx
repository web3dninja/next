import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center gap-8 py-16 px-8 sm:items-start">
        {/* Hero Section */}
        <div className="w-full text-center sm:text-left">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4 sm:text-5xl">
            Welcome to my Next.js project! 🚀
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
            Modern web application with React, Next.js, Prisma and PostgreSQL
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Created using the best practices and modern technologies
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
          {/* Users Section */}
          <Link href="/users">
            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer h-full">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                👥 Users
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Full CRUD functionality for managing users
              </p>
            </div>
          </Link>

          {/* Blog Section */}
          <Link href="/blog">
            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer h-full">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                📝 Blog
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Create and manage posts in the blog
              </p>
            </div>
          </Link>

          {/* Dashboard Section */}
          <Link href="/dashboard">
            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer h-full">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                📊 Dashboard
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Analytics and project statistics
              </p>
            </div>
          </Link>

          {/* Docs Section */}
          <Link href="/docs">
            <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer h-full">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                📚 Documentation
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Documentation and guides for the project
              </p>
            </div>
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="w-full mt-8 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            🛠️ Technical stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Prisma",
              "PostgreSQL",
              "Tailwind CSS",
              "React Query",
              "React Hook Form",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link href="/users">View users</Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/blog">Read blog</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
