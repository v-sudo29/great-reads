import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import { Profile } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      posts:
        | {
            caption: string
            imageName?: string | null
            timestamp: string
          }[]
        | []
      lists:
        | Record<
            string,
            {
              color: string
              books: IBook[]
            }
          >
        | {}
      friends: SchemaDefinitionProperty[] | []
      id: string
      imageName: string | null
      defaultImage?: string
      firstName: string
      lastName: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    lists:
      | Record<
          string,
          {
            color: string
            books: IBook[]
          }
        >
      | {}
    posts:
      | {
          caption: string
          imageName?: string | null
          timestamp: string
        }[]
      | []
    friends: SchemaDefinitionProperty[] | []
    imageName: string | null
    defaultImage?: string
    firstName: string
    lastName: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    lists:
      | Record<
          string,
          {
            color: string
            books: IBook[]
          }
        >
      | {}
    posts:
      | {
          caption: string
          imageName?: string | null
          timestamp: string
        }[]
      | []
    friends: SchemaDefinitionProperty[] | []
    imageName: string | null
    defaultImage?: string
    firstName: string
    lastName: string
  }
}
