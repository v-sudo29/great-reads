import '@styles/globals.css'
import type { Metadata } from 'next'
import Nav from '@components/nav/Nav'
import Footer from '@components/Footer'
import AuthProvider from '@context/AuthProvider'
import { ProfileImageProvider } from '@context/ProfileImageProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProfileImageProvider>
        <html lang="en">
          <body>
            <main className='app bg-[#F9FBFC]'>
                <Nav />
                  {children}
                <Footer />
            </main>
          </body>
        </html>
      </ProfileImageProvider>
    </AuthProvider>
  )
}
