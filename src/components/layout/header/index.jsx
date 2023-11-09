import React, { memo, useState } from "react"

//Components
import { Box, Card, Flex } from "theme-ui"
import NavMenu from "./nav-menu"
import MobileMenuButton from "./mobile-menu-button"
import AppLogo from "./app-logo"

//Hooks
import { useStaticQuery, graphql } from "gatsby"

const Header = ({ title, currentTab, themeBtn }) => {
  const {
    allJson: { nodes: navItems },
  } = useStaticQuery(graphql`
    query NavItems {
      allJson(filter: { route: { ne: null } }) {
        nodes {
          label
          route
        }
      }
    }
  `)

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <Flex bg={"primary"} color="secondary">
      <Box p={2} sx={logoContainerStyles}>
        <AppLogo title={title} />
      </Box>
      <Box p={2} sx={menuContainerStyles}>
        <NavMenu
          navItems={navItems}
          currentTab={currentTab}
          themeBtn={themeBtn}
        />
      </Box>
      <MobileMenuButton
        showMobileMenu={showMobileMenu}
        toggleMobileMenu={toggleMobileMenu}
      />
      {showMobileMenu && (
        <Card bg={"primary"} p={3} sx={mobileMenuStyles}>
          <NavMenu
            navItems={navItems}
            currentTab={currentTab}
            vertical
            themeBtn={themeBtn}
          />
        </Card>
      )}
    </Flex>
  )
}

const logoContainerStyles = {
  flex: "1 1 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: ["left", "center", "left"],
}

const menuContainerStyles = {
  alignItems: "center",
  display: ["none", "none", "block"],
}

const mobileMenuStyles = {
  marginTop: "48px",
  position: "absolute",
  right: "0",
  left: 0,
  zIndex: 9999,
  backdropFilter: "blur(20px)",
}

export default memo(Header)
