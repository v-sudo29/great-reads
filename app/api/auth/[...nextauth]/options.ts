import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import startDb from '@lib/db'
import convertToObjectId from '@lib/convertToObjectId'
import User from '@models/userModel'
import GoogleUser from '@models/googleUserModel'
import Post from '@models/postModel'
import Comment from '@models/commentModel'
import { AuthOptions } from 'next-auth'
import { GoogleProfile } from 'next-auth/providers/google'

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
        const posts = transformedUser.posts
        const likedPosts = transformedUser.likedPosts
        const comments = transformedUser.comments

        const returnedUser = {
          ...transformedUser,
          id: userId,
          lists: lists,
          friends: friends,
          imageName: imageName,
          firstName: firstName,
          lastName: lastName,
          posts: posts,
          likedPosts: likedPosts,
          comments: comments,
        }

        return returnedUser
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
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

      // If user updates POST -- update token and database
      if (trigger === 'update' && session?.posts) {
        // Check if posts count is equal, more than, or less than prior count
        const priorCount = token.posts.length
        const newCount = session.posts.length

        const isPostUpdated = newCount === priorCount // Updating a post
        const isPostRemoved = newCount < priorCount // Removing a post
        const isPostCreated = newCount > priorCount // Create new post

        // Create new post
        if (isPostCreated) {
          // Newest post
          const newestPost = session.posts[session.posts.length - 1]

          // Update user in users collection
          const credentialsUser = await User.findOne({ email: token.email })

          // Add post to posts collection and user's posts field
          if (credentialsUser && newestPost) {
            const newPost = {
              userId: credentialsUser?._id,
              ...newestPost,
            }
            const postCreated = await Post.create(newPost)

            await User.findOneAndUpdate(
              { email: token.email },
              { $push: { posts: postCreated } }
            )

            // Update session and token
            session.posts[session.posts.length - 1] = postCreated
            token.posts = session.posts
          }
        }

        // TODO: Remove post or update post
        if (isPostRemoved || isPostUpdated) {
          token.posts = session.posts

          // Update user in database
          const credentialsUser = await User.findOne({ email: token.email })

          if (credentialsUser)
            await User.findOneAndUpdate(
              { email: token.email },
              { posts: token.posts }
            )
        }
      }

      // If user updates LIKEDPOSTS -- update token and database
      if (trigger === 'update' && session?.likedPosts) {
        token.likedPosts = session.likedPosts

        // Update user in database
        const credentialsUser = await User.findOne({ email: token.email })

        if (credentialsUser) {
          // Convert postIds to ObjectId
          const convertedPostIds = session.likedPosts.map((postId: string) => {
            return convertToObjectId(postId)
          })

          // Update likedPosts for User
          await User.findOneAndUpdate(
            { email: token.email },
            { likedPosts: convertedPostIds }
          )
        }
      }

      // If user updated COMMENTS -- update token and database
      if (trigger === 'update' && session?.comments) {
        // Check if comments count is equal, more than, or less than prior count
        const priorCount = token.comments.length
        const newCount = session.comments.length

        const isCommentUpdated = newCount === priorCount
        const isCommentCreated = newCount > priorCount
        const isCommentDeleted = newCount < priorCount

        // TODO: Feature to UPDATE comment
        if (isCommentUpdated) {
          console.log('Existing comment updated!')
        }
        // Feature to CREATE comment
        if (isCommentCreated) {
          // Create new Comment for Comments collection
          const recentComment = session.comments[session.comments.length - 1]
          const newCommentCreated = await Comment.create(recentComment)

          // Update "comments" field in User
          const updateUserComments = () => {
            return User.findOneAndUpdate(
              { email: token.email },
              { $push: { comments: newCommentCreated } }
            )
          }

          // Add comment to correct Post in Post collection
          const updatePostComments = () => {
            return Post.findOneAndUpdate(
              { _id: newCommentCreated.postId },
              { $push: { comments: newCommentCreated } }
            )
          }

          // Add comment to correct post in Users in Users collection
          const updateUserPostComments = () => {
            return User.findOneAndUpdate(
              {
                _id: newCommentCreated.userId,
                'posts._id': newCommentCreated.postId,
              },
              {
                $push: {
                  'posts.$.comments': newCommentCreated,
                },
              }
            )
          }

          const completed = await Promise.all([
            updateUserComments(),
            updatePostComments(),
            updateUserPostComments(),
          ])
            .then(() => {
              console.log('All comment updates have been completed')
            })
            .catch((err) => console.log(err))

          session.comments[session.comments.length - 1] = newCommentCreated
          token.comments = session.comments
        }
        // TODO: Feature to DELETE comment
        if (isCommentDeleted) {
          token.comments = session.comments

          await User.findOneAndUpdate(
            { email: token.email },
            { comments: session.comments }
          )
          console.log('UPDATED COMMENTS!!!')
        }
      }

      // On FIRST LOGIN: Check if credentials user exists AND initial id not autogenerated
      if (user?.id && !/^\d+$/.test(user.id)) {
        token.id = user.id
        token.lists = user.lists
        token.friends = user.friends
        token.imageName = user.imageName
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.posts = user.posts
        token.likedPosts = user.likedPosts
        token.comments = user.comments
      }

      // On FIRST LOGIN: Find Google user in database, initial id is autogenerated
      // TODO: implement all properties for Google OAuth user
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
      // Pass in user id and lists from token to session
      if (session.user) {
        const user = {
          id: token.id ?? '',
          firstName: (token.firstName ?? '') as string,
          lastName: (token.lastName ?? '') as string,
          lists: token.lists,
          friends: token.friends,
          imageName: token.imageName,
          defaultImage: token.defaultImage,
          posts: token.posts,
          likedPosts: token.likedPosts,
          comments: token.comments,
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
