import React, { memo } from "react"

//Components
import { Box } from "theme-ui"
import ThumbnailImage from "./thumbnailImage"
import ThumbnailBody from "./thumbnailBody"
import ThumbnailLink from "./thumbnailLink"

function ArticleThumbnail({ image, title, body, showLink, id, onClick }) {
  return (
    <Box
      className="neumorphic variation2"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        position: "relative",
        borderRadius: 20,
        cursor: "pointer",
      }}
      onClick={() => onClick?.()}
    >
      <ThumbnailImage image={image} title={title} />
      <ThumbnailBody title={title} body={body} />
      <ThumbnailLink showLink={showLink} id={id} />
    </Box>
  )
}

export default memo(ArticleThumbnail)
