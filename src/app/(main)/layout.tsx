import { Header } from '@/root';
import { getCurrentUserAction } from '@/actions';
import { MainHeader } from '@/root/header/components/main/MainHeader';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUserAction();

  return (
    <>
      <Header>
        <MainHeader user={user} />
      </Header>
      <main>{children}</main>
    </>
  );
}
