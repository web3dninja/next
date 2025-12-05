'use client';

import { IntlProvider as ReactIntlProvider } from 'react-intl';

export function IntlProvider({
  children,
  locale = 'en',
  ...props
}: React.ComponentProps<typeof ReactIntlProvider>) {
  return (
    <ReactIntlProvider locale={locale} {...props}>
      {children}
    </ReactIntlProvider>
  );
}
