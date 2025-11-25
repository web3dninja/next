'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AuthTabs } from '@/components/auth-modal';

export default function LoginModal() {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={open => !open && router.back()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <AuthTabs onAuthSuccess={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
}
