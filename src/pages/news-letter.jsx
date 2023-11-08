import React, { memo } from "react"

//components
import { Card, Paragraph, Text } from "theme-ui"
import SubscriptionForm from "../components/subscription-form"

const NewsLetter = () => {
  return (
    <Card
      className="neumorphic variation2"
      sx={{
        width: ["90%", "70%", "30%"],
        margin: "auto auto",
        marginTop: "48px",
        textAlign: "center",
        padding: 4,
      }}
    >
      <fieldset style={{ padding: "16px" }}>
        <legend>
          <Text as="h3" sx={{ margin: "0 8px" }}>
            Subscribe and never miss an update!
          </Text>
        </legend>
        <Paragraph sx={{ margin: "16px 0" }}>
          I send out a weekly email containing the latest updates, new episodes,
          helpful tutorials, and any other valuable resources to enhance your
          skills and career in web development
        </Paragraph>
        <SubscriptionForm />
      </fieldset>
    </Card>
  )
}

export default memo(NewsLetter)
