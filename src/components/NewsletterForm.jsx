import React, { useState } from "react"
import PropTypes from "prop-types"
import * as styles from "./newsletter.module.scss"

// Simple newsletter form for static sites. Supports Formspree and Netlify
// - provider="formspree" -> posts directly to Formspree (set action prop to your form ID)
// - provider="netlify" -> uses Netlify Forms (data-netlify="true")
// - provider="buttondown" -> optional, demonstrates how you'd call an API; see README for serverless proxy
const NewsletterForm = ({ provider = "formspree", action = "https://formspree.io/f/xnqlpgoo", onSuccess }) => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    if (provider === "formspree") return // use HTML form submit
    if (provider === "netlify") return // use HTML form submit

    e.preventDefault()
    setStatus("pending")

    try {
      // Example: POST to serverless proxy for Buttondown or similar
      const resp = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      if (!resp.ok) throw new Error("Subscribe failed")
      setStatus("success")
      setEmail("")
      onSuccess && onSuccess()
    } catch (err) {
      setStatus("error")
    }
  }

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  return (
    <div className={styles.newsletterForm}>
      {provider === "formspree" ? (
        <form method="POST" action={action} className={styles.form}>
          <label htmlFor="newsletter-email">Subscribe to my newsletter</label>
            <div className={styles.controls}>
            <input id="newsletter-email" name="_replyto" type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </div>
          <p className={styles.hint}>No spam; unsubscribe anytime.</p>
        </form>
      ) : provider === "netlify" ? (
        <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" className={styles.form}>
          <input type="hidden" name="form-name" value="newsletter" />
          <label htmlFor="newsletter-email">Subscribe to my newsletter</label>
            <div className={styles.controls}>
            <input id="newsletter-email" name="email" type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </div>
          <p className={styles.hint}>No spam; unsubscribe anytime.</p>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email">Subscribe to my newsletter</label>
          <div className={styles.controls}>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={!validateEmail(email) || status === "pending"}>Subscribe</button>
          </div>
          {status === "success" && <p className={styles.success}>Thanks — check your inbox to confirm!</p>}
          {status === "error" && <p className={styles.error}>There was a problem — please try again later.</p>}
        </form>
      )}
    </div>
  )
}

NewsletterForm.propTypes = {
  provider: PropTypes.oneOf(["formspree", "netlify", "buttondown"]),
  action: PropTypes.string, // URL or serverless function endpoint for provider
  onSuccess: PropTypes.func
}

export default NewsletterForm
