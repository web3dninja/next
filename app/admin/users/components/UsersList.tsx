'use client';

import Link from 'next/link';
import { useState } from 'react';
import DeleteUserButton from './DeleteUserButton';
import { User } from '@/lib/data/users';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';

interface UsersListProps {
  initialUsers: User[];
}

export default function UsersList({ initialUsers }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const currentUsers = initialUsers;
  const filteredUsers = currentUsers.filter(
    user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded-lg border border-zinc-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />

      <ItemGroup>
        {filteredUsers.map((user: User) => (
          <Item key={user.id} variant="outline" asChild>
            <Link href={`/users/${user.id}`}>
              <ItemContent>
                <ItemTitle>
                  {user.username}{' '}
                  <span className="text-zinc-500 dark:text-zinc-400">({user.role})</span>
                </ItemTitle>
                <ItemDescription>{user.email}</ItemDescription>
              </ItemContent>

              <ItemActions>
                <DeleteUserButton userId={user.id} />
              </ItemActions>
            </Link>
          </Item>
        ))}
      </ItemGroup>
      {filteredUsers.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">No users found</p>
      )}
    </div>
  );
}
