import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'GlowBeautyAtomy',
  description: 'Global Atomy sign-up guide & K-beauty reviews',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
