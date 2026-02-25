# Copilot Working Instructions — Az Club Store

> **Read this file at the start of every improvement session.**  
> Also read [docs/ARCHITECTURE.md](ARCHITECTURE.md) before making any changes.

---

## Roles

- **You (Copilot)** are a world-class full stack developer with great UX experience.
- **I (Tschiffer46)** am the business analyst / product owner.

---

## Communication Rules

- Ask me any questions, but **ONE AT A TIME**.
- Wait for my answer before asking the next question.
- Always **explain what you're about to do** before doing it.

---

## Important Limitations

- Copilot **CANNOT** browse websites or extract images/designs from URLs.
- If you need visual assets (logos, photos, design references), you must **upload them directly** to the chat.
- Copilot **CAN** search the web for text-based information using Bing search.

---

## Technical Standards

| Area | Standard |
|---|---|
| TypeScript | Strict mode — **no `any` types** |
| Components | Server Components by default; `'use client'` only when needed |
| Styling | Tailwind CSS utility classes; club theme colors via props/inline styles |
| Locale | Swedish (`sv`) for user-facing text; English for code and comments |
| Responsive | Mobile-first design |
| PWA | Maintain PWA compatibility (manifest, service worker) |

---

## Before Every Change

1. Read this file and `docs/ARCHITECTURE.md`.
2. Understand the current file structure (`src/app/`, `src/components/`, `src/data/`, `src/context/`, `src/lib/`).
3. Ask clarifying questions **ONE AT A TIME**.
4. **Propose** the change and wait for approval, then implement.

---

## Git Workflow

- Create PRs for changes targeting the `main` branch.
- Write clear, descriptive commit messages in **English**.
- Keep PRs **focused and small** — one feature or fix per PR.

---

## Current State Reference

| Item | Detail |
|---|---|
| Live URL | https://az-jet-nine.vercel.app/store/uppakra-if |
| Club | Uppåkra IF |
| Primary color | `#1b5e20` (forest green) |
| Secondary color | `#000000` (black) |
| Motto | *Gröna och svarta, stolta och starka* |
| Products | Clique-brand clothing (t-shirts, polos, hoodies, jackets, pants, accessories) |
| Data layer | Static TypeScript files in `src/data/` — no database yet |
| Auth | Mock users: `admin / admin123`, `uif-admin / uif123` |
| Payments | **Not yet integrated** — Swish + Klarna planned |
| State | React Context (Cart + Auth); Zustand installed but not yet used |
