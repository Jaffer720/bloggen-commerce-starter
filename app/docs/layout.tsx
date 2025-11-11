import type { ReactNode } from 'react';

// globals.css is already included at app root; no need to import here
import { source } from '@/lib/source';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='mx-auto max-w-7xl flex flex-auto flex-col items-center'>
            <DocsLayout
                tree={source.pageTree}
                sidebar={{ enabled: false }}
                searchToggle={{ enabled: false }}
                nav={{ enabled: true }}>
                {children}
            </DocsLayout>
        </div>
    );
}
