"use client";

import Link from "next/link";
import { useState } from "react";
import DeleteUserButton from "./DeleteUserButton";
import { User } from "@/lib/data/users";

interface UsersListProps {
  initialUsers: User[];
}

export default function UsersList({ initialUsers }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const currentUsers = initialUsers;
  const filteredUsers = currentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 px-4 py-2 mb-4 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />

      <ul className="space-y-2">
        {filteredUsers.map((user: User) => (
          <li key={user.id} className="flex items-center gap-2">
            <Link
              href={`/users/${user.id}`}
              className="flex-1 block rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <p className="font-medium text-zinc-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {user.email}
              </p>
            </Link>
            <DeleteUserButton userId={user.id} />
          </li>
        ))}
      </ul>
      {filteredUsers.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          No users found
        </p>
      )}
    </div>
  );
}
