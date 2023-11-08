import React, { memo } from "react"
import { Link } from "theme-ui"

function ThumbnailLink({ showLink, id }) {
  if (!showLink) return null
  return (
    <Link
      href={`/article/${id}`}
      sx={{
        position: "absolute",
        bottom: 2,
        right: 18,
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      Read more...
    </Link>
  )
}

export default memo(ThumbnailLink)
