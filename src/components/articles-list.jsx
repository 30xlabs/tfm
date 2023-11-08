import React, { memo, useCallback } from "react"

//Components
import { Grid, Box } from "theme-ui"
import ArticleContainer from "./article-container"

//Helpers
import { navigate } from "gatsby"

function ArticleList({ items }) {
  const onClick = useCallback(encodedPath => {
    navigate(`/article/${encodedPath}`)
  }, [])
  return (
    <Box sx={{ marginTop: "28px", paddingRight: "0px" }}>
      <Grid columns={[1, 2, 3]}>
        {items.map(item => (
          <ArticleContainer item={item} onClick={onClick} />
        ))}
      </Grid>
    </Box>
  )
}

export default memo(ArticleList)
