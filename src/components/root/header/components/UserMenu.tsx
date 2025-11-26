'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { User } from '@/types/user';
import { useLogoutMutation } from '../useLogoutMutation';
import { userInitials } from '@/utils/user';

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const { mutate, isPending } = useLogoutMutation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="ring-offset-background focus-visible:ring-ring cursor-pointer rounded-full ring-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
          <Avatar>
            <AvatarFallback className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
              {userInitials(user.username)}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.username}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => mutate()}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
