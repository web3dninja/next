import { Header } from '@/root';
import { getCurrentUser } from '@/components/auth-modal/actions';
import { User } from '@/lib/data';
import { MainHeader } from '@/root/header/components/main/MainHeader';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <>
      <Header>
        <MainHeader user={user} />
      </Header>
      {children}
    </>
  );
}
