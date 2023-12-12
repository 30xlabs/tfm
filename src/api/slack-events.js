const notifySlack = json => {
  return fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      body: new URLSearchParams({
        payload: `{"channel": "#tfm-build", "username": "${JSON.stringify(
          json,
        )}", "icon_emoji": ":ghost:"}`,
      }),
    },
  )
}
export default function handler(req, res) {
  if (req.method !== `POST`) return res.status(405).send("Invalid HTTP method")
  const body = req.body
  notifySlack(body)
    .then(() => {
      res.status(200).send("Success")
    })
    .catch(() => res.status(500).send("Internal server error"))
}
