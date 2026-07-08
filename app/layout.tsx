import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { brandAssets } from '@/lib/brand-assets'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marii v2 - Instant Quotes for Southern African SMEs',
  description: 'Quote-first AI for Southern African SMEs. Turn messages, voice notes, and product lists into professional PDF quotes in seconds.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: brandAssets.favicon32,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: brandAssets.favicon32,
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: brandAssets.favicon192,
        type: 'image/png',
      },
    ],
    apple: brandAssets.appleTouchIcon,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7eef0' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1a22' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
