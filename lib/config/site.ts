import { getURL } from '@/lib/utils/url';

export const siteConfig = {
    title: 'Bloggen commerce Starter',
    description:
        'Launch your shopify store front site with Bloggen commerce Starter featuring Global Metadata Configuration, MDX blog pages, shopify collection, products and productDetails data fetching, cart and chechout integration dynamic OG images, JSON-LD and more.',
    baseUrl: getURL(),
    creator: 'Silverthread Labs',
    publisher: 'Silverthread Labs',
    keywords: [
        'e-commerce',
        'shopify store front',
        'bloggen commerce starter',
        'seo',
        'shopify',
        'storeFront',
        'shopify integrations',
        'json-ld',
        'mdx',
        'mdx-content',
        'nextjs',
        'tailwindcss',
        'fumadocs',
    ],
    alternateNames: [
        'bloggen commerce starter',
        'bloggen commerce template',
        'bloggen shopify starter',
        'bloggen shopify template'
    ],
    author: {
        name: 'Silverthread Labs',
        url: 'https://www.silverthreadlabs.com',
        logo: 'https://www.silverthreadlabs.com/favicon/favicon.ico',
        twitterHandle: '@syedsaif_666'
    },
    
    getImageConfig: (title: string) => ({
        url: `${getURL()}/og?title=${encodeURIComponent(title)}`,
        width: 1200,
        height: 630,
        alt: title,
        description: title
    }),
    social: {
        sameAs: ['https://www.bloggen.dev']

    },
    sitemap: {
        staticRoutes: ['', '/contact', '/about', '/blog', '/products', '/product']
    }
};
