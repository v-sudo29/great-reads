import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { Profile } from "next-auth";
import { GoogleProfile } from "@node_modules/next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user : {
      lists: Record<string, IBook[]> | {},
      friends: SchemaDefinitionProperty[] | [],
      id: string
      image: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    lists: Record<string, IBook[]> | {},
    friends: SchemaDefinitionProperty[] | []
    image: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT{
    id: string
    lists: Record<string, IBook[]> | {},
    friends: SchemaDefinitionProperty[] | []
    image: string
  } 
}