import { BackButton } from '@/components/ui/back-button';
import { AuthTabs } from '@/components/auth-modal/auth-tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <>
      <div className="content-header">
        <h1>Authentication</h1>
      </div>
      <div className="content items-center">
        <Card className="w-full max-w-lg">
          <CardContent>
            <AuthTabs />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
