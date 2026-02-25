# Az — White-label Club Store Platform

A white-label merchandise store platform for sports clubs, currently deployed for **Uppåkra IF**.

**Live URL**: https://az-jet-nine.vercel.app/store/uppakra-if

## Description

Az is a white-label merchandise store platform built for sports clubs. Each club gets its own branded storefront at `/store/[clubSlug]` with custom colors, logo, and product catalog. Currently deployed for Uppåkra IF with a green/black theme and Swedish locale.

## Tech Stack

| Technology | Version |
|---|---|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Zustand | ^5.0.11 (installed, planned for future state) |
| qrcode.react | ^4.2.0 |
| Hosting | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/store/uppakra-if`.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (CartProvider, AuthProvider, PWA setup)
│   ├── page.tsx            # Root redirect → /store/uppakra-if
│   ├── globals.css         # Global styles + Tailwind import
│   └── store/
│       └── [clubSlug]/     # Dynamic club store routes
│           ├── page.tsx    # Store front page (products grid, categories, banner)
│           └── product/
│               └── [productId]/
│                   └── page.tsx  # Product detail page
├── components/             # Reusable UI components
│   ├── Navbar.tsx          # Club-branded sticky navbar with cart icon
│   ├── ProductCard.tsx     # Product card with image, price, link
│   ├── CategoryFilter.tsx  # Horizontal scrollable category pills
│   ├── CartIcon.tsx        # Cart badge component
│   └── QRCodeDisplay.tsx   # QR code generator for sharing
├── context/                # React Context providers
│   ├── CartContext.tsx     # Shopping cart state (localStorage persisted)
│   └── AuthContext.tsx     # Auth state (sessionStorage, mock users)
├── data/                   # Static data (will move to DB later)
│   ├── clubs.ts            # Club definitions (Uppåkra IF config)
│   ├── products.ts         # Product catalog (Clique brand items)
│   └── orders.ts           # Mock order data for admin views
└── lib/
    └── utils.ts            # Utility functions (formatPrice, generateOrderId, cn)
public/
├── images/                 # Product SVGs, club logo, banner
├── icons/                  # PWA icons
├── manifest.json           # PWA manifest
└── sw.js                   # Service worker
```

## Current Club: Uppåkra IF

- **Primary color**: `#1b5e20` (forest green)
- **Secondary color**: `#000000` (black)
- **Motto**: *Gröna och svarta, stolta och starka*
- **Locale**: Swedish (`sv`)

## Key Features

- **PWA-ready** — manifest, service worker, apple-touch-icon
- **Dynamic club theming** — each club slug gets its own branded store
- **Product catalog** — categories, variants, sizes (Clique brand clothing)
- **Shopping cart** — React Context + localStorage persistence
- **QR code sharing** — share product/store links via QR code
- **Responsive, mobile-first** design

## Deployment

Vercel auto-deploys on every push to the `main` branch.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — system design, routing, state management, data layer
- [Copilot Instructions](docs/COPILOT_INSTRUCTIONS.md) — working instructions for every future improvement session
