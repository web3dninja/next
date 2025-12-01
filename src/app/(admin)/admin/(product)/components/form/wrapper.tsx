import { Card, CardContent } from '@/components/ui/card';
import type { FormEventHandler, ReactNode } from 'react';

interface FormWrapperProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function FormWrapper({ children, onSubmit }: FormWrapperProps) {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardContent>
        <form onSubmit={onSubmit} className="flex gap-6">
          {children}
        </form>
      </CardContent>
    </Card>
  );
}
