import Link from 'next/link';
import UsersList from './components/UsersList';
import { getUsers } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="content">
      <div>
        <BackButton href="/admin" label="Back to Admin" />
      </div>

      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Users</h1>

      <UsersList initialUsers={users} />
    </div>
  );
}
