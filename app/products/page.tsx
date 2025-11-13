import { createPageMetadata } from '@/lib/seo/metadata/create-page-metadata';
import { getCollectionProducts, getCollections } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import { Carousel } from 'components/carousel';
import Link from 'next/link';
import { ThreeItemGrid } from 'components/grid/three-items';
import { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  path: 'products',
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  baseMetadata: {
    openGraph: {
      type: 'website'
    }
  }
});

export default async function HomePage() {
  const collections = await getCollections();
  // console.log("colections", collections)
  // Skip the default "All" collection and fetch products for each remaining collection in parallel
  const filteredCollections = collections.filter((c) => {
    const handle = c.handle?.toLowerCase?.() ?? '';
    const title = c.title?.toLowerCase?.() ?? '';
    return handle !== 'all' && title !== 'all' && title !== 'all products';
  });

  const byCollection = await Promise.all(
    filteredCollections.map(async (c) => {
      const products = await getCollectionProducts({ collection: c.handle });
      return { collection: c, products };
    })
  );

  const allProducts: Product[] = byCollection
    .flatMap((x) => x.products)
    .filter((p): p is Product => p !== undefined);
  // Prepare the data each component needs
  const threeProducts = allProducts.slice(0, 3);

  return (
    <div className="mt-8">
      <ThreeItemGrid products={threeProducts} />
      {byCollection.map((pbc, i) => (
        <section
          key={pbc.collection?.handle ?? i}
          className="relative py-10 sm:py-12"
        >
          <div className="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <div className="min-w-0">
                <h3 className="truncate text-2xl font-semibold tracking-tight">
                  {pbc.collection.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2 py-0.5 text-xs font-medium dark:border-neutral-800">
                    {pbc.products?.length ?? 0} products
                  </span>
                </p>
              </div>
              <Link
                href={`/search/${pbc.collection.handle}`}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
              >
                View all
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M13.5 4.5a.75.75 0 000 1.5h5.69l-7.72 7.72a.75.75 0 001.06 1.06l7.72-7.72V18a.75.75 0 001.5 0V5.25A.75.75 0 0020.5 4.5h-7z" />
                  <path d="M3.75 5.25A2.25 2.25 0 016 3h5.25a.75.75 0 010 1.5H6A.75.75 0 005.25 5.25v12A.75.75 0 006 18h12a.75.75 0 010 1.5H6A2.25 2.25 0 013.75 17.25v-12z" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              {/* Edge fades to hint scroll */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white/80 to-transparent dark:from-black/60" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white/80 to-transparent dark:from-black/60" />
              <Carousel products={pbc.products} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
