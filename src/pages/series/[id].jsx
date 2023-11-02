import React from "react"
import ArticleList from "../../components/articleList"
import seriesList from "../../content/series/index.json"

export default function SeriesDetail({ id }) {
  const series = seriesList.find(({ id: seriesId }) => seriesId === id)

  if (!series) {
    return <div>Series not found.</div>
  }

  return (
    <div>
      <h2>{series.title}</h2>
      <p>{series.description}</p>
      <ArticleList articles={series.articles} />
    </div>
  )
}
