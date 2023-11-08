import React from "react"

//components
import { Box } from "theme-ui"
import ArticlesList from "../components/articles-list"

//helpers
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
    allMarkdownRemark(filter: { frontmatter: { type: { in: $type } } }) {
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
  }
`
