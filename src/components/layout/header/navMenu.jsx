import React, { memo } from "react"
import { Flex } from "theme-ui"

//Components
import NavMenuItem from "./navMenuItem"

function NavMenu({ navItems, currentTab, vertical, themeBtn }) {
  return (
    <Flex as="nav" sx={{ flexDirection: vertical ? "column" : "row" }}>
      {navItems.map(({ label, route, target }) => {
        const isActiveTab = route === currentTab
        return (
          <NavMenuItem
            key={label}
            label={label}
            route={route}
            target={target}
            isActiveTab={isActiveTab}
          />
        )
      })}
      {themeBtn}
    </Flex>
  )
}

export default memo(NavMenu)
