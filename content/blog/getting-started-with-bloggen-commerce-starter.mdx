---
title: "Getting Started: Shopify + Next.js Commerce Starter"
publishedAt: '2025-11-10'
author: 'Silverthread Labs'
image: '/assets/thumbnail.png'
ogImage:
  url: '/assets/thumbnail.png'
summary: 'Set up a custom Shopify storefront with Next.js in minutes. Configure env variables, connect Storefront API, and enable cache revalidation webhooks.'
tags: ['Shopify', 'Next.js', 'Headless', 'Getting Started']
---

## Overview

This guide walks you through connecting a Shopify store to a custom, high‑performance Next.js storefront. You’ll clone the starter, add env variables, enable the Storefront API, and deploy with cache‑friendly webhooks so product and collection changes show up fast.

## Prerequisites

- Node.js 18+ (LTS recommended)
- Git 2.x+
- pnpm 8+ (recommended)

Optional (analytics): Google Analytics Measurement ID (starts with `G-`).

```powershell
# Enable pnpm via Corepack on Windows PowerShell
corepack enable; corepack prepare pnpm@latest --activate
```

## 1) Clone the repository

```powershell
git clone https://github.com/Jaffer720/bloggen-comerce-starter.git
cd bloggen-comerce-starter
pnpm install
```

## 2) Create your `.env`

Use the provided example and fill in the values you’ll get from Shopify later in this guide.

```powershell
Copy-Item .env.example .env
```

Environment variables used by this starter:

| Name | Required | Description |
|------|----------|-------------|
| `SHOPIFY_STORE_DOMAIN` | Yes | Your store domain, e.g. `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Yes | Storefront API access token from your custom app |
| `SHOPIFY_REVALIDATION_SECRET` | Yes | Secret used by the webhook endpoint to trigger revalidation |
| `COMPANY_NAME` | Optional | Used in UI/meta |
| `SITE_NAME` | Optional | Used in UI/meta |
| `GOOGLE_ANALYTICS_MEASUREMENT_ID` | Optional | If using GA4 (e.g. `G-XXXXXXX`) |

## 3) Create a Shopify store

If you don’t already have one, create a development store in Shopify.

## 4) Create a custom app (Develop apps)

In your Shopify Admin:

1. Go to Settings → Apps and sales channels → Develop apps
2. Create app → give it a name (e.g., “Headless Storefront”)

## 5) Configure Storefront API access and install the app

Inside your app, open “Storefront API access” and enable the scopes required for a headless storefront (Products, Collections, Product variants, Product recommendations, etc.). Save and then Install the app to generate credentials.

## 6) Get your Storefront Access Token

After installing the app, copy the “Storefront API access token”.

Set it in your `.env`:

```bash
# .env
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token
```

## 7) Get your Store Domain

Go to Settings → Domains and copy your primary domain (e.g., `your-store.myshopify.com`).

Set it in your `.env`:

```bash
# .env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
```

## 8) Revalidation secret and webhooks (after deployment)

This starter exposes a webhook endpoint at `/api/revalidate` that listens for Shopify product/collection events and refreshes cached pages. You’ll set the secret now and finish the webhook configuration after you deploy your site.

1. Choose a long random value and set it as:

```bash
# .env
SHOPIFY_REVALIDATION_SECRET=your_long_random_secret
```

2. After deployment (e.g., to Vercel), create webhooks in your Shopify Admin to point to:

```
https://your-deployment-url.com/api/revalidate?secret=your_long_random_secret
```

Recommended topics:

- `products/create`, `products/update`, `products/delete`
- `collections/create`, `collections/update`, `collections/delete`

These match what the starter handles internally to keep product and collection pages fresh.

## 9) Run locally

```powershell
pnpm dev
# Visit http://localhost:3000
```

Try the following pages:

- `/products` — product listing
- `/product/[handle]` — individual product page
- `/blog` — MDX‑powered blog index

## Common issues

- “Storefront unavailable” or 402 errors: ensure your store is active or on a development plan and your token is a Storefront token (not Admin).
- Empty product lists: create at least one product in Shopify and ensure it’s available to the Online Store / Headless channel.
- Wrong domain or token: double‑check `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

## Next steps

- Customize theme tokens and components (Tailwind + RSC)
- Add blog posts by dropping `.mdx` files into `content/blog`
- Wire collections by slug under `/search/[collection]`
- Add analytics by setting `GOOGLE_ANALYTICS_MEASUREMENT_ID`

---

Need help or want to share feedback? Open an issue or discussion in the repository.
