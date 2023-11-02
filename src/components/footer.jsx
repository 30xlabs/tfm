import React from "react"
import { Link, Text } from "theme-ui"

const Footer = ({ currentTab }) => {
  if (!["news-letter"].includes(currentTab) || currentTab !== "/") return null
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
      <Link
        target="_blank"
        href="https://www.30xlabs.com"
        sx={{ fontSize: "12px" }}
      >
        <Text color="primary">Powered by 30x labs</Text>
      </Link>
    </footer>
  )
}

export default Footer
