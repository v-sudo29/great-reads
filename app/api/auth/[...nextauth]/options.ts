import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import startDb from '@lib/db'
import User from '@models/userModel'
import GoogleUser from '@models/googleUserModel'
import { AuthOptions } from 'next-auth'
import { GoogleProfile } from 'next-auth/providers/google'
import { IBook } from '@customTypes/bookType'
import { SchemaDefinitionProperty } from 'mongoose'

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        // Destructure email and password from credentials
        const { email, password } = credentials as {
          email: string
          password: string
        }

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
        const userId = transformedUser._id.toString()
        const lists = transformedUser.lists
        const friends = transformedUser.friends
        const imageName = transformedUser.imageName
        const firstName = transformedUser.firstName
        const lastName = transformedUser.lastName

        const returnedUser = {
          ...transformedUser,
          id: userId,
          lists: lists,
          friends: friends,
          imageName: imageName,
          firstName: firstName,
          lastName: lastName,
        }

        return returnedUser
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // Check if session property exists in token
      // if (trigger === 'update' && !token.hasOwnProperty(Object.keys(session)[0])) {
      //   return {
      //     ...token,
      //   }
      // }

      // If user updates FIRST NAME, update token and database
      if (trigger === 'update' && session?.firstName) {
        token.firstName = session.firstName

        // Update user in database
        const credentialsUser = await User.findOne({ email: token.email })
        const googleUser = await GoogleUser.findOne({ email: token.email })

        if (googleUser)
          await GoogleUser.findOneAndUpdate(
            { email: token.email },
            { name: token.name }
          )
        if (credentialsUser)
          await User.findOneAndUpdate(
            { email: token.email },
            { firstName: token.firstName }
          )
      }

      // If user updates LAST NAME, update token and database
      if (trigger === 'update' && session?.lastName) {
        token.lastName = session.lastName

        // Update user in database
        const credentialsUser = await User.findOne({ email: token.email })
        const googleUser = await GoogleUser.findOne({ email: token.email })

        if (googleUser)
          await GoogleUser.findOneAndUpdate(
            { email: token.email },
            { name: token.name }
          )
        if (credentialsUser)
          await User.findOneAndUpdate(
            { email: token.email },
            { lastName: token.lastName }
          )
      }

      // If user updates LIST, update token and database
      if (trigger === 'update' && session?.lists) {
        token.lists = session.lists

        // Update user in database
        const credentialsUser = await User.findOne({ email: token.email })
        const googleUser = await GoogleUser.findOne({ email: token.email })

        if (googleUser)
          await GoogleUser.findOneAndUpdate(
            { email: token.email },
            { lists: token.lists }
          )
        if (credentialsUser)
          await User.findOneAndUpdate(
            { email: token.email },
            { lists: token.lists }
          )
      }

      // If user updates FRIENDS -- update token and database
      if (trigger === 'update' && session?.friends) {
        token.friends = session.friends

        // Update user in database
        const credentialsUser = await User.findOne({ email: token.email })
        const googleUser = await GoogleUser.findOne({ email: token.email })

        if (googleUser)
          await GoogleUser.findOneAndUpdate(
            { email: token.email },
            { friends: token.friends }
          )
        if (credentialsUser)
          await User.findOneAndUpdate(
            { email: token.email },
            { friends: token.friends }
          )
      }

      // If user updates IMAGE NAME -- update token and database
      if (trigger === 'update' && session?.imageName) {
        token.imageName = session.imageName

        // Update user in database
        const credentialsUser = await User.findOne({ email: token.email })
        const googleUser = await GoogleUser.findOne({ email: token.email })

        if (googleUser)
          await GoogleUser.findOneAndUpdate(
            { email: token.email },
            { imageName: token.imageName }
          )
        if (credentialsUser)
          await User.findOneAndUpdate(
            { email: token.email },
            { imageName: token.imageName }
          )
      }

      // On FIRST LOGIN: Check if credentials user exists AND initial id not autogenerated
      if (user?.id && !/^\d+$/.test(user.id)) {
        token.id = user.id
        token.lists = user.lists
        token.friends = user.friends
        token.imageName = user.imageName
        token.firstName = user.firstName
        token.lastName = user.lastName
      }

      // On FIRST LOGIN: Find Google user in database, initial id is autogenerated
      if (user?.id && /^\d+$/.test(user.id)) {
        const { email } = user
        const foundUser = await GoogleUser.findOne({ email })
        console.log('GOOGLE USER!!!')
        if (foundUser?._id) {
          token.id = foundUser._id
          token.lists = foundUser.lists
          token.friends = foundUser.friends
          token.imageName = foundUser.imageName
          token.defaultImage = foundUser.defaultImage
        }
      }

      // return final token
      return token
    },
    async session({ session, token }) {
      // Define the expected shape of the session.user object
      interface SessionUser {
        id: string
        firstName: string
        lastName: string
        lists?: Record<string, Record<string, string | IBook[]>>
        friends?: SchemaDefinitionProperty[]
        imageName?: string | null
        defaultImage?: string
      }
      // Pass in user id and lists from token to session
      if (session.user) {
        const user: SessionUser = {
          id: token.id ?? '',
          firstName: (token.firstName ?? '') as string,
          lastName: (token.lastName ?? '') as string,
          lists: token.lists,
          friends: token.friends,
          imageName: token.imageName,
          defaultImage: token.defaultImage,
        }
        session.user = {
          ...session.user,
          ...user,
        }
      }
      return session
    },
    async signIn({ profile, user }) {
      if (!profile) return true
      try {
        // Connect to database
        await startDb()
        const userExists = await GoogleUser.findOne({
          email: profile.email,
        }).lean()
        // console.log('SIGNIN CALLBACK: ', profile)

        // If new user, create user in database
        if (!userExists) {
          await GoogleUser.create({
            email: profile!.email,
            name: profile!.name,
            lists: {
              ['Read']: [],
              ['Currently Reading']: [],
              ['Want to Read']: [],
            },
            friends: [],
            imageName: null,
            defaultImage: (profile as GoogleProfile)!.picture,
          })
          return true
        }

        // Update user info from database to user object
        user.name = userExists!.name
        user.lists = userExists!.lists
        user.friends = userExists!.friends
        user.imageName = userExists!.imageName

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
