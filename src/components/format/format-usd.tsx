'use client';

import { useIntl } from 'react-intl';

export function FormatUSD({ number }: { number: number }) {
  const { formatNumber } = useIntl();

  return (
    <span className="text-price text-2xl">
      {formatNumber(number, { style: 'currency', currency: 'USD' })}
    </span>
  );
}
