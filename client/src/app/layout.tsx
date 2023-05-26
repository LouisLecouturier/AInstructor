'use client'

import './globals.css'
import {SessionProvider} from 'next-auth/react'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children, session}: {children: React.ReactNode, session: any}) {
  return (
    <html lang="fr" className="h-full scroll-smooth antialiased">
      <body className='flex h-full flex-col'>
        <SessionProvider session={session}>
          <div className='grow'>{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
