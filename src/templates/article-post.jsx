import React, { memo } from "react"

//hooks
import { graphql, navigate } from "gatsby"

//hooks
import { purifyHtml } from "../utils"

//Components
import { Box, Container, Text } from "theme-ui"
import TagList from "../components/tag-list"

const BlogPost = ({ data: { markdownRemark, previous, next } }) => {
  const {
    id,
    html,
    timeToRead,
    frontmatter: { title, publishedAt, coverImg, tagList },
  } = markdownRemark

  const handleNavigation = postId => {
    navigate(`/article/${postId}`)
  }

  return (
    <Box
      sx={{
        width: ["100%", "75%", "54%"],
        margin: "auto",
        marginTop: ["0px", "36px", "48px"],
      }}
      className="neumorphic variation2"
    >
      <Container sx={{ width: "100%", p: 4 }} key={id}>
        <Text as="h2">{title}</Text>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4>Published At: {publishedAt}</h4>
          <Text>{timeToRead} min ⏳</Text>
          <TagList tags={tagList} />
        </Container>
        {coverImg && <img src={coverImg} alt={title} />}

        <div dangerouslySetInnerHTML={{ __html: purifyHtml(html) }}></div>
        {previous && (
          <button onClick={() => handleNavigation(previous.id)}>
            Previous
          </button>
        )}
        {next && (
          <button onClick={() => handleNavigation(next.id)}>Next</button>
        )}
      </Container>
    </Box>
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
        publishedAt
        tagList
        title
      }
      html
      timeToRead
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      id
      excerpt(pruneLength: 160)
      html
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      id
      excerpt(pruneLength: 160)
      html
    }
  }
`
