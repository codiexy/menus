import type { Metadata } from 'next';
import { Suspense } from 'react';
import MenuverseProvider from '@/context/MenuverseContext';
import SiteLoader from '@/components/miscellaneous/SiteLoader';

import './globals.css';
import './page.module.css'
import './pagenotfound.css';
import './menu.css';
import './ProfileMenu.css';

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
    <html lang="en">
      <body>
        <Suspense fallback={<SiteLoader />}>
          <MenuverseProvider>
            {children}
          </MenuverseProvider>
        </Suspense>
      </body>
    </html>
  )
}
