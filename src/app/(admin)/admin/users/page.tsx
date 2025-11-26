import { UsersList } from './components/users-list';
import { findAllUsers } from '@/lib/db';
import { BackButton } from '@/components/ui/back-button';

export default async function UsersPage() {
  const users = await findAllUsers();

  return (
    <>
      <div className="content-header container">
        <BackButton href="/admin" label="Admin" />
        <h1>Users</h1>
      </div>

      <div className="content container">
        <UsersList users={users} />
      </div>
    </>
  );
}
