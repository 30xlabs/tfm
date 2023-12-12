const axios = require("axios")

const url = process.env.GATSBY_SLACK_WEBHOOK

const notifySlack = json => {
  const payload = {
    channel: "#tfm-build",
    username: json?.committer || "saketh30x",
    text: `<${process.env.GATSBY_MANUAL_DEPLOY_URL}| Deploy>`,
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
  const body = req.body
  try {
    const resp = await notifySlack(body)
    res.status(200).send(resp)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal server error")
  }
}
