import React, { memo, useEffect } from "react"

//Component
import { Box } from "theme-ui"
import ArticleList from "../components/articles-list"

//hooks
import { graphql } from "gatsby"
import Seo from "../components/seo"

//Utils
import {
  extractSubstring,
  getArticleData,
  logEvent,
  transformArticleData,
} from "../utils"

const SeriesItem = ({ data, pageContext }) => {
  const articleData = getArticleData(data)
  const items = transformArticleData(articleData)
  const seriesName = extractSubstring(pageContext.series)
  useEffect(() => {
    logEvent("Opened series", { seriesName })
  }, [])
  return (
    <Seo title={seriesName} description={`Series - ${seriesName}`}>
      <Box sx={{ width: ["90%", "75%", "60%"], margin: "auto" }}>
        <ArticleList items={items} />
      </Box>
    </Seo>
  )
}

export default memo(SeriesItem)

export const query = graphql`
  query Series($series: String) {
    allMarkdownRemark(
      filter: { frontmatter: { series: { regex: $series } } }
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
            series
          }
        }
      }
    }
    allBlogPost(
      filter: { frontmatter: { series: { regex: $series } } }
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
            series
          }
        }
      }
    }
  }
`
