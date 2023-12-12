import { formatDate } from "../utils"

const axios = require("axios")

const url = process.env.GATSBY_SLACK_WEBHOOK

const notifySlack = (message, branch) => {
  const payload = {
    channel: "#tfm-build",
    username: "saketh30x",
    icon_emoji: ":ghost:",
    text: `${message}\n<${process.env.GATSBY_MANUAL_DEPLOY_URL}?trigger_branch=${branch}&trigger_title=triggered+by+manual+button&clear_cache=true| Deploy>`,
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
  const branch = payload.ref.replace("refs/heads/", "")
  if (eventType === "push") {
    if (["release", "hotfix", " master", "testing"].includes(branch)) {
      payload.commits.forEach(commit => {
        const authorName = commit.author.name
        const commitMessage = commit.message
        const time = formatDate(commit.timestamp)
        message += `
        🧑🏻‍💻 *Author:* ${authorName}\n
        🚀 *Commit:* ${commitMessage}\n
        ⏱️ *Time:* ${time}`
      })
    }
  }

  try {
    await notifySlack(message, branch)
    res.status(202).send("Accepted")
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal server error")
  }
}
