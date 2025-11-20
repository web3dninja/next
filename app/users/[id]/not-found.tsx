import Link from "next/link";
import { Button } from "@/components/ui/button";

// Not Found UI - shown when notFound() is called
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          User Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          User with this ID does not exist.
        </p>
        <Button asChild>
          <Link href="/users">Back to List</Link>
        </Button>
      </div>
    </div>
  );
}
