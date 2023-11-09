import React, { memo } from "react"
import { Link } from "gatsby"
import { Text } from "theme-ui"

function ThumbnailLink({ showLink, id }) {
  if (!showLink) return null
  return (
    <Link to={`/article/${id}`} className="txt-decoration-none">
      <Text
        sx={{
          position: "absolute",
          bottom: 2,
          right: 18,
          color: "accent",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Read more...
      </Text>
    </Link>
  )
}

export default memo(ThumbnailLink)
