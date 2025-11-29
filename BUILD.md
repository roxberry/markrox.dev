# BUILD notes

## Puppeteer / Playwright Missing Browser Binary

If you get an error like:

```text
Error: browserType.launch: Failed to launch chromium because executable doesn't exist at ~/.cache/puppeteer/chrome/...
```

Try one of the following steps:

- Reinstall Puppeteer's test browser:

```bash
node node_modules/puppeteer/install.mjs
```

- Or re-run npm install to trigger postinstall hooks:

```bash
npm ci
```

- If you're using Playwright, install browsers:

```bash
npx playwright install
```

- If you prefer to use your system Chrome, make sure it's installed and available at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` (macOS). The plugin `gatsby-remark-mermaid` supports passing `executablePath` to point to that path.

- If you still have problems, clear Puppeteer's cache and re-run the install:

```bash
rm -rf ~/.cache/puppeteer && node node_modules/puppeteer/install.mjs
```

I added a fallback check to `gatsby-config.js` so it will use system Chrome/Chromium if the Puppeteer binary isn't present.
