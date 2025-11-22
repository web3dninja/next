import { UsersList } from './components/users-list';
import { getUsers } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <div className="container">
        <BackButton href="/admin" label="Back to Admin" />
      </div>

      <div className="content">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Users</h1>

        <UsersList users={users} />
      </div>
    </>
  );
}
