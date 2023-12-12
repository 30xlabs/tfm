export default function handler(req, res) {
  if (req.method !== `POST`) return res.status(405).send("Invalid HTTP method")
  const body = req.body
  console.log(req.body)
  res.status(200).json({ hello: `world`, body })
}
