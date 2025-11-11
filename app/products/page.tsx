import { createPageMetadata } from '@/lib/seo/metadata/create-page-metadata';
import { getCollectionProducts, getCollections } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import { Carousel } from 'components/carousel';
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
  // Fetch products for each collection in parallel
  const byCollection = await Promise.all(
    collections.map(async (c) => {
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
    <>
      <ThreeItemGrid products={threeProducts} />
      {byCollection.map((pbc, i) => (
        <div key={i}>
          <h3>{pbc.collection.title}</h3>
          <Carousel products={pbc.products} />
        </div>
        )
      )}
    </>
  );
}
