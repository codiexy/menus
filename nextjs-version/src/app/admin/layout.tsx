import type { Metadata } from 'next';
import TenantProvider from '@/context/TenantContext';

export const metadata: Metadata = {
    title: {
        template: '%s | Menuverse Admin Panel',
        default: '',
    },
    description: 'Menuverse | Admin Panel',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <TenantProvider tenant_slug="admin">
            {children}
        </TenantProvider>
    )
}
