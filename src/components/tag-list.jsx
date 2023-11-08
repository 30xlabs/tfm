import React, { memo } from "react"

//hooks
import { useStaticQuery, graphql } from "gatsby"

//components
import { Box, Text } from "theme-ui"

//utils
import { find, propEq, defaultTo, compose } from "ramda"

//Components
import Tag from "../components/tag"

const TagList = ({ tags }) => {
  const { allTagColors } = useStaticQuery(graphql`
    query TagColors {
      allTagColors {
        nodes {
          id
          backgroundColor
          color
        }
      }
    }
  `)
  const tagColors = allTagColors.nodes

  const getColorForTag = tagKey => {
    return compose(
      defaultTo({ backgroundColor: "lightgray", color: "black" }),
      find(propEq(tagKey, "id"))
    )(tagColors)
  }

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Text>🏷️</Text>
      {tags.map(tag => {
        const { backgroundColor, color } = getColorForTag(tag)
        return (
          <Tag
            key={tag}
            tag={tag}
            backgroundColor={backgroundColor}
            color={color}
          />
        )
      })}
    </Box>
  )
}

export default memo(TagList)
