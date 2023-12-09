import React from "react"

//Components
import ThemeProvider from "../context/ThemeContext"

export default function withThemeProvider(Component) {
  return props => (
    <ThemeProvider>
      <Component {...props} />
    </ThemeProvider>
  )
}
