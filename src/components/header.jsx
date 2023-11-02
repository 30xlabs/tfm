import React, { useState } from "react"
import { Box, Close, Flex, Heading, MenuButton, Text } from "theme-ui"
import navItems from "../content/navItems/index.json"
import NavMenu from "./NavMenu"

const Logo = ({ title }) => (
  <Heading>
    {title.split(" ").map(word => (
      <span key={word}>
        <Text
          className="logo-text"
          color="accent"
          sx={{ marginLeft: "8px", display: "inline-block" }}
        >
          {word[0]}
        </Text>
        <Text className="logo-text" sx={{ display: "inline" }}>
          {word.slice(1)}
        </Text>
      </span>
    ))}
  </Heading>
)

const MobileMenuButton = ({ showMobileMenu, toggleMobileMenu }) =>
  showMobileMenu ? (
    <Close m={2} onClick={toggleMobileMenu} sx={mobileMenuButtonStyles} />
  ) : (
    <MenuButton m={2} onClick={toggleMobileMenu} sx={mobileMenuButtonStyles} />
  )

const mobileMenuButtonStyles = {
  display: ["inline-block", "inline-block", "none"],
  alignItems: "center",
}

const Header = ({ title, currentTab, themeBtn }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <Flex bg={"primary"} color="secondary">
      <Box p={2} sx={logoContainerStyles}>
        <Logo title={title} />
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
        <Box bg={"primary"} p={3} sx={mobileMenuStyles}>
          <NavMenu
            navItems={navItems}
            currentTab={currentTab}
            vertical
            themeBtn={themeBtn}
          />
        </Box>
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
}

export default Header
