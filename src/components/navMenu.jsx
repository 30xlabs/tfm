// NavMenu.js
import React from "react"
import { Flex, NavLink } from "theme-ui"
import clsx from "clsx"

const NavMenu = ({ navItems, currentTab, vertical, themeBtn }) => {
  return (
    <Flex as="nav" sx={{ flexDirection: vertical ? "column" : "row" }}>
      {navItems.map(({ label, route, target }) => {
        const isActiveTab = route === currentTab
        return (
          <NavLink
            color={isActiveTab ? "accent" : "secondary"}
            key={label}
            target={target}
            className={clsx(`sketch-border nav-item`, {
              "active-tab": isActiveTab,
            })}
            href={route}
            p={2}
            mx={2}
          >
            {label}
          </NavLink>
        )
      })}
      {themeBtn}
    </Flex>
  )
}

export default NavMenu
