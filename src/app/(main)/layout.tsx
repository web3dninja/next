import { Header } from '@/root';

import { MainHeader } from '@/root/header/components/main/MainHeader';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <MainHeader />
      </Header>
      <main>{children}</main>
    </>
  );
}
