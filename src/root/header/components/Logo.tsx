import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Logo() {
  return (
    <Button asChild variant="ghost">
      <Link href="/">
        <span className="font-bold text-black dark:text-white">TV</span>
      </Link>
    </Button>
  );
}
