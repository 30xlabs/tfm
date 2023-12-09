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
import { LocationProvider } from "@reach/router"

export const wrapPageElement = ({ element, props }) => {
  return (
    <LocationProvider>
      {({ location }) => {
        if (!location) return null
        return (
          <Layout location={location} {...props}>
            {element}
          </Layout>
        )
      }}
    </LocationProvider>
  )
}
