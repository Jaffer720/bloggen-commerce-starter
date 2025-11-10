"use client";

import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { useCart } from 'components/cart/cart-context';

export function ShopUnavailableBanner() {
  const { shopUnavailable, unavailableMessage } = useCart();

  if (!shopUnavailable) {
    return null;
  }

  return (
    <div className="w-full border-b border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-100">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-6 py-4 text-sm">
        <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-none text-amber-600 dark:text-amber-400" />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Store temporarily unavailable</p>
          <p className="text-amber-800/90 dark:text-amber-200/80">{unavailableMessage}</p>
        </div>
      </div>
    </div>
  );
}

