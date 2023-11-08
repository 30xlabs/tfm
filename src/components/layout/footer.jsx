import React, { memo } from "react"

//Components
import { Link } from "gatsby"
import { Text } from "theme-ui"

const Footer = ({ currentTab }) => {
  if (!currentTab.includes("news-letter") && currentTab !== "/") return null
  return (
    <footer
      style={{
        position: "fixed",
        bottom: "12px",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <Link as="a">
        <Text
          onClick={() => window.open("http://www.30xlabs.com")}
          sx={{ fontSize: "10px", cursor: "pointer" }}
        >
          Powered by 30x labs
        </Text>
      </Link>
    </footer>
  )
}

export default memo(Footer)
