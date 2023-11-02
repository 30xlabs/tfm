import React from "react"
import { Grid, Box } from "theme-ui"
import SeriesCard from "./blogCard"

const SeriesList = ({ seriesList }) => {
  return (
    <Box sx={{ marginTop: "28px", paddingRight: "0px" }}>
      <Grid columns={[1, 2, 3]}>
        {seriesList.map(series => (
          <SeriesCard key={series.id} {...series} body={series.description} />
        ))}
      </Grid>
    </Box>
  )
}

export default SeriesList
