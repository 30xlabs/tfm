import { useEffect } from "react"

//Utils
import { logEvent } from "../utils"

export default function usePageTiming() {
  useEffect(() => {
    const pageLoadTime = performance.now()

    const handleUnload = () => {
      const pageUnloadTime = performance.now()
      const timeSpentOnPage = pageUnloadTime - pageLoadTime
      logEvent("time_spent_on_page", {
        time_spent: timeSpentOnPage,
        page_title: document.title,
      })
    }

    window.addEventListener("unload", handleUnload)

    return () => {
      window.removeEventListener("unload", handleUnload)
    }
  }, [])
}
