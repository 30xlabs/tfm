/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const { defaultTo, sum, map, prop } = require("ramda")
const tagColorsData = require("./src/data/tag-colors")

//Services
const {
  fetchArticle,
  fetchArticlesFromDevTo,
} = require("./src/services/articles")

function capitalizeAndReplace(text) {
  // Split the text by hyphens, capitalize each word, and join them with spaces
  const words = text
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return words
}

async function getSeriesList(graphql) {
  const {
    data: { allMarkdownRemark, allBlogPost },
  } = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { series: { ne: null } } }) {
        group(field: { frontmatter: { series: SELECT } }) {
          fieldValue
          totalCount
          nodes {
            timeToRead
          }
        }
      }
      allBlogPost(filter: { frontmatter: { series: { ne: null } } }) {
        group(field: { frontmatter: { series: SELECT } }) {
          fieldValue
          totalCount
          nodes {
            timeToRead
          }
        }
      }
    }
  `)

  const seriesData = [...allMarkdownRemark.group, ...allBlogPost.group]
  const seriesMap = new Map()

  seriesData.forEach(element => {
    const key = element.fieldValue.toLowerCase()
    const totalCount = sum([
      defaultTo(0, seriesMap.get(key)?.totalCount),
      element.totalCount,
    ])
    const timeToRead = sum([
      defaultTo(0, seriesMap.get(key)?.timeToRead),
      sum(map(prop("timeToRead"), element.nodes)),
    ])

    seriesMap.set(key, {
      totalCount,
      timeToRead,
    })
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
    path: `/series-list`,
    component: require.resolve(`./src/templates/series-list.jsx`),
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
    data: { allMarkdownRemark, allBlogPost },
  } = await graphql(`
    query {
      allMarkdownRemark(sort: { frontmatter: { publishedAt: ASC } }) {
        nodes {
          id
        }
      }
      allBlogPost(sort: { frontmatter: { publishedAt: ASC } }) {
        nodes {
          id
        }
      }
    }
  `)
  const articles = [...allMarkdownRemark.nodes, ...allBlogPost.nodes]

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

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
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

  const response = await fetchArticlesFromDevTo()
  const articles = response.data

  for (let i = 0; i < articles.length; i++) {
    const post = articles[i]
    const { data: postInfo } = await fetchArticle(post.id)
    const frontMatter = frontmatterStringToJson(postInfo?.body_markdown)
    const node = {
      id: createNodeId(post.id),
      parent: null,
      children: [],
      excerpt: post.description,
      html: postInfo.body_html,
      rawMarkdownBody: postInfo.body_markdown,
      timeToRead: postInfo.reading_time_minutes,
      frontmatter: {
        series: parseStringToArray(frontMatter.series),
        title: post.title,
        tagList: post.tag_list,
        publishedAt: postInfo.readable_publish_date,
        coverImg: post.cover_image,
        type: frontMatter.series ? ["ARTICLE", "SERIES"] : ["ARTICLE"],
      },
      internal: {
        type: "BlogPost", // The type you'll query for in GraphQL
        contentDigest: createContentDigest(post),
      },
    }
    createNode(node)
  }
}

function frontmatterStringToJson(frontmatterString = "") {
  const frontmatterLines = frontmatterString.split("\n")
  const frontmatterJson = {}

  // Parse frontmatter lines until the first occurrence
  let firstFrontmatterFound = false
  frontmatterLines.forEach(line => {
    if (line === "---" && !firstFrontmatterFound) {
      firstFrontmatterFound = true
    } else if (firstFrontmatterFound) {
      const [key, value] = line.split(":")
      if (key && value) {
        const trimmedKey = key.trim()
        const trimmedValue = value.trim()
        frontmatterJson[trimmedKey] = trimmedValue
      }
    }
  })

  return frontmatterJson
}

function parseStringToArray(inputString) {
  if (!inputString) return null
  try {
    // Remove square brackets and split by comma
    const array = inputString
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map(item => item.trim())

    return Array.isArray(array) ? array : []
  } catch (error) {
    console.error("Error parsing the string to array:", error.message)
    return []
  }
}
