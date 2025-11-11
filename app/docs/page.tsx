import { notFound } from 'next/navigation';

import { siteConfig } from '@/lib/config/site';
import { defaultMetadata } from '@/lib/seo/metadata/create-base-metadata';
import { createPageMetadata } from '@/lib/seo/metadata/create-page-metadata';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';

export default function DocsPageRoute() {
    // We only have one docs page: content/docs/getting-started-with-bloggen-commerce-starter.mdx
    // Fumadocs `source` exposes .getPage with a slug array; the docs baseUrl is '/docs'
    const page = source.getPage(['getting-started-with-bloggen-commerce-starter']);
    if (!page) notFound();

    const MDXContent = page.data.body;

    return (
        <main role='main' className='relative min-h-screen'>
            <div className='flex max-w-7xl flex-col py-16 md:py-28'>
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

export const metadata = createPageMetadata({
    path: 'docs',
    description:
        'Documentation for setting up the Shopify + Next.js Commerce Starter—env configuration, Storefront API, webhooks, and deployment.',
    baseMetadata: defaultMetadata
});
