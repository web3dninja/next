import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2">
      <span className="font-bold text-black dark:text-white">TV</span>
    </Link>
  );
}
