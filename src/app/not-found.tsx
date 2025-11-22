import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Global Not Found - for the entire application
export default function NotFound() {
  return (
    <div className="content my-auto w-150 items-center">
      <h1 className="text-6xl font-bold text-black dark:text-white">404</h1>
      <h2 className="text-2xl font-semibold text-black dark:text-white">Page Not Found</h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button asChild size="lg" className="w-50">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
