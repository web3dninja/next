import Link from 'next/link';
import UsersList from './components/UsersList';
import { getUsers } from '@/lib/data';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="content">
      <div>
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Users</h1>

      <UsersList initialUsers={users} />
    </div>
  );
}
