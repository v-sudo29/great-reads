import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user : {
      lists: Record<string, Record<string, Record<string, string>>[]> | {},
      friends: SchemaDefinitionProperty[] | [],
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    lists: Record<string, Record<string, Record<string, string>>[]> | {},
    friends: SchemaDefinitionProperty[] | []
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT{
    id: string
    lists: Record<string, Record<string, Record<string, string>>[]> | {},
    friends: SchemaDefinitionProperty[] | []
  } 
}