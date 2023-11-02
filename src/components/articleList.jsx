import React from "react"
import { Box, Text } from "theme-ui"

const ArticleList = ({ articles }) => {
  return (
    <Box>
      {articles.map(article => (
        <div key={article.id}>
          <Text as="h3">{article.title}</Text>
          <Text>{article.content}</Text>
        </div>
      ))}
    </Box>
  )
}

export default ArticleList
