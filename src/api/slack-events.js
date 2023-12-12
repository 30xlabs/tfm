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
}) => {
  const isSuccess = !error_message

  const emoji = isSuccess ? "✅" : "❌"
  const status = isSuccess ? "successful" : "failed"

  return `
    ✨ *Deployment Update* ✨

    *Project:* ${title}
    *Committer:* ${committer}
    *Build Status:* ${emoji} ${status}
    *Deployed At:* ${created_at}
    *Last Update:* ${updated_at}
    *Deployment Time:* ${deploy_time}
    *Published At:* ${published_at}
    *Commit URL:* ${commit_url}

    🚀 *Preview Link:* [Preview](${links.permalink})
  `
}

const notifySlack = json => {
  const isSuccess = !json?.error_message

  const payload = {
    channel: "#tfm-build",
    username: "webhookbot",
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
