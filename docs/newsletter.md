# Newsletter subscription: how-to

This document shows how to add a "Subscribe to my newsletter" feature to the site. There are multiple approaches; the best one depends on your hosting and provider.

## Quick choices
- Formspree: Minimal, similar to the existing contact form on the site. Great for simple notifications or building a Zapier pipeline.
- Netlify Forms: If you deploy to Netlify — collects submissions, integrates with webhooks and Zapier.
- Buttondown: Recommended for simple, privacy-focused newsletters. Provides a clean API and host. Use a serverless proxy to avoid exposing API keys.
- Mailchimp / ConvertKit: More features and marketing-focused, but heavier and may require API keys.

## Implementation summary in this repo

- A new `NewsletterForm` component was added at `src/components/NewsletterForm.jsx` (supports `provider` prop: `formspree`, `netlify`, `buttondown`).
- The site `Footer.jsx` now includes the newsletter form wired to Formspree by default.
- A Netlify function `netlify/functions/buttondown-subscribe.js` provides a secure proxy example for Buttondown signups.

## To use each provider

### Formspree (easy)
1. Create a new form at https://formspree.io and copy the form ID (example: `https://formspree.io/f/xnqlpgoo`).
2. In `src/components/Footer.jsx` replace `action` with your form URL or change `provider` to `formspree`.
3. Style form or place component where you want.

### Netlify Forms
1. In the `NewsletterForm` component we added a `data-netlify="true"` example for `provider="netlify"`.
2. Deploy to Netlify and you'll see form submissions on the Netlify site dashboard.
3. You can add a webhook on Netlify or use Zapier to send to a mailing list provider.

### Buttondown (recommended)
1. Sign up at Buttondown (https://buttondown.email) and get your API key.
2. Add the environment variable `BUTTONDOWN_API_KEY` to your Netlify site settings (or another host's environment variables).
3. Use the `NewsletterForm` with `provider="buttondown"` and set the `action` to `/.netlify/functions/buttondown-subscribe` (populated when using Netlify).
4. Optionally adjust `netlify/functions/buttondown-subscribe.js` if Buttondown API changes. The function proxies the request so the API key never hits the client.

## GDPR / Privacy & double opt-in
- Make sure to comply with GDPR by adding a checkbox or privacy link. Buttondown and others support double opt-in.

## Where to add the form
- Common choices: site footer, sidebar, and at the end of blog templates (`src/templates/posts.js`). The current default is the footer.

## Next steps / Enhancements
- Add support to show subscribers count or a custom CTA.
- Add modal or inline CTA for specific posts/pages.
- Add backend logging or analytics to measure conversion.

---
If you'd like, I can now:
1. Add the Buttondown provider into the `Footer.jsx` and switch to serverless function flow.
2. Place the form in the post footer (inline CTA below each post) and add a 'Thanks' UI.
3. Create a test integration with Buttondown or show an end-to-end demo.

Reply with the option you prefer and I will implement it for you. ✅
