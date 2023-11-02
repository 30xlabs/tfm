import * as React from "react"
import {
  Label,
  Input,
  Box,
  Button,
  Card,
  Paragraph,
  Text,
  Message,
} from "theme-ui"
import db from "../config/firebase"
import { addDoc, collection, query, where, getDocs } from "firebase/firestore"

const SubscriptionForm = () => {
  const [newsLetterStatus, setNewsLetterStatus] = React.useState("IDLE")
  const errorMsg = React.useRef(null)
  const handleSubscription = e => {
    e.preventDefault()
    const elements = new FormData(e.currentTarget)
    const name = elements.get("name")
    const email = elements.get("email")

    const saveToFirestore = async (name, email) => {
      try {
        setNewsLetterStatus("ADDING")
        const dataRef = collection(db, "news-letter")
        const q = query(dataRef, where("email", "==", email))
        const querySnapshot = await getDocs(q)
        console.log(querySnapshot)
        if (querySnapshot.size !== 0) {
          setNewsLetterStatus("ERROR")
          errorMsg.current = `Email (${email}) already exist`
          return
        }
        await addDoc(dataRef, { name, email })
        setNewsLetterStatus("SUCCESS")
        errorMsg.current = name
      } catch (err) {
        setNewsLetterStatus("ERROR")
        errorMsg.current = `Something went wrong`

        console.log(err)
      }
    }
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
          Dear {errorMsg.current}, Thank you for subscribing to news letter
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

export default function NewsLetter() {
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
