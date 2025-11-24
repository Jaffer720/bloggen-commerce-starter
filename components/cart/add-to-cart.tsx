'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from '@/components/cart/actions';
import { useProduct } from '@/components/product/product-context';
import { Product, ProductVariant } from '@/lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';
import { toast } from 'sonner';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  shopUnavailable
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  shopUnavailable: boolean;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full p-4 tracking-wide transition-colors';
  const activeClasses = 'bg-[var(--primary-solid)] text-[var(--primary-on-primary)] hover:bg-[var(--primary-solid-hover)]';
  const disabledClasses = 'cursor-not-allowed opacity-60 bg-[var(--canvas-bg-active)] text-[var(--canvas-text)]';

  if (shopUnavailable) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Store Unavailable
      </button>
    );
  }

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, activeClasses)}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem, shopUnavailable, unavailableMessage } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        if (shopUnavailable) {
          toast.error(unavailableMessage)
          return;
        }
        addCartItem(finalVariant, product);
        addItemAction();
        toast.success(`${product.handle} added to cart.`)
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        shopUnavailable={shopUnavailable}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message ?? (shopUnavailable ? unavailableMessage : null)}
      </p>
    </form>
  );
}
