import { notFound } from 'next/navigation';
import { getUser } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';

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
    <>
      <div className="container">
        <BackButton href="/admin/users" label="Back to Users" />
      </div>

      <div className="content">
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
      </div>
    </>
  );
}
