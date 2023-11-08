import React, { memo } from "react"

//Components
import { Close, MenuButton } from "theme-ui"

const mobileMenuButtonStyles = {
  display: ["inline-block", "inline-block", "none"],
  alignItems: "center",
}

const MobileMenuButton = memo(({ showMobileMenu, toggleMobileMenu }) =>
  showMobileMenu ? (
    <Close m={2} onClick={toggleMobileMenu} sx={mobileMenuButtonStyles} />
  ) : (
    <MenuButton m={2} onClick={toggleMobileMenu} sx={mobileMenuButtonStyles} />
  )
)

export default MobileMenuButton
