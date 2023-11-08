import React, { memo } from "react"
import { Text } from "theme-ui"

function Tag({ tag, backgroundColor, color }) {
  return (
    <Text
      key={tag}
      title={tag}
      sx={{
        backgroundColor,
        color,
        borderRadius: "default",
        padding: "1",
        fontSize: "10px",
      }}
    >
      #{tag}
    </Text>
  )
}

export default memo(Tag)
