import { Header } from '@/root';

import { MainHeader } from '@/root/header/components/main/MainHeader';

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
