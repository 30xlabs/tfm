import React, { memo } from "react"

//Components
import { Heading, Text } from "theme-ui"

const AppLogo = memo(({ title }) => (
  <Heading>
    {title.split(" ").map(word => (
      <span key={word}>
        <Text
          className="logo-text"
          color="accent"
          sx={{ marginLeft: "8px", display: "inline-block" }}
        >
          {word[0]}
        </Text>
        <Text className="logo-text" sx={{ display: "inline" }}>
          {word.slice(1)}
        </Text>
      </span>
    ))}
  </Heading>
))

export default AppLogo
