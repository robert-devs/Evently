import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
    subsets: ['latin'] ,
    weight:['400','500','700'],
    variable: '--font-poppins'
    })

export const metadata: Metadata = {
  title: 'Evetly',
  description: 'Evently is a platform for event management',
  icons:{
    icon:"/assets/images/logo.svg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider >
        <html lang="en">
             <body className={poppins.variable}>{children}</body>
        </html>
    </ClerkProvider>
  )
}
