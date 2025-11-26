'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { loginAction } from '@/actions/user';
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps = {}) {
  const queryClient = useQueryClient();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      form.reset();
      toast.success('Successfully logged in!');
      onSuccess?.();
    },
    onError: error => {
      toast.error(String(error));
      form.setError('root.serverError', { message: String(error) });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold">Welcome back</h2>
        <p className="text-muted-foreground text-sm">Enter your credentials to sign in.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
