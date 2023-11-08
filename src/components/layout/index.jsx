import React, { memo } from "react"

//Components
import { Button, Container, Divider, useColorMode } from "theme-ui"
import Header from "./header"
import Footer from "./footer"
import Seo from "../seo"

//Hooks
import { graphql, useStaticQuery } from "gatsby"
import { useTheme } from "../../context/ThemeContext"

function Layout({ children, location }) {
  const { theme, toggleTheme } = useTheme()
  const [, setColorMode] = useColorMode()

  const switchTheme = () => {
    toggleTheme()
    setColorMode(theme || "dark")
  }

  const { site, allJson } = useStaticQuery(graphql`
    query seoTitlesAndSite {
      site {
        siteMetadata {
          title
        }
      }
      allJson(filter: { route: { ne: null } }) {
        nodes {
          pageTitle
          description
          route
        }
      }
    }
  `)

  const { title } = site.siteMetadata
  const firstPathSegment = location.pathname.split("/")[1] || ""
  const currentTab = firstPathSegment ? `/${firstPathSegment}` : "/"

  const { pageTitle, description } =
    allJson.nodes.find(item => item.route === currentTab) || {}

  const themeButton = (
    <Button
      title={`Switch to ${theme === "light" ? "dark" : "light"}`}
      onClick={switchTheme}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  )

  return (
    <>
      <Seo title={pageTitle} description={description}>
        <Container bg="muted">
          <>
            <Header
              themeBtn={themeButton}
              title={title}
              currentTab={currentTab}
            />
            <Divider m={0} color="border" />
            <div>{children}</div>
            <Footer currentTab={currentTab} />
          </>
        </Container>
      </Seo>
    </>
  )
}

export default memo(Layout)
