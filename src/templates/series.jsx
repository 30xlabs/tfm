import React from "react"
import { Box, Card, Container, Grid } from "theme-ui"
import { navigate } from "gatsby"

export default function Series({ pageContext }) {
  const { seriesList } = pageContext
  return (
    <Box
      sx={{ width: ["90%", "75%", "60%"], margin: "auto", marginTop: "12px" }}
    >
      <Container sx={{ marginTop: "28px", paddingRight: "0px" }}>
        <Grid columns={[1, 2, 3]}>
          {seriesList.map(seriesDetails => {
            return (
              <Card
                sx={{
                  padding: 3,
                  cursor: "pointer",
                }}
                className="neumorphic variation2"
                onClick={() => navigate(`/series/${seriesDetails[0]}`)}
              >
                {capitalizeAndReplace(seriesDetails[0])} ({seriesDetails[1]}{" "}
                parts)
              </Card>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

function capitalizeAndReplace(text) {
  const words = text
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return words
}
