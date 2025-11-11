import { notFound } from 'next/navigation';

import { siteConfig } from '@/lib/config/site';
import { defaultMetadata } from '@/lib/seo/metadata/create-base-metadata';
import { createPageMetadata } from '@/lib/seo/metadata/create-page-metadata';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import BlogHeader from '@/components/blog/blog-header';

export default function DocsPageRoute() {
    // We only have one docs page: content/docs/getting-started-with-bloggen-commerce-starter.mdx
    // Fumadocs `source` exposes .getPage with a slug array; the docs baseUrl is '/docs'
    const page = source.getPage(['getting-started-with-bloggen-commerce-starter']);
    if (!page) notFound();

    const MDXContent = page.data.body;
    const data: any = page.data;
    const headerImage = data?.image || data?.ogImage?.url || '/assets/thumbnail.png';

    return (
        <main role='main' className='relative min-h-screen'>
            <div className='flex max-w-7xl flex-col py-16 md:py-28'>
                <BlogHeader title={page.data.title} image={headerImage} />
                <div className='flex flex-row'>
                    <DocsPage
                        tableOfContent={{ enabled: true }}
                        tableOfContentPopover={{ enabled: true }}
                        toc={page.data.toc}
                        full={false}>
                        <DocsBody>
                            <MDXContent
                                components={getMDXComponents({
                                    a: createRelativeLink(source, page)
                                })}
                            />
                        </DocsBody>
                    </DocsPage>
                </div>
            </div>
        </main>
    );
}

const baseMeta = createPageMetadata({
    path: 'docs',
    description:
        'Documentation for setting up the Shopify + Next.js Commerce Starter—env configuration, Storefront API, webhooks, and deployment.',
    baseMetadata: defaultMetadata
});

export const metadata = {
    ...baseMeta,
    openGraph: {
        ...baseMeta.openGraph,
        url: `${siteConfig.baseUrl}/docs`,
        images: [
            {
                url: `${siteConfig.baseUrl}/assets/thumbnail.png`,
                alt: 'Docs'
            }
        ]
    },
    twitter: {
        ...baseMeta.twitter,
        images: [
            {
                url: `${siteConfig.baseUrl}/assets/thumbnail.png`,
                alt: 'Docs'
            }
        ]
    }
} as const;
