import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
}


export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-16 px-8 bg-white dark:bg-black sm:items-start">

       <Button   asChild>
       <Link
          href="/users"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          Go to users
        </Link>
       </Button>
      </main>
    </div>
  );
}
