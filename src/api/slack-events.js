const crypto = require("crypto")
const jwt = require("jsonwebtoken")

exports.handler = async event => {
  try {
    const body = JSON.parse(event.body)
    if (!signed(event, JSON.stringify(body))) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Invalid signature" }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Webhook received successfully", body }),
    }
  } catch (error) {
    console.error("Error processing Netlify webhook:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}

function signed(request, body) {
  const signature = request.headers["x-webhook-signature"]
  if (!signature) {
    return false
  }

  const secret = "your signature secret" // Replace with your actual signature secret
  const decoded = jwt.verify(signature, secret, {
    issuer: "netlify",
    algorithms: ["HS256"],
  })

  return (
    decoded.sha256 === crypto.createHash("sha256").update(body).digest("hex")
  )
}
