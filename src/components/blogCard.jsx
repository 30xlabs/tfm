import React from "react"
import { MainImage } from "gatsby-plugin-image"
import { Box, Text, Link, Card, useThemeUI } from "theme-ui"
import ArticleIcon from "../assets/articleIcon"

export default function BlogCard({ image, title, body, showLink, id }) {
  const iconColor = useThemeUI().theme.colors.accent
  return (
    <Box
      className="neumorphic variation2"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        position: "relative",
        borderRadius: 20,
      }}
    >
      {image ? (
        <MainImage
          src={image}
          alt={title}
          width={"100%"}
          height={"180px"}
          style={{
            objectFit: "fill",
            borderTopRightRadius: "12px",
            borderTopRightLeft: "12px",
          }}
        />
      ) : (
        <ArticleIcon
          alt={title}
          color={iconColor}
          width={"100%"}
          height={"180px"}
          style={{
            objectFit: "fill",
            borderTopRightRadius: "12px",
            borderTopRightLeft: "12px",
          }}
        />
      )}
      <Card
        sx={{
          marginLeft: [0, "12px"],
          marginBottom: "20px",
          padding: ["10px", "12px"],
        }}
      >
        <Text as="h3" sx={{ fontSize: [2, 3] }}>
          {title}
        </Text>
        <Text className="blog-card-content" sx={{ marginBottom: "20px" }}>
          {body}
        </Text>
        {showLink && (
          <Link
            href={`/article/${id}`}
            sx={{
              position: "absolute",
              bottom: 2,
              right: 18,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Read more...
          </Link>
        )}
      </Card>
    </Box>
  )
}
