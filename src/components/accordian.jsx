import React, { useState } from "react"
import { Box, Button } from "theme-ui"

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Button
        onClick={toggleAccordion}
        variant="accordion"
        sx={{ width: "100%", textAlign: "left" }}
      >
        {title}
      </Button>
      {isOpen && <Box variant="accordionContent">{children}</Box>}
    </Box>
  )
}

export default Accordion
