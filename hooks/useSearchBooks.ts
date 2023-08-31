import { useState } from "react"
import { FetchData, Item } from "@/types/fetchTypes"

export default function useGetBooks(searchTerms: string) {
  const [response, setResponse] = useState<Item[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // The `fetch` function is automatically memoized and the result
  // is cached
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerms}`)
      const data: FetchData = await response.json()
      setResponse(data.items)
    } catch (error) {
      console.log(error)
      setError(`${error} Could not fetch data`)
    } finally {
      setIsLoading(false)
    }

    fetchData()
    return { response, error, isLoading }
  }
}