/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const tagColorsData = require("./src/data/tag-colors")

function capitalizeAndReplace(text) {
  // Split the text by hyphens, capitalize each word, and join them with spaces
  const words = text
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return words
}

async function getSeriesList(graphql) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { series: { ne: null } } }) {
        group(field: { frontmatter: { series: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const seriesData = data.allMarkdownRemark.group
  const seriesMap = new Map()

  seriesData.forEach(element => {
    const key = element.fieldValue.toLowerCase()
    seriesMap.set(key, (seriesMap.get(key) || 0) + element.totalCount)
  })

  return Array.from(seriesMap)
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  createPage({
    path: "/articles",
    component: require.resolve(`./src/templates/articles.jsx`),
    context: { type: ["ARTICLE", "SERIES"] },
  })

  const seriesList = await getSeriesList(graphql)

  createPage({
    path: `/series`,
    component: require.resolve(`./src/templates/series.jsx`),
    context: { seriesList },
  })

  seriesList.forEach(series => {
    createPage({
      path: `/series/${series[0]}`,
      component: require.resolve(`./src/templates/articles-for-series.jsx`),
      context: { series: `/${capitalizeAndReplace(series[0])}/i` },
    })
  })

  const {
    data: { allMarkdownRemark },
  } = await graphql(`
    query {
      allMarkdownRemark(sort: { frontmatter: { publishedAt: ASC } }) {
        nodes {
          id
        }
      }
    }
  `)
  const articles = allMarkdownRemark.nodes

  articles.forEach((article, index) => {
    const previousPostId = index === 0 ? null : articles[index - 1].id
    const nextPostId =
      index === articles.length - 1 ? null : articles[index + 1].id
    const context = { id: article.id, previousPostId, nextPostId }

    createPage({
      path: `/article/${article.id}`,
      component: require.resolve(`./src/templates/article-post.jsx`),
      context,
    })
  })
}

require("dotenv").config({
  path: `.env`,
})

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type TagColors implements Node {
      id: Int
      backgroundColor: String
      color: String
    }
  `)
}

exports.sourceNodes = ({ actions, createContentDigest }) => {
  const { createNode } = actions
  const tagsList = Object.keys(tagColorsData)

  tagsList.forEach(tag => {
    const node = {
      ...tagColorsData[tag],
      id: tag,
      parent: null,
      children: [],
      internal: {
        type: "TagColors",
        content: JSON.stringify(tagColorsData[tag]),
        contentDigest: createContentDigest(tagColorsData[tag]),
      },
    }

    createNode(node)
  })
}
