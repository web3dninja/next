'use client';

import Link from 'next/link';
import { useState } from 'react';
import DeleteUserButton from './delete-user-button';
import type { User } from '@/types/user.type';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { usePathname } from 'next/navigation';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { useFilteredUsers } from '../[id]/hooks/useFilteredUsers';

interface UsersListProps {
  users: User[];
}

export function UsersList({ users }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const lacation = usePathname();

  const filteredUsers = useFilteredUsers(users, searchTerm);

  return (
    <>
      <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search users..." />

      <ItemGroup className="gap-4">
        {filteredUsers.map((user: User) => (
          <Item key={user.id} variant="outline" asChild>
            <Link href={`${lacation}/${user.id}`}>
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
      <EmptyState show={filteredUsers.length === 0}>No users found</EmptyState>
    </>
  );
}
