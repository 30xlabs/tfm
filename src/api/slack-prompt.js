import { formatDate } from "../utils"

const axios = require("axios")

const url = process.env.GATSBY_SLACK_WEBHOOK

const notifySlack = message => {
  const payload = {
    channel: "#tfm-build",
    username: "saketh30x",
    text: `${message}\n\n<${process.env.GATSBY_MANUAL_DEPLOY_URL}| Deploy>`,
    icon_emoji: ":ghost:",
  }

  return axios
    .post(url, `payload=${JSON.stringify(payload)}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("Error sending Slack message:", error.message)
      throw error
    })
}

export default async function handler(req, res) {
  if (req.method !== `POST`) return res.status(405).send("Invalid HTTP method")
  const eventType = req.headers["x-github-event"]
  const payload = req.body
  let message = ""
  console.log(req.body)
  if (eventType === "push") {
    const branch = payload.ref.replace("refs/heads/", "")

    // Check if the push event is for the main branch (you can modify as needed)
    if (branch === "release") {
      console.log(`Push event on the main branch.`)

      // Iterate over commits
      payload.commits.forEach(commit => {
        const authorName = commit.author.name
        const commitMessage = commit.message
        const time = formatDate(commit.timestamp)
        message += `Author: ${authorName}\nCommit Message: ${commitMessage}\nTime: ${time}\n`
      })
    }
  }

  try {
    await notifySlack(message)
    res.status(202).send("Accepted")
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal server error")
  }
}
