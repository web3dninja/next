import { UsersList } from './components/users-list';
import { getUsers } from '@/lib/data';
import { BackButton } from '@/components/ui/back-button';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <div className="content-header">
        <BackButton href="/admin" label="Admin" />
        <h1>Users</h1>
      </div>

      <div className="content">
        <UsersList users={users} />
      </div>
    </>
  );
}
