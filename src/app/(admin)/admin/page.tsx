import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="content">
      {/* Hero Section */}
      <div className="w-full text-center sm:text-left">
        <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl dark:text-white">
          Welcome to the admin dashboard! 🚀
        </h1>
        <p className="mb-2 text-lg text-zinc-600 dark:text-zinc-400">
          Admin dashboard for managing users
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {/* Admin Section */}
        <Link href="admin/users">
          <div className="h-full cursor-pointer rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">
            <h2 className="mb-2 text-xl font-semibold text-black dark:text-white">👥 Users</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Full CRUD functionality for managing users
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
    </div>
  );
}
