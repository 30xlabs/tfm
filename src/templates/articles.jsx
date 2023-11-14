import React from "react"

//components
import { Box } from "theme-ui"
import ArticlesList from "../components/articles-list"

//helpers
import { graphql } from "gatsby"

//utils
import { getArticleData, transformArticleData } from "../utils"

const Articles = ({ data }) => {
  const articleData = getArticleData(data)
  const items = transformArticleData(articleData)

  return (
    <Box sx={{ width: ["90%", "75%", "60%"], margin: "auto" }}>
      <ArticlesList items={items} />
    </Box>
  )
}

export default Articles

export const query = graphql`
  query Articles($type: [String]!) {
    allMarkdownRemark(
      filter: { frontmatter: { type: { in: $type } } }
      sort: { frontmatter: { publishedAt: ASC } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 50)
          frontmatter {
            title
            type
            tagList
            publishedAt
            coverImg
          }
        }
      }
    }
    allBlogPost(
      filter: { frontmatter: { type: { in: $type } } }
      sort: { frontmatter: { publishedAt: ASC } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            type
            tagList
            publishedAt
            coverImg
          }
        }
      }
    }
  }
`
