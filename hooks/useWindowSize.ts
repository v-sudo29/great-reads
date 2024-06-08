import { useState, useLayoutEffect } from "react"

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (!windowWidth) setWindowWidth(window.innerWidth)
    const resizeWindow = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  return windowWidth
}

export default useWindowSize