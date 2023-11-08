import React, { memo } from "react"

//Components
import { MainImage } from "gatsby-plugin-image"

//Icons
import ArticleIcon from "../../assets/articleIcon"

//Hooks
import { useThemeUI } from "theme-ui"

function ThumbnailImage({ image, title }) {
  const iconColor = useThemeUI().theme.colors.accent

  return image ? (
    <MainImage
      src={image}
      alt={title}
      width={"100%"}
      height={"180px"}
      style={{
        objectFit: "fill",
        borderTopRightRadius: "12px",
        borderTopLeftRadius: "12px",
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
        borderTopLeftRadius: "12px",
      }}
    />
  )
}

export default memo(ThumbnailImage)
