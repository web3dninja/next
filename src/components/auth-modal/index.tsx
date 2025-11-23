'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthModal() {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
