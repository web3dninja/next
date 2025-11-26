import { Header } from '@/components/root';

import { MainHeader } from '@/components/root/header/components/MainHeader';

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <MainHeader />
      </Header>
      <main>{children}</main>
      {modal}
    </>
  );
}
