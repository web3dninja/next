import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUser } from '@/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUser(parseInt(id));

  if (!user) {
    notFound();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 bg-white px-8 py-16 dark:bg-black">
        <div>
          <Link
            href="/users"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Back to List
          </Link>
        </div>

        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <h1 className="mb-4 text-2xl font-semibold text-black dark:text-zinc-50">
            {user.username}
          </h1>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">ID</p>
              <p className="text-zinc-900 dark:text-white">{user.id}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Email</p>
              <p className="text-zinc-900 dark:text-white">{user.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
