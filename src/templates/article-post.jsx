import React, { memo } from "react"

//hooks
import { graphql } from "gatsby"

//hooks
import { purifyHtml } from "../utils"

//Components
import { Box, Link, Container, Text } from "theme-ui"
import TagList from "../components/tag-list"
import ProfileCard from "../components/profile-card"
import { MainImage } from "gatsby-plugin-image"
import Seo from "../components/seo"

const BlogPost = ({ data: { markdownRemark, previous, next } }) => {
  const {
    id,
    html,
    timeToRead,
    frontmatter: { title, publishedAt, coverImg, tagList },
  } = markdownRemark

  return (
    <section>
      <Seo
        title={title}
        description={`${title} - published at ${publishedAt} - tags : ${tagList.join(
          ","
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
            }}
            className="neumorphic variation2"
          >
            {coverImg && (
              <MainImage
                src={coverImg}
                style={{ objectFit: "cover" }}
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

              <Box
                sx={{ p: 2 }}
                dangerouslySetInnerHTML={{ __html: purifyHtml(html) }}
              />
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
            <Link hidden={!previous?.id} href={`/article/${previous?.id}`}>
              <Text>&larr; Previous ({previous?.frontmatter?.title})</Text>
            </Link>
          </Container>
          <Container sx={{ width: "40%" }}>
            <Link hidden={!next?.id} href={`/article/${next?.id}`}>
              <Text>&rarr; Next ({next?.frontmatter?.title})</Text>
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
      html
      timeToRead
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
    }
  }
`
