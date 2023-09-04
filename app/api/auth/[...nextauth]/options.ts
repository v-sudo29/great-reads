import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import startDb from '@lib/db'
import User from '@models/userModel'
import GoogleUser from '@models/googleUserModel'
import { AuthOptions } from 'next-auth'

const authOptions: AuthOptions = {
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
        const user = await User.findOne({ email })
        if (!user) throw Error('Incorrect email/password')
        
        // Compare passwords
        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) throw Error('Incorrect email/password')

        // Set password field to empty string to prevent exposure
        user.password = ''
        const transformedUser = user.toObject()
        const userId = transformedUser._id
        const lists = transformedUser.lists
        const returnedUser = {
          ...transformedUser,
          id: userId,
          lists: lists
        }
        console.log(returnedUser)

        return returnedUser
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {

      console.log('JWT CALLBACK: ', { token, user, session })

      // If user updates NAME, update token and database
      if (trigger === 'update' && session?.name) {
        token.name = session.name

        // Update user in database
        const credentialsUser = await User.findOne({ email: token.email })
        const googleUser = await GoogleUser.findOne({ email: token.email })

        if (googleUser) await GoogleUser.findOneAndUpdate({ email: token.email }, { name: token.name })
        if (credentialsUser) await User.findOneAndUpdate({ email: token.email }, { name: token.name })
      }

      // If user updates LIST, update token and database
      if (trigger === 'update' && session?.lists) {
        token.lists = session.lists
        
        // Update user in database
        // const credentialsUser = await User.findOne({ email: token.email })
        // const googleUser = await GoogleUser.findOne({ email: token.email })

        // if (googleUser) await GoogleUser.findOneAndUpdate({ email: token.email }, { lists: token.lists })
        // if (credentialsUser) await User.findOneAndUpdate({ email: token.email }, { lists: token.lists })
      }

      // On login: Check if credentials user exists AND initial id not autogenerated
      if (user?.id && !/^\d+$/.test(user.id)) {
        token.id = user.id
        token.lists = user.lists
      }

      // On login: Find Google user in database, initial id is autogenerated
      if (user?.id && /^\d+$/.test(user.id)) {
        const { email } = user
        const foundUser = await GoogleUser.findOne({ email })

        if (foundUser?._id) token.id = foundUser._id
      }

      // return final token
      return token
    },
    async session({ session, token }) {
      // Pass in user id and lists from token to session
      if (session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.lists = token.lists
      }
      return session
    }, 
    async signIn({ profile, user }) {
      if (!profile) return true
      try {
        // Connect to database
        await startDb()
        const userExists = await GoogleUser.findOne({ email: profile.email }).lean()

        // If new user, create user in database
        if (!userExists) {
          const user = await GoogleUser.create({
            email: profile!.email,
            name: profile!.name,
          })
          return true
        } 

        // Update user info from database to user object
        user.name = userExists!.name
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('sign-in')) return baseUrl + '/feed'
      else return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default authOptions