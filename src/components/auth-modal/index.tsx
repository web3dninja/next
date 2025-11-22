"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logoutAction } from "@/components/auth-modal/actions";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";

interface AuthModalProps {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
  } | null;
}

export default function AuthModal({ user }: AuthModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      router.refresh();
    },
  });

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {user.username}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? "..." : "Logout"}
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Login
        </Button>
      </DialogTrigger>
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
            <LoginForm/>
          </TabsContent>

          <TabsContent value="register" className="mt-4">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
