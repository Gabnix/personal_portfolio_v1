# Deployment Guide — jimling.dev

This guide walks through deploying your portfolio to Vercel and connecting your custom domain `jimling.dev`. No prior experience required.

---

## Prerequisites

- Your code is pushed to a GitHub repository
- You own the domain `jimling.dev` and have access to your domain registrar's DNS settings
- You have the four environment variable values ready (from your `.env.local`)

---

## Part 1 — Push your code to GitHub

If your code isn't on GitHub yet:

1. Go to [github.com](https://github.com) → **New repository**
2. Name it (e.g. `personal-portfolio`) → **Create repository**
3. In your terminal, inside the project folder:

```bash
git remote add origin https://github.com/YOUR_USERNAME/personal-portfolio.git
git branch -M main
git push -u origin main
```

> **Important:** Never commit `.env.local`. Your `.gitignore` already excludes it — but double-check by running `git status` and confirming `.env.local` is not listed.

---

## Part 2 — Deploy to Vercel

### Step 1 — Create a Vercel account

1. Go to [vercel.com](https://vercel.com) and click **Sign Up**
2. Choose **Continue with GitHub** — this links your repos directly

### Step 2 — Import your project

1. Once logged in, click **Add New… → Project**
2. Find your repository in the list and click **Import**
3. Vercel will auto-detect that it's a Next.js project — leave all settings as-is
4. Click **Deploy**

Vercel will build and deploy your site. In about 60 seconds you'll get a live URL like `your-project.vercel.app`.

### Step 3 — Add your environment variables

Your contact form needs the four keys from `.env.local` to work in production.

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add each variable one at a time:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | your Service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | your Template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | your Public Key |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | your reCAPTCHA Site Key |

3. Set **Environment** to **Production, Preview, Development** for each
4. Click **Save**
5. Go to **Deployments** → click the three dots on your latest deployment → **Redeploy**
   - This is required — environment variables only take effect on new deployments

---

## Part 3 — Connect your custom domain (jimling.dev)

### Step 1 — Add the domain in Vercel

1. In your project → **Settings** → **Domains**
2. Type `jimling.dev` and click **Add**
3. Also add `www.jimling.dev` if you want the `www` version to work
4. Vercel will show you DNS records to add — keep this page open

### Step 2 — Update your DNS records

Log into your domain registrar (wherever you bought `jimling.dev` — e.g. Cloudflare, Namecheap, GoDaddy, Google Domains, Porkbun).

Navigate to the **DNS settings** for `jimling.dev` and add the following records:

#### For the root domain (`jimling.dev`)

Add an **A record**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `A` | `@` | `76.76.21.21` | Auto |

> `@` means the root domain itself. Some registrars use the full domain name instead.

#### For `www.jimling.dev` (optional but recommended)

Add a **CNAME record**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `CNAME` | `www` | `cname.vercel-dns.com` | Auto |

### Step 3 — Wait for DNS to propagate

DNS changes can take anywhere from **5 minutes to 48 hours** to take effect globally. Usually it's under 30 minutes.

Back in Vercel → **Settings** → **Domains**, the status will change from a warning icon to a green checkmark once propagation is complete.

### Step 4 — SSL certificate (automatic)

Vercel automatically provisions a free SSL certificate (HTTPS) once your domain is verified. No action needed.

---

## Part 4 — Update reCAPTCHA for your domain

reCAPTCHA only works on domains you've explicitly authorised.

1. Go to [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Select your site → **Settings (pencil icon)**
3. Under **Domains**, add:
   - `jimling.dev`
   - `www.jimling.dev`
4. Click **Save**

---

## Part 5 — Verify everything works

Once your domain is live, check each of these:

- [ ] `https://jimling.dev` loads your portfolio
- [ ] `https://www.jimling.dev` redirects correctly
- [ ] The padlock icon (HTTPS) is visible in the browser
- [ ] The contact form submits and you receive the email
- [ ] The reCAPTCHA widget appears on `/contact`
- [ ] Dark mode toggle works

---

## Ongoing deployments

Every time you push to the `main` branch on GitHub, Vercel **automatically redeploys** your site. No manual steps required.

```bash
# Make changes, then:
git add .
git commit -m "your message"
git push
```

Vercel picks it up within seconds.

---

## Troubleshooting

**Domain shows "Invalid Configuration" in Vercel**
→ Double-check the A record value is exactly `76.76.21.21` and the Name is `@`

**Contact form sends but you get no email**
→ Check the EmailJS dashboard → Logs for error details. Confirm the template variables match (`{{from_name}}`, `{{from_email}}`, `{{message}}`)

**reCAPTCHA not appearing in production**
→ Confirm `jimling.dev` is in your reCAPTCHA domain allowlist (Part 4)

**Environment variables not working after adding them**
→ You must redeploy after adding env vars — Vercel bakes them in at build time
