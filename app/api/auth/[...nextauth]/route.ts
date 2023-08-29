import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import startDb from '@lib/db'
import UserModel from '@models/userModel'

const handler = NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {

        // Destructure email and password from credentials
        const { email, password } = credentials as { email: string, password: string }

        // Connect to MongoDB database
        await startDb()

        // Search up user's email in database
        const user = await UserModel.findOne({ email })
        if (!user) throw Error('email/password mismatch!')
        
        // Compare passwords
        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) throw Error('email/password mismatch!')

        return user.toObject()
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.id) {
        params.token.id = params.user.id
      }
      // return final token
      return params.token
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string}).id = token.id as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }