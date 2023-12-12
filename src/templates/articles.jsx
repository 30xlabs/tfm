import React, { useEffect } from "react"

//components
import { Box } from "theme-ui"
import ArticlesList from "../components/articles-list"

//helpers
import { graphql } from "gatsby"

//utils
import {
  getArticleData,
  logEvent,
  sortByDateInDesc,
  transformArticleData,
} from "../utils"

//Hooks
import usePageTiming from "../hooks/usePageTiming"

const Articles = ({ data }) => {
  usePageTiming()
  useEffect(() => {
    logEvent("opened_articles_list_page")
  }, [])
  const articleData = getArticleData(data)
  const items = transformArticleData(articleData)

  return (
    <Box sx={{ width: ["90%", "75%", "60%"], margin: "auto" }}>
      <ArticlesList items={items.sort(sortByDateInDesc)} />
    </Box>
  )
}

export default Articles

export const query = graphql`
  query Articles($type: [String]!) {
    allMarkdownRemark(
      filter: { frontmatter: { type: { in: $type } } }
      sort: { frontmatter: { publishedAt: DESC } }
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
      sort: { frontmatter: { publishedAt: DESC } }
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
