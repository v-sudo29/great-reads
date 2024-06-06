import { SchemaDefinitionProperty } from "mongoose"
import { IBook } from "./bookType"

export interface IOtherUser {
  id: string
  name: string
  lists: Record<string, IBook[]> | {}
  friends: SchemaDefinitionProperty[] | []
}

export interface IUser {
  id?: string
  _id?: string
  email: string
  name: string
  lists: Record<string, Record<string, Record<string, string>>[]> | {}
  friends: SchemaDefinitionProperty[]
}