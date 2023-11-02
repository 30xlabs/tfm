/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
import "./src/styles/normalize.css"
import "./src/styles/global.css"

import React from "react"
import Layout from "./src/components/layout"
import { ThemeProvider } from "./src/context/ThemeContext"

export const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider>
      <Layout {...props}>{element}</Layout>
    </ThemeProvider>
  )
}