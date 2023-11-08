import React, { memo } from "react"
import clsx from "clsx"
import { NavLink } from "theme-ui"

function NavMenuItem({ label, route, target, isActiveTab }) {
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
}

export default memo(NavMenuItem)
