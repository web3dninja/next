import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center gap-8 px-8 py-16 sm:items-start">
        {/* Hero Section */}
        <div className="w-full text-center sm:text-left">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl dark:text-white">
            Welcome to my Next.js project! 🚀
          </h1>
          <p className="mb-2 text-lg text-zinc-600 dark:text-zinc-400">
            Modern web application with React, Next.js, Prisma and PostgreSQL
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Created using the best practices and modern technologies
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {/* Users Section */}
          <Link href="/admin/users">
            <div className="h-full cursor-pointer rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
              <h2 className="mb-2 text-xl font-semibold text-black dark:text-white">👥 Users</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Full CRUD functionality for managing users
              </p>
            </div>
          </Link>

          {/* Blog Section */}
          <Link href="/blog">
            <div className="h-full cursor-pointer rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
              <h2 className="mb-2 text-xl font-semibold text-black dark:text-white">📝 Blog</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Create and manage posts in the blog
              </p>
            </div>
          </Link>

          {/* Dashboard Section */}
          <Link href="/dashboard">
            <div className="h-full cursor-pointer rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
              <h2 className="mb-2 text-xl font-semibold text-black dark:text-white">
                📊 Dashboard
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Analytics and project statistics
              </p>
            </div>
          </Link>

          {/* Docs Section */}
          <Link href="/docs">
            <div className="h-full cursor-pointer rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
              <h2 className="mb-2 text-xl font-semibold text-black dark:text-white">
                📚 Documentation
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Documentation and guides for the project
              </p>
            </div>
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 w-full rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
            🛠️ Technical stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js 16',
              'React 19',
              'TypeScript',
              'Prisma',
              'PostgreSQL',
              'Tailwind CSS',
              'React Query',
              'React Hook Form',
            ].map(tech => (
              <span
                key={tech}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
