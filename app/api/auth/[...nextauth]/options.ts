import type { Awaitable, NextAuthOptions, RequestInternal, User, getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'name' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password) return null
        return null
      }
    })
  ],

}