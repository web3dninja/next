import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Static route - /about
export default function AboutPage() {
  return (
    <div className="content">
      <div className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Home</Link>
        </Button>

        <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">About Us</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          This is an example of a static route in Next.js App Router.
        </p>
      </div>
    </div>
  );
}
