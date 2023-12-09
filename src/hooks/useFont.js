import { useState } from "react"

export default function useFont() {
  const [theme, setTheme] = useState()

  return [theme, setTheme]
}
