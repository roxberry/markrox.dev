const fetch = require("node-fetch")

// Netlify function to proxy signups to Buttondown - keep your API key server-side
// Usage: POST { "email": "address@example.com" }
// Environment variables: BUTTONDOWN_API_KEY (your Buttondown API key)

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }
  try {
    const body = JSON.parse(event.body || "{}")
    const email = body.email
    if (!email || !email.includes("@")) {
      return { statusCode: 400, body: "Invalid email" }
    }
    const apiKey = process.env.BUTTONDOWN_API_KEY
    if (!apiKey) {
      return { statusCode: 500, body: "Server missing configuration" }
    }

    const resp = await fetch("https://buttondown.email/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${apiKey}`
      },
      body: JSON.stringify({ email })
    })
    const data = await resp.json()
    if (!resp.ok) {
      return { statusCode: resp.status, body: JSON.stringify(data) }
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  } catch (err) {
    return { statusCode: 500, body: String(err) }
  }
}
