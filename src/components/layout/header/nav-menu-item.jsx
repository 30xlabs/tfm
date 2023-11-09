import React, { memo } from "react"
import clsx from "clsx"
import { Link } from "gatsby"
import { Text } from "theme-ui"

function NavMenuItem({ label, route, target, isActiveTab }) {
  return (
    <Link to={route} className="txt-decoration-none">
      <Text
        color={isActiveTab ? "accent" : "secondary"}
        key={label}
        target={target}
        className={clsx(`sketch-border nav-item`, {
          "active-tab": isActiveTab,
        })}
        p={2}
        sx={{
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        mx={2}
      >
        {label}
      </Text>
    </Link>
  )
}

export default memo(NavMenuItem)
