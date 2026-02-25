# Architecture — Az Club Store

## System Overview

Az is a **Next.js 16 App Router** application that implements a white-label SaaS model for sports club merchandise stores. Each club is served from a dynamic route `/store/[clubSlug]`, allowing multiple clubs to share the same codebase while maintaining fully independent branding.

## Routing Architecture

```
/                                 → redirects to /store/uppakra-if
/store/[clubSlug]                 → store front (product grid, categories, banner)
/store/[clubSlug]/product/[productId]  → product detail page
```

- The `[clubSlug]` segment resolves a club from the static `clubs.ts` data file.
- The `[productId]` segment resolves a product from the static `products.ts` data file, filtered by the club's `activeProductIds`.
- The root `page.tsx` performs a server-side `redirect()` to `/store/uppakra-if`.

## State Management

### CartContext (`src/context/CartContext.tsx`)
- Implemented with React Context + `useReducer`.
- Cart items keyed by a composite `productId/size/variant` key to allow the same product in multiple variants.
- Persisted to `localStorage` so the cart survives page refreshes.
- Wrapped around the entire app in `src/app/layout.tsx`.

### AuthContext (`src/context/AuthContext.tsx`)
- Implemented with React Context.
- Uses `sessionStorage` for session persistence (cleared on tab close).
- Mock users: `az-staff` (admin) and `club-admin` roles.
- Credentials: `admin / admin123`, `uif-admin / uif123`.

### Zustand
- Installed (`^5.0.11`) but **not yet used**.
- Planned for more complex global state (e.g., multi-step checkout, admin dashboard).

## Data Layer

All data is currently stored as **static TypeScript files** in `src/data/`:

| File | Contents |
|---|---|
| `clubs.ts` | Club definitions — id, slug, name, colors, logo, banner, description, activeProductIds |
| `products.ts` | Product catalog — id, name, category, price, sizes, variants, images |
| `orders.ts` | Mock order data for admin views |

### TypeScript Interfaces

```typescript
// clubs.ts
interface Club {
  id: string;
  slug: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  bannerImage: string;
  description: string;
  activeProductIds: string[];
}

// products.ts (approximate)
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  variants: string[];
  images: string[];
}
```

**Future plan**: migrate to a real database (Supabase, PlanetScale, or similar) with a Prisma ORM layer.

## Theming System

Each `Club` record contains `primaryColor` and `secondaryColor` hex values. Components receive the `club` object and apply colors via **inline styles**, enabling true per-club white-labeling without any CSS-in-JS or build-time configuration.

```tsx
// Example from Navbar.tsx
<nav style={{ backgroundColor: club.primaryColor, color: club.secondaryColor }}>
```

This approach means adding a new club requires only a new entry in `clubs.ts` — no code changes.

## Component Architecture

| Component | Rendering | Notes |
|---|---|---|
| Store page | Server Component | Fetches club + products server-side |
| Product detail page | Server Component | Fetches product server-side |
| `Navbar.tsx` | Client Component (`'use client'`) | Cart icon interaction |
| `CategoryFilter.tsx` | Client Component | Filter state |
| `CartIcon.tsx` | Client Component | Cart badge |
| `QRCodeDisplay.tsx` | Client Component | qrcode.react |
| `CartContext.tsx` | Client Component | localStorage |
| `AuthContext.tsx` | Client Component | sessionStorage |

Default to **Server Components**; use `'use client'` only when browser APIs or interactivity are needed.

## Styling

- **Tailwind CSS 4** with `@import "tailwindcss"` in `globals.css`.
- PostCSS handled via `postcss.config.mjs` with `@tailwindcss/postcss`.
- Custom CSS variables for `--background` / `--foreground` in `globals.css`.
- Club theme colors applied via **inline styles** (not Tailwind classes) to support dynamic values.

## PWA

| Asset | Location |
|---|---|
| Web manifest | `public/manifest.json` |
| Service worker | `public/sw.js` |
| PWA icons | `public/icons/` |
| Apple touch icon | `public/icons/apple-touch-icon.png` |

Service worker is registered in the root layout (`src/app/layout.tsx`) via a `<Script>` tag.

## Deployment Pipeline

```
GitHub (main branch) → Vercel (auto-deploy)
```

- **Live URL**: https://az-jet-nine.vercel.app/store/uppakra-if
- No manual deployment steps required; every push to `main` triggers a Vercel build.

## Future Considerations

- **Database**: Replace static `src/data/` files with Supabase or PlanetScale + Prisma.
- **Payments**: Integrate Swish and/or Klarna for Swedish market checkout.
- **Image CDN**: Move product images from `public/images/` to Cloudinary or Vercel Blob.
- **Multi-club support**: Admin UI to onboard new clubs without code changes.
- **Admin dashboard**: Order management, inventory, club configuration.
- **Email notifications**: Order confirmation and status updates.
- **Zustand**: Replace/augment Context with Zustand for more complex state trees.
