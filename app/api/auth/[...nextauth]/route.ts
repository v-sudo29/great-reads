import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import startDb from '@lib/db'
import User from '@models/userModel'
import GoogleUser from '@models/googleUserModel'

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
        console.log('credentials: ', credentials)
        console.log('req: ', req)
        // Destructure email and password from credentials
        const { email, password } = credentials as { email: string, password: string }

        // Connect to MongoDB database
        await startDb()

        // Search up user's email in database
        const user = await User.findOne({ email })
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
      if (params.user?._id) {
        params.token.id = params.user._id
      }
      // return final token
      return params.token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string
      }
      return session
    },
    async signIn({ profile }) {
      if (!profile) return true
      try {
        console.log(profile)
        // Connect to database
        await startDb()
        
        const userExists = await GoogleUser.findOne({ email: profile!.email })

        if (!userExists) {
          const user = await GoogleUser.create({
            email: profile!.email,
            name: profile!.name,
          })
        }
        return true
        
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }