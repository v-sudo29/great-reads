import { SchemaDefinitionProperty } from "mongoose"
import { IBook } from "./bookType"

export interface IOtherUser {
  id: string
  firstName: string
  lastName: string
  lists: Record<string, {
    color: string,
    books: IBook[]
  }> | {}
  friends: SchemaDefinitionProperty[] | []
}

export interface IUser {
  id?: string
  _id?: string
  email: string
  firstName: string
  lastName: string
  lists: Record<string, {
    color: string,
    books: IBook[]
  }> | {}
  friends: SchemaDefinitionProperty[]
}