import React, { memo } from "react"

//Components
import { Card, Text } from "theme-ui"

function truncateText(text, maxLength) {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "..."
}

function ThumbnailBody({ title, body }) {
  return (
    <Card
      sx={{
        marginLeft: [0, "12px"],
        marginBottom: "20px",
        padding: ["10px", "12px"],
      }}
    >
      <Text title={title} as="h5" sx={{ fontSize: [2, 3] }}>
        {truncateText(title, 50)}
      </Text>
      <Text className="blog-card-content" sx={{ marginBottom: "20px" }}>
        {body}
      </Text>
    </Card>
  )
}

export default memo(ThumbnailBody)
