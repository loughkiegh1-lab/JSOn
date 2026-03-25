# JSONformat.tools

A free, fast JSON formatter, validator & minifier — built to earn ad revenue.

## Files

```
jsonformat-tools/
├── index.html      ← Main app (JSON Formatter)
├── style.css       ← All styles
├── app.js          ← All logic
├── vercel.json     ← Vercel deployment config
├── robots.txt      ← SEO crawl rules
└── README.md       ← This file
```

## Features

- Format / beautify JSON (2 spaces, 4 spaces, or tabs)
- Minify JSON
- Sort keys alphabetically
- Copy to clipboard
- Download as .json file
- Drag & drop .json files
- Auto-format as you type
- Stats: characters, lines, keys, depth, file size
- Keyboard shortcuts: Ctrl+Enter (format), Ctrl+Shift+M (minify), Ctrl+Shift+C (copy)
- Ad placement zones ready for Google AdSense

---

## 🚀 Deploy to Vercel (Free — 5 minutes)

1. Go to https://vercel.com and sign up (free)
2. Click "Add New Project"
3. Drag this entire folder onto the upload zone — OR connect your GitHub repo
4. Click Deploy
5. You'll get a live URL like `https://jsonformat-tools.vercel.app`

**Add a custom domain:**
- In Vercel dashboard → Settings → Domains
- Add `jsonformat.tools` (buy on Namecheap for ~$10/yr)
- Follow DNS instructions

---

## 💰 Enable Google AdSense

1. Go to https://adsense.google.com and apply
2. Requirements: live website, some content, traffic (even 10–20 visits/day is fine to apply)
3. Once approved, get your Publisher ID (looks like `ca-pub-1234567890123456`)
4. In `index.html`, find this comment and replace it:

```html
<!-- Google AdSense — replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID -->
<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> -->
```

Uncomment the script tag and replace `ca-pub-XXXXXXXXXXXXXXXX` with your real ID.

5. Replace the `.ad-placeholder` divs with real AdSense ad units:

```html
<!-- Leaderboard 728x90 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

---

## 📈 SEO Tips (get free traffic from Google)

Target these keywords — people search them every day:
- "json formatter" (110k/mo searches)
- "json validator online" (40k/mo)
- "format json online" (30k/mo)
- "json beautifier" (20k/mo)
- "json minifier" (10k/mo)

**Quick wins:**
- Submit your site to Google Search Console (search.google.com/search-console)
- Post on Reddit: r/webdev, r/programming, r/javascript
- Submit to ProductHunt
- Build more tools — each tool page = more SEO pages

---

## 💵 Revenue Estimate

| Monthly Visitors | Est. Monthly Revenue |
|---|---|
| 5,000 | $10–$40 |
| 20,000 | $40–$160 |
| 50,000 | $100–$400 |
| 100,000 | $200–$800 |

Developer/tech audiences get higher CPMs ($4–$12) vs general audiences ($1–$3).

---

## 🛠 Next Tools to Build (more pages = more revenue)

- `minifier.html` — JSON Minifier
- `validator.html` — JSON Validator with line-by-line errors
- `converter.html` — CSV to JSON converter
- `diff.html` — JSON Diff / compare tool
- `base64.html` — Base64 Encoder/Decoder
- `url-encode.html` — URL Encoder/Decoder
- `regex.html` — Regex Tester

Each new tool = new SEO page = more traffic = more ad revenue.
