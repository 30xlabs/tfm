import React from "react"
import { Box, Text, Button } from "theme-ui"

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) {
    return null
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9,
        bg: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box
        sx={{
          color: "text",
          width: "50%",
          bg: "background",
          p: 4,
          borderRadius: 4,
          zIndex: 99,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        <Text as="h2">{title}</Text>
        <Text>{content}</Text>
        <Button
          onClick={onClose}
          bg={"accent"}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          Close
        </Button>
        <Button mr={2} variant="primary">
          Beep
        </Button>
        <Button variant="secondary">Boop</Button>
      </Box>
    </Box>
  )
}

export default Modal
