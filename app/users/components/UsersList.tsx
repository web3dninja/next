"use client";

import Link from "next/link";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Пошук користувачів..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 px-4 py-2 mb-4 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />
      
      {filteredUsers.map((user) => (
        <ul>
            <li key={user.id}>
              <Link
                href={`/users/${user.id}`}
                className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <p className="font-medium text-zinc-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </p>
              </Link>
            </li>
        </ul>
      ))}
      {filteredUsers.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          Користувачів не знайдено
        </p>
      )}
    </div>
  );
}
