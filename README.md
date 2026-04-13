# Biryani Spot — Restaurant Web App

A full-stack Next.js restaurant platform with online ordering, admin dashboard, delivery partner portal, and bilingual (English/Arabic) support.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **Backend:** Next.js API Routes
- **Database:** MySQL via Prisma ORM
- **Auth:** NextAuth.js with Google OAuth
- **Deployment:** Vercel (recommended)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | MySQL connection string e.g. `mysql://user:pass@localhost:3306/biryanispot` |
| `NEXTAUTH_URL` | Your app URL e.g. `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Random secret — run `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | From [Google Cloud Console](https://console.cloud.google.com/) |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `ADMIN_EMAIL` | The Google email that will receive ADMIN role |

### 3. Set up the database

```bash
# Push the Prisma schema to your MySQL database
npx prisma db push

# (Optional) Open Prisma Studio to inspect your DB
npx prisma studio
```

### 4. Seed the menu

Start the dev server and visit:

```
http://localhost:3000/api/seed
```

This populates the database with all menu items from `data/menu.json`.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## User Roles

| Role | Access |
|---|---|
| `USER` | Menu browsing, cart, order history at `/user` |
| `ADMIN` | Full dashboard at `/admin` — POS, menu CRUD, analytics, user management |
| `DELIVERY_PARTNER` | Delivery portal at `/partner` |

The email defined in `ADMIN_EMAIL` automatically receives the `ADMIN` role on first Google sign-in. All other users receive the `USER` role.

## Project Structure

```
app/
  page.tsx          — Home page
  menu/             — Full menu with filtering
  auth/             — Google sign-in page
  admin/            — Admin dashboard (POS, menu, orders, analytics)
  user/             — User order history & profile
  partner/          — Delivery partner dashboard
  track/            — Live order tracking demo
  about/            — About page
  api/
    auth/           — NextAuth handler
    menu/           — Menu CRUD
    orders/         — Order CRUD
    users/          — User management
    upload/         — Image uploads
    seed/           — DB seeding from menu.json

components/         — Shared UI (Navbar, CartDrawer, MenuSection, etc.)
context/            — React contexts (Cart, Auth, Language)
data/               — menu.ts types, menu.json data
i18n/               — en.json, ar.json translations
prisma/             — Prisma schema
public/uploads/     — Uploaded menu images
```
