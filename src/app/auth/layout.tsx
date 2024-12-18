import type { Metadata } from 'next'
import { AuthProviders } from '@/utils/Providers'

export const metadata: Metadata = {
    title: 'StormAuth',
    description: 'StormAuth authentication',
    icons: {
        icon: '/logos/storm-small-logo-no-bg.png',
    }
}

export default function RootLayout({
    children,
}: {
    children: JSX.Element
}) {
    return (
        <AuthProviders>
            {children}
        </AuthProviders>
    )
}
