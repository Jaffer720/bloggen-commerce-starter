
import { cn } from '@/lib/utils';
import { getCollectionProducts } from '@/lib/shopify';
import Link from 'next/link';
import Carousel from './carousel';
// import { useState } from 'react';


export default async function ProductsCarousel() {
    //   const [activeId, setActiveId] = useState<string>("");

    const Products = await getCollectionProducts({ collection: 'frontpage' });
    return (
        <section className="bg-canvas-base min-w-4/5 px-4 py-[30px] md:px-[30px] md:py-[50px] lg:px-[50px] lg:py-[60px]">
            <h2 className="relative mb-8 pb-4 text-xl font-bold capitalize leading-7 text-canvas-text-contrast md:mb-12 md:text-2xl">
                Trending Products
                <span className="absolute bottom-0 left-0 h-1 w-full max-w-[250px] rounded-sm bg-canvas-line md:max-w-[330px] lg:max-w-[400px]"></span>
                <span className="absolute bottom-0 left-0 h-1 w-16 rounded-sm bg-primary-solid"></span>
            </h2>
            <Carousel products={Products} />
            <div className="text-center">
                <Link href="/products" className="flex items-center justify-center gap-1 mt-4 text-primary-text font-medium hover:underline">
                    View All Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M13.5 4.5a.75.75 0 000 1.5h5.69l-7.72 7.72a.75.75 0 001.06 1.06l7.72-7.72V18a.75.75 0 001.5 0V5.25A.75.75 0 0020.5 4.5h-7z" />
                  <path d="M3.75 5.25A2.25 2.25 0 016 3h5.25a.75.75 0 010 1.5H6A.75.75 0 005.25 5.25v12A.75.75 0 006 18h12a.75.75 0 010 1.5H6A2.25 2.25 0 013.75 17.25v-12z" />
                </svg>
                </Link>

            </div>
        </section>
    );
}
