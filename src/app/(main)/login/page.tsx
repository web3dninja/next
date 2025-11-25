import { AuthTabs } from '@/components/auth-modal';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <>
      <div className="content-header container">
        <h1>Authentication</h1>
      </div>
      <div className="content container items-center">
        <Card className="w-full max-w-lg">
          <CardContent>
            <AuthTabs />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
