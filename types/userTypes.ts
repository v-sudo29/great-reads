import { SchemaDefinitionProperty } from "mongoose"
import { IBook } from "./bookType"

export interface IOtherUser {
  id: string
  name: string
  lists: Record<string, IBook[]> | {}
  friends: SchemaDefinitionProperty[] | []
}