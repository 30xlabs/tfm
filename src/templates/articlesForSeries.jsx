import React, { memo } from "react"

//Component
import { Box } from "theme-ui"
import ArticleList from "../components/articlesList"

//hooks
import { graphql } from "gatsby"

const getArticleData = data =>
  data.allMarkdownRemark.edges.map(({ node }) => ({
    ...node.frontmatter,
    id: node.id,
    body: node.excerpt,
  }))

const transformArticleData = data =>
  data.map(item => ({
    image: item.coverImg,
    title: item.title,
    body: item.body,
    showLink: true,
    id: item.id,
  }))

const SeriesItem = ({ data }) => {
  const articleData = getArticleData(data)
  const items = transformArticleData(articleData)
  return (
    <Box sx={{ width: ["90%", "75%", "60%"], margin: "auto" }}>
      <ArticleList items={items} />
    </Box>
  )
}

export default memo(SeriesItem)

export const query = graphql`
  query Series($series: String) {
    allMarkdownRemark(filter: { frontmatter: { series: { regex: $series } } }) {
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
