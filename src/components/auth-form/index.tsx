'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AuthTabsProps {
  defaultValue?: 'login' | 'register';
  onAuthSuccess?: () => void;
  className?: string;
}

export function AuthModalButton() {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}

export function AuthTabs({ defaultValue = 'login', onAuthSuccess, className }: AuthTabsProps) {
  return (
    <div className={cn('w-full', className)}>
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-4">
          <LoginForm onSuccess={onAuthSuccess} />
        </TabsContent>

        <TabsContent value="register" className="mt-4">
          <RegisterForm onSuccess={onAuthSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
