import fetch from "node-fetch"

const notifySlack = json => {
  json = JSON.stringify(JSON.stringify(json))
  return fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `payload={"channel": "#tfm-build", "username": "webhookbot", "text": ${json}, "icon_emoji": ":ghost:"}`,
    },
  )
}
export default async function handler(req, res) {
  if (req.method !== `POST`) return res.status(405).send("Invalid HTTP method")
  const body = req.body
  try {
    await notifySlack(body)
    res.status(200).send("Success")
  } catch (err) {
    res.status(500).send("Internal server error")
  }
}
