import { User } from '@/types/user';
import { useMemo } from 'react';

export function useFilteredUsers(users: User[], searchTerm: string) {
  return useMemo(() => {
    return users.filter(
      user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [users, searchTerm]);
}
