const axios = require("axios")

const fetchArticlesFromDevTo = () =>
  axios.get("https://dev.to/api/articles/me/all?per_page=999", {
    headers: {
      "api-key": process.env.GATSBY_DEV_TO_API,
    },
  })

const fetchArticle = articleId => {
  return axios.get(`https://dev.to/api/articles/${articleId}`, {
    headers: {
      "api-key": process.env.GATSBY_DEV_TO_API,
    },
  })
}

module.exports = {
  fetchArticle,
  fetchArticlesFromDevTo,
}
