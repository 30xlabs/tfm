import React from "react"
import { Box } from "theme-ui"
import BlogPosts from "../components/blogPostCard"
import { useStaticQuery, graphql } from "gatsby"

// Transform data to required format
const transformData = data => {
  return data.allFile.edges.map(edge => {
    const { childMdx } = edge.node
    return {
      id: childMdx.id,
      title: childMdx.frontmatter.title,
      date: childMdx.frontmatter.date,
      image: childMdx.frontmatter.cover,
      body: childMdx.body.slice(0, 300),
    }
  })
}

const Articles = () => {
  // Fetch and transform blog data
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "articles" } }) {
        edges {
          node {
            id
            childMdx {
              id
              body
              frontmatter {
                date
                slug
                title
                cover
              }
            }
          }
        }
      }
    }
  `)
  const postsData = transformData(data)

  return (
    <Box sx={{ width: ["90%", "75%", "60%"], margin: "auto" }}>
      <BlogPosts postsData={postsData} />
    </Box>
  )
}

export default Articles
