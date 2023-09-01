import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user : {
      lists: Array<string[]> | [],
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    lists: Array<string[]> | []
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT{
    id: string
    lists: Array<string[]> | []
  } 
}