import Link from "next/link";
import UsersList from "./components/UsersList";
import CreateUserForm from "./components/CreateUserForm";
import { getUsers } from "@/lib/data";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        <div>
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Users
        </h1>

        <CreateUserForm />

        <UsersList initialUsers={users} />
      </main>
    </div>
  );
}
