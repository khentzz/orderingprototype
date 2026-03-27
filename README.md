# ShopGo — Mobile Ordering System

A mobile-first shopping and order tracking web app inspired by marketplace-style mobile commerce apps. Built with vanilla HTML, CSS, and JavaScript. Powered by Supabase for order storage and tracking.

---

## Quick Start (Local)

1. Open `index.html` directly in your browser — the app works offline using demo product data.
2. To connect Supabase, follow the steps below.

---

## Connecting Supabase

### Step 1 — Create a Supabase project
Go to [supabase.com](https://supabase.com), create a free account, and start a new project.

### Step 2 — Run the schema
In your Supabase dashboard, open the **SQL Editor** and paste the contents of `supabase/schema.sql`. Click **Run**.

### Step 3 — Seed sample products (optional)
In the SQL Editor, paste and run `supabase/seed.sql` to add demo products.

### Step 4 — Get your credentials
Go to **Settings > API** in your Supabase dashboard. Copy:
- **Project URL** (looks like `https://xxxx.supabase.co`)
- **anon / public key**

### Step 5 — Add credentials to the app
Open `src/lib/supabase.js` and replace the placeholder values:

```js
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

---

## Deploying to Netlify

### Option A — Drag and Drop (easiest)
1. Go to [netlify.com](https://netlify.com) and sign in.
2. Drag your entire project folder onto the Netlify dashboard.
3. Your site will be live at `your-site-name.netlify.app`.

### Option B — GitHub + Netlify (recommended)
1. Push this project to a GitHub repository.
2. In Netlify, click **Add new site > Import an existing project**.
3. Connect your GitHub repo.
4. Set **Publish directory** to `.` (the root).
5. Under **Site Settings > Environment Variables**, add:
   - `SUPABASE_URL` = your project URL
   - `SUPABASE_ANON_KEY` = your anon key
6. Deploy. Your app will be live at `your-project.netlify.app`.

> **Note:** When deploying via Netlify with environment variables, the `%%SUPABASE_URL%%` and `%%SUPABASE_ANON_KEY%%` placeholders in `index.html` are replaced automatically at build time using the `@netlify/plugin-replace-env-vars` plugin. If you're just testing locally, edit `src/lib/supabase.js` directly instead.

---

## App Flow

Login → Home → Product Details → Cart → Checkout → Confirmation → Order Tracking

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES Modules)
- Supabase JS Client v2
- Google Fonts (Poppins)
- Hosted on Netlify
