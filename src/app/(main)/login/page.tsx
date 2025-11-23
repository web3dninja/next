import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth-modal/components/login-form';
import { RegisterForm } from '@/components/auth-modal/components/register-form';
import { BackButton } from '@/components/ui/back-button';

export default function LoginPage() {
  return (
    <>
      <div className="container flex gap-4">
        <BackButton href="/" label="Home" />
        <h1>Authentication</h1>
      </div>
      <div className="content items-center">
        <div className="w-full max-w-lg">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register" className="mt-4">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
