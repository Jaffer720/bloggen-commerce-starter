import { createPageMetadata } from '@/lib/seo/metadata/create-page-metadata';
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

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
    </>
  );
}
