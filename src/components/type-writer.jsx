import React, { memo } from "react"

//Components
import { Card, Container, Heading, Text } from "theme-ui"

const Description = ({ description }) => (
  <Container
    color="primaryTextColor"
    bg={"muted"}
    sx={{ alignItems: "center", justifyContent: "center", marginTop: "20px" }}
  >
    <Heading
      level={4}
      sx={{
        display: "inline-flex !important",
        alignItems: "center",
        padding: 0,
        margin: 0,
      }}
    >
      <Card className="typewriter" sx={{ display: "inline-block" }}>
        <Text
          sx={{
            color: "text",
            display: "inline-block",
            padding: "4px 8px",
          }}
          className="typing-text"
        >
          {description}
        </Text>
      </Card>
    </Heading>
  </Container>
)

export default memo(Description)
