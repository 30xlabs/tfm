import React, { memo } from "react"

//Components
import Thumbnail from "./article/thumbnail"

function ArticleContainer({ item, onClick }) {
  return (
    <Thumbnail
      onClick={() => onClick(item.id)}
      key={item.id}
      {...item}
      body={item.body}
    />
  )
}

export default memo(ArticleContainer)
