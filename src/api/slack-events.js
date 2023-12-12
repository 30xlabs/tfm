import { formatDate } from "../utils"

const axios = require("axios")

const url = process.env.GATSBY_SLACK_WEBHOOK

const formatMessage = ({
  committer,
  title,
  created_at,
  error_message,
  updated_at,
  deploy_time,
  published_at,
  commit_url,
  links,
  manual_deploy,
}) => {
  const isSuccess = !error_message

  const emoji = isSuccess ? "✅" : "❌"
  const buildStatus = !isSuccess ? "🔴" : "🟢"
  return `
    ✨ *Deployment Update (${manual_deploy ? "Manual" : "Auto"})* ✨

    🚀 *Commit:* ${title}
    🧑🏻‍💻 *Committer:* ${committer}
    ${buildStatus} *Build Status:* ${emoji}
    ⏱️ *Deployed At:* ${formatDate(created_at)}
    ⏱️ *Last Update:* ${formatDate(updated_at)}
    ⌛️ *Deployment Time:* ${deploy_time} seconds
    📝 *Published At:* ${formatDate(published_at)}
    📂 *Commit URL:* <${commit_url}| Click here for commit url>
    🚀 *Preview Link:* <${links.permalink} | Click here for review>
  `
}

const notifySlack = json => {
  const isSuccess = !json?.error_message

  const payload = {
    channel: "#tfm-build",
    username: json?.committer,
    text: formatMessage(json),
    icon_emoji: isSuccess ? ":ghost:" : ":siren:",
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
  const body = req.body
  try {
    const resp = await notifySlack(body)
    res.status(200).send(resp)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal server error")
  }
}
