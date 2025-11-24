"use client";

import { Product } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CarouselProps {
    products: Product[] | undefined;
}

export default function Carousel({ products }: CarouselProps) {
    const [activeId, setActiveId] = useState<string>("");

    return (
        <div className="flex mx-auto items-center justify-center">

            <div className="flex flex-nowrap gap-3 overflow-x-auto pb-10 md:gap-4">
                {products?.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveId(item.id)}
                        className={cn(
                            "relative flex cursor-pointer items-end overflow-hidden rounded-2xl bg-cover bg-center transition-all duration-500 ease-in-out",
                            // Mobile styles
                            "h-[280px] min-w-[200px]",
                            activeId === item.id ? "min-w-[270px] shadow-xl" : "",
                            // Tablet styles
                            "md:h-[330px] md:min-w-[240px]",
                            activeId === item.id ? "md:min-w-[360px]" : "",
                            // Desktop styles
                            "lg:h-[360px] lg:min-w-[260px]",
                            activeId === item.id ? "lg:min-w-[400px]" : "",
                            // Large Desktop styles
                            "xl:h-[400px] xl:min-w-[320px]",
                            activeId === item.id ? "xl:min-w-[500px]" : ""
                        )}
                        style={{ backgroundImage: `url(${item.featuredImage.url})` }}
                    >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />

                        {/* Content */}
                        <div
                            className={cn(
                                "relative z-10 p-4 bottom-3 text-white transition-transform duration-500 ease-in-out md:p-6",
                                activeId === item.id ? "translate-y-0" : "translate-y-[calc(100%-42px)] md:translate-y-[calc(100%-54px)]"
                            )}
                        >
                            <h3 className={cn(" text-lg font-bold leading-6 md:text-2xl md:leading-9 lg:text-[28px]",
                                activeId === item.id ? "" : ""
                            )}>
                                {item.title}
                            </h3>
                            <span className="text-sm font-medium md:text-base lg:text-lg">{`${item.priceRange.maxVariantPrice.currencyCode} ${item.priceRange.minVariantPrice.amount}`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}