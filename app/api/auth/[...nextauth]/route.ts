import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username:', type: 'text', placeholder: 'your-cool-username' },
        password: { label: 'Password:', type: 'password', placeholder: 'your-awesome-password' }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'Vi', password: '123' }

        if (credentials?.username === user.name && credentials?.password === user.password) {
          // Any object returned will be saved in 'user' property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }