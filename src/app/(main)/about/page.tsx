import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Static route - /about
export default function AboutPage() {
  return (
    <div className="content">
      <div>
        <BackButton href="/" label="Home" />
      </div>

      <h1 className="title">About Us</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is an example of a static route in Next.js App Router.
      </p>
    </div>
  );
}
