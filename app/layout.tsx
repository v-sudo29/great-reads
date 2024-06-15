import '@styles/globals.css'
import type { Metadata } from 'next'
import Nav from '@components/nav/Nav'
import Footer from '@components/Footer'
import AuthProvider from '@context/AuthProvider'
import { ProfileImageProvider } from '@context/ProfileImageProvider'

export const metadata: Metadata = {
  title: 'Great Reads',
  description: 'GreatReads - Discover your next great read. Explore an expanding library of book reviews, recommendations, and discussions from passionate readers like yourself. Join the community and take your literary journey to new heights.',
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
          <body className='flex flex-col min-h-screen xl:flex-row'>
            <Nav />
            <main className='flex-auto bg-[#F9FBFC] flex w-full justify-center overflow-y-scroll xl:ml-[400px]'>
              {children}
            </main>
            <Footer />
          </body>
        </html>
      </ProfileImageProvider>
    </AuthProvider>
  )
}
