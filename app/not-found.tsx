import Link from "next/link";
import { Button } from "@/components/ui/button";

// Global Not Found - for the entire application
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-black dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
