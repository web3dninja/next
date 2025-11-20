import Link from "next/link";
import { Button } from "@/components/ui/button";

// Static route - /about
export default function AboutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Home</Link>
        </Button>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
          About Us
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          This is an example of a static route in Next.js App Router.
        </p>
      </main>
    </div>
  );
}
