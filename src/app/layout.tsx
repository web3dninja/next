import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/globals.css';
import { QueryProvider, ThemeProvider, IntlProvider } from '@/providers';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@/components/features/google-analytics';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Reddit Product Tracker',
  description: 'Track products from Reddit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <IntlProvider locale="en">
              <NuqsAdapter>
                {children}
                <Toaster />
              </NuqsAdapter>
            </IntlProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
