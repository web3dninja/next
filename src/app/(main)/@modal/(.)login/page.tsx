'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth-modal/components/login-form';
import { RegisterForm } from '@/components/auth-modal/components/register-form';

export default function LoginModal() {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={open => !open && router.back()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <LoginForm onSuccess={() => router.back()} />
          </TabsContent>

          <TabsContent value="register" className="mt-4">
            <RegisterForm onSuccess={() => router.back()} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
