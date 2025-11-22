import { Header } from '@/root';
import { getCurrentUser } from '@/components/auth-modal/actions';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
