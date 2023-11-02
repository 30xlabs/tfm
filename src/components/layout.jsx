import React from "react"
import { Button, Container, Divider, useColorMode } from "theme-ui"
import Header from "./header"
import Footer from "./footer"
import { graphql, useStaticQuery } from "gatsby"
import { Location } from "@reach/router"
import { useTheme } from "../context/ThemeContext"

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme()
  const [, setColorMode] = useColorMode()

  const switchTheme = () => {
    toggleTheme()
    setColorMode(theme || "dark")
  }

  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = siteData.site.siteMetadata

  return (
    <Container bg="muted">
      <Location>
        {({ location }) => {
          const firstPathSegment = location.pathname.split("/")[1] || ""
          const currentTab = firstPathSegment ? `/${firstPathSegment}` : "/"

          return (
            <>
              <Header
                themeBtn={
                  <Button
                    title={`Switch to ${theme === "light" ? "dark" : "light"}`}
                    onClick={switchTheme}
                  >
                    {theme === "light" ? "🌙" : "☀️"}
                  </Button>
                }
                title={title}
                currentTab={currentTab}
              />
              <Divider m={0} color="border" />
              <div>{children}</div>
              <Footer currentTab={currentTab} />
            </>
          )
        }}
      </Location>
    </Container>
  )
}
