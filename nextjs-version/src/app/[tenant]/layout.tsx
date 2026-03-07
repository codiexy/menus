import type { Metadata } from 'next';
import { Suspense } from 'react'
import TenantProvider from '@/context/TenantContext';

import '@/app/globals.css';
import '@/app/main.css';
import '@/app/menu.css';
import SiteLoader from '@/components/miscellaneous/SiteLoader';

export const metadata: Metadata = {
    title: {
        template: '%s | Menuverse',
        default: 'Menuverse',
    },
    description: 'Menuverse | Restaurant Site',
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Suspense fallback={<SiteLoader />}>
            <TenantProvider>
                {children}
            </TenantProvider>
        </Suspense>
    )
}
