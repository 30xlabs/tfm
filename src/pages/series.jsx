import React from "react"
import { Box, Container } from "theme-ui"
import SeriesList from "../components/seriesList"
import seriesListData from "../content/series/index.json"

export default function Series() {
  return (
    <Box
      sx={{ width: ["90%", "75%", "60%"], margin: "auto", marginTop: "12px" }}
    >
      <Container sx={{ marginTop: "28px", paddingRight: "0px" }}>
        <SeriesList seriesList={seriesListData} />
      </Container>
    </Box>
  )
}
