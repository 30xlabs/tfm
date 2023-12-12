import React, { memo, useState, useRef } from "react"

//Components
import { Box, Button, Input, Label, Message } from "theme-ui"

//utils
import { checkIfEmailExists, insertNewsLetterRecord, logEvent } from "../utils"

function SubscriptionForm() {
  const [newsLetterStatus, setNewsLetterStatus] = useState("IDLE")
  const errorMsg = useRef(null)

  const handleSubscription = async e => {
    e.preventDefault()
    const elements = new FormData(e.currentTarget)
    const name = elements.get("name")
    const email = elements.get("email")

    const saveToFirestore = async (name, email) => {
      try {
        setNewsLetterStatus("ADDING")
        const emailExists = await checkIfEmailExists(email)

        if (emailExists) {
          setNewsLetterStatus("ERROR")
          errorMsg.current = `Email (${email}) already exists`
          return
        }

        insertNewsLetterRecord({ email, name })
        setNewsLetterStatus("SUCCESS")
        errorMsg.current = name
      } catch (err) {
        setNewsLetterStatus("ERROR")
        errorMsg.current = `Something went wrong`
      }
    }
    logEvent("Submitted news-letter")
    saveToFirestore(name, email)
  }

  return (
    <Box as="form" method="POST" onSubmit={handleSubscription}>
      <Label htmlFor="name">Name</Label>
      <Input
        name="name"
        id="name"
        mb={3}
        autoComplete="off"
        maxLength={255}
        minLength={3}
        required
        disabled={newsLetterStatus === "ADDING"}
      />
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        name="email"
        id="email"
        mb={3}
        maxLength={255}
        minLength={5}
        autoComplete="off"
        required
        disabled={newsLetterStatus === "ADDING"}
      />

      <Button
        className="neumorphic variation2"
        variant="secondary"
        bg="accent"
        style={{ width: "100%" }}
      >
        SUBSCRIBE
      </Button>
      {newsLetterStatus === "SUCCESS" && (
        <Message
          sx={{
            marginTop: "12px",
            background: "#5cb85c",
            color: "white",
            borderLeft: "none",
          }}
        >
          Dear {errorMsg.current}, Thank you for subscribing to the newsletter
        </Message>
      )}
      {newsLetterStatus === "ERROR" && (
        <Message
          sx={{
            marginTop: "12px",
            background: "accent",
            color: "white",
            borderLeft: "none",
          }}
        >
          {errorMsg.current}
        </Message>
      )}
    </Box>
  )
}

export default memo(SubscriptionForm)
