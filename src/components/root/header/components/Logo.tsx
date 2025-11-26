import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import globe from '@public/logo.png';

export function Logo() {
  return (
    <Button asChild variant="ghost">
      <Link href="/">
        <Image src={globe} alt="Logo" width={24} height={24} />
      </Link>
    </Button>
  );
}
