import React, { memo } from "react"

//hooks
import { graphql, Link } from "gatsby"

//Components
import { Box, Container, Text } from "theme-ui"
import TagList from "../components/tag-list"
import ProfileCard from "../components/profile-card"
import { MainImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Markdown from "markdown-to-jsx"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { removeFrontMatter } from "../utils"

const CodeBlock = ({ children, className }) => {
  const language = className?.split("-")[1]
  // if (!className) return <pre style={{ display: "inline" }}>{children}</pre>
  const customStyle = !className
    ? {
        display: "inline",
        padding: 2,
        margin: 0,
      }
    : {}
  return (
    <SyntaxHighlighter
      customStyle={customStyle}
      language={language}
      style={dracula}
    >
      {children}
    </SyntaxHighlighter>
  )
}

const markdownOptions = {
  overrides: {
    code: CodeBlock,
  },
}

const BlogPost = ({ data }) => {
  const {
    markdownRemark,
    previousMarkdown,
    nextMarkdown,
    blogPost,
    previousBlogPost,
    nextBlogPost,
  } = data
  const {
    id,
    rawMarkdownBody,
    timeToRead,
    frontmatter: { title, publishedAt, coverImg, tagList },
  } = markdownRemark || blogPost

  const previous = previousMarkdown || previousBlogPost
  const next = nextMarkdown || nextBlogPost
  return (
    <section>
      <Seo
        title={title}
        description={`${title} - published at ${publishedAt} - tags : ${tagList.join(
          ",",
        )}`}
      >
        <article>
          <Box
            sx={{
              width: ["100%", "75%", "60%"],
              margin: "auto",
              marginTop: ["0px", "36px", "48px"],
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            // className="neumorphic variation2"
          >
            {coverImg && (
              <MainImage
                src={coverImg}
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
                width={"100%"}
                height={"340px"}
                alt={title}
              />
            )}
            <Container sx={{ width: "100%", p: 4 }} key={id}>
              <Container sx={{ display: "flex", alignItems: "center" }}>
                <Text
                  as="h5"
                  sx={{ marginTop: "12px", opacity: 0.8, marginRight: "24px" }}
                >
                  📝 Posted on {publishedAt}
                </Text>
                <Text
                  as="h5"
                  sx={{ marginTop: "12px", opacity: 0.8, marginRight: "24px" }}
                >
                  ⏳ {timeToRead} min read
                </Text>
              </Container>

              <Text as="h2" sx={{ margin: "20px 0" }}>
                {title}
              </Text>

              <TagList tags={tagList} />

              <Box sx={{ p: 2 }}>
                <Markdown options={markdownOptions}>
                  {removeFrontMatter(rawMarkdownBody)}
                </Markdown>
              </Box>
            </Container>
          </Box>
        </article>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: ["100%", "75%", "60%"],
            margin: "auto",
            marginTop: "18px",
          }}
        >
          <Container sx={{ width: "40%", marginRight: "10%" }}>
            <Link
              hidden={!previous?.id}
              to={`/article/${previous?.id}`}
              className="txt-decoration-none"
            >
              <Text
                sx={{
                  color: "accent",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                &larr; Previous ({previous?.frontmatter?.title})
              </Text>
            </Link>
          </Container>
          <Container sx={{ width: "40%" }}>
            <Link
              hidden={!next?.id}
              to={`/article/${next?.id}`}
              className="txt-decoration-none"
            >
              <Text
                sx={{
                  color: "accent",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                &rarr; Next ({next?.frontmatter?.title})
              </Text>
            </Link>
          </Container>
        </Container>
        <Box
          sx={{
            width: ["100%", "75%", "60%"],
            margin: "auto",
            marginTop: "18px",
          }}
        >
          <ProfileCard />
        </Box>
      </Seo>
    </section>
  )
}

export default memo(BlogPost)

export const query = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        coverImg
        publishedAt(formatString: "DD MMMM YYYY")
        tagList
        title
      }
      timeToRead
      rawMarkdownBody
    }
    blogPost(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        coverImg
        publishedAt
        tagList
        title
      }
      rawMarkdownBody
      timeToRead
    }
    previousMarkdown: markdownRemark(id: { eq: $previousPostId }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
    }
    previousBlogPost: blogPost(id: { eq: $previousPostId }) {
      id
      excerpt
      frontmatter {
        title
      }
    }
    nextMarkdown: markdownRemark(id: { eq: $nextPostId }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
    }
    nextBlogPost: blogPost(id: { eq: $nextPostId }) {
      id
      excerpt
      frontmatter {
        title
      }
    }
  }
`
