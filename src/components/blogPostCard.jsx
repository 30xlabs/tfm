import React from "react"
import { Box, Grid } from "theme-ui"
import BlogCard from "./blogCard"

const BlogPostCardList = ({ postsData }) => {
  console.log({ postsData })
  return (
    <Box sx={{ marginTop: "28px", paddingRight: "0px" }}>
      <Grid columns={[1, 2, 3]}>
        {postsData.map(post => (
          <BlogCard key={post.id} {...post} />
        ))}
      </Grid>
    </Box>
  )
}

export default BlogPostCardList
