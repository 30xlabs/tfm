import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Box, Card, Container, Grid, Text } from "theme-ui"

//Utils
import { logEvent } from "../utils"

//Hooks
import usePageTiming from "../hooks/usePageTiming"

export default function Series({ pageContext }) {
  useEffect(() => {
    logEvent("opened_series_list_page")
  }, [])
  usePageTiming()
  const { seriesList } = pageContext
  return (
    <Box
      sx={{ width: ["90%", "75%", "60%"], margin: "auto", marginTop: "12px" }}
    >
      <Container sx={{ marginTop: "28px", paddingRight: "0px" }}>
        <Grid columns={[1, 2, 3]}>
          {seriesList.map(seriesDetails => {
            const [title, meta] = seriesDetails
            return (
              <Card
                sx={{
                  padding: 2,
                  cursor: "pointer",
                  marginTop: 3,
                  borderRadius: "24px",
                  backdropFilter: "blur(120px)",
                }}
                className="neumorphic variation2"
                onClick={() => navigate(`/series/${title}`)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text as="h3" marginTop={2} color="accent">
                    {capitalizeAndReplace(title)}
                  </Text>
                  <Text as="h5" sx={{ marginTop: "2px" }} opacity="0.4">
                    ( {meta?.totalCount} parts )
                  </Text>
                  <Text as="h5" sx={{ marginTop: "2px" }} opacity="0.4">
                    Total {meta?.timeToRead} minutes read
                  </Text>
                </Box>
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
