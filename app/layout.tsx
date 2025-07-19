import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Global Kitchen',
  description: 'A global recipe sharing platform',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
