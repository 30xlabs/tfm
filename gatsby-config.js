/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `The Frontend Master`,
    description: `Hello, Welcome to TFM - The Frontend Master`,
    author: `@sakethkowtha`,
    siteUrl: `https://kowthasaketh.com/`,
  },
  pathPrefix: "",
  plugins: [
    "gatsby-plugin-theme-ui",
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdxPages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: ({ object }) => (object.project ? `Project` : `Json`),
        path: `${__dirname}/src/content/series`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TFM - The Frontend master`,
        description: `Hello, Welcome to TFM - The Frontend Master`,
        short_name: `TFM`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ee4e4e`,
        theme_color: `#ee4e4e`,
        display: "standalone",
        icon: `src/assets/main-logo.svg`, // This path is relative to the root of the site.
        crossOrigin: `use-credentials`, // `use-credentials` or `anonymous`
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              /* contents go here */
              return allMarkdownRemark.nodes.map(node => {
                const x = Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [
                    { "content:encoded": node.html, tags: node.tags },
                  ],
                })
                return x
              })
            },
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "The frontend master RSS feed",
            language: `en-US`,
          },
        ],
      },
    },
  ],
}
