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
        if (!user) throw Error('Incorrect email/password')
        
        // Compare passwords
        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) throw Error('Incorrect email/password')

        // Set password field to empty string to prevent exposure
        user.password = ''
        return user.toObject()
      },
    }),
  ],
  callbacks: {
    async jwt(params: any) {
      if (params.user?.id) {
        params.token.id = params.user.id
      }
      // return final token
      return params.token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string}).id = token.id as string
      }
      return session
    },
    async signIn({ profile }) {
      console.log(profile)
      try {
        // Connect to database
        await startDb()

        return true
      } catch (error) {
        return false
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }