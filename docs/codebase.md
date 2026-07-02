# StitchHub — Codebase Reference

## Project Identity

**StitchHub** is an intelligent B2B custom apparel sourcing platform with an agentic AI logistics engine. Clients submit sourcing requests, an AI agent (Ollama + Gemini fallback) processes orders end-to-end — handling pricing, inventory checks, escalation detection, supplier outreach via a supplier portal, and payment collection through Polar.sh.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Database | Supabase PostgreSQL + Drizzle ORM (v0.45) |
| Auth | Supabase Auth (SSR with `@supabase/ssr`) |
| Styling | Tailwind CSS v4 |
| State | Zustand v5 (6 stores, one with `persist` middleware) |
| HTTP | TanStack React Query v5 (1min stale, no refetchOnWindowFocus) |
| Payments | Polar.sh (sandbox, SDK v0.48) |
| AI Models | Local Ollama (`stitchhub_v5` GGUF) + Google Gemini API fallback |
| Email | Brevo (Sendinblue v5, `@getbrevo/brevo`) |
| Animations | Framer Motion v12 |
| UI Primitives | Custom — no component library |

## Directory Structure

```
stitch-hub/
├── .env.example              # Environment variable template
├── .env.local                # Live secrets (on disk)
├── AGENTS.md                 # Next.js 16 breaking change warning
├── CLAUDE.md                 # Points to AGENTS.md
├── drizzle.config.ts         # Drizzle Kit config (PostgreSQL)
├── eslint.config.mjs         # ESLint flat config
├── next.config.ts            # Next.js config (Supabase images, ngrok dev origin)
├── next-env.d.ts             # Next.js type references
├── package.json              # Scripts: dev, build, start, lint, db:generate, db:migrate
├── postcss.config.mjs        # PostCSS with Tailwind
├── tsconfig.json             # Path alias @/* → ./src/*, strict mode
├── public/                   # Static assets
├── docs/
│   ├── polar-integration.md  # Polar.sh payment integration notes
│   ├── codebase.md           # ← This file
│   └── plans.md              # Roadmap and future plans
├── src/
│   ├── app/                  # Next.js App Router (pages + API routes)
│   ├── components/           # React components by feature
│   ├── data/                 # Static product catalog
│   ├── db/                   # Schema, migrations, seeds
│   ├── hooks/                # 20 React hooks (TanStack Query + state)
│   ├── lib/                  # Polar SDK + payment handler
│   ├── providers/            # Supabase + React Query context
│   ├── stores/               # 6 Zustand stores
│   ├── styles/               # Custom CSS animations
│   ├── types/                # Shared TypeScript interfaces
│   ├── utils/                # Utilities (auth, pricing, colors, prompts, supabase)
│   └── proxy.ts              # Auth middleware (route guard)
└── node_modules/             # Dependencies
```

## Route Map

### Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing page — 9 sections (Hero, AI Advantage, Process, Features, Lineup, Testimonials, FAQ, CTA, Footer) |
| `/auth/login` | `src/app/auth/login/page.tsx` | Login form |
| `/auth/reset-password` | `src/app/auth/reset-password/page.tsx` | Password reset |
| `/products` | `src/app/products/page.tsx` | Product catalog grid |
| `/products/[id]` | `src/app/products/[id]/page.tsx` | Product detail page |
| `/products/checkout` | `src/app/products/checkout/page.tsx` | Checkout / sourcing request |
| `/payment/success` | `src/app/payment/success/page.tsx` | Payment success confirmation |
| `/profile` | `src/app/profile/page.tsx` | Profile dashboard |
| `/profile/history` | `src/app/profile/history/page.tsx` | Order history list |
| `/profile/history/[id]` | `src/app/profile/history/[id]/page.tsx` | Single order detail |
| `/profile/inbox` | `src/app/profile/inbox/page.tsx` | User inbox / notifications |
| `/profile/security` | `src/app/profile/security/page.tsx` | Security settings (MFA, password) |
| `/profile/settings` | `src/app/profile/settings/page.tsx` | Account settings |
| `/admin` | `src/app/admin/page.tsx` | Admin dashboard |
| `/admin/approvals` | `src/app/admin/approvals/page.tsx` | Escalated order approvals |
| `/admin/inventory` | `src/app/admin/inventory/page.tsx` | Inventory management |
| `/admin/orders` | `src/app/admin/orders/page.tsx` | Order management |
| `/admin/products` | `src/app/admin/products/page.tsx` | Product CRUD |
| `/admin/supplier-quotes` | `src/app/admin/supplier-quotes/page.tsx` | Supplier quote review |
| `/supplier` | `src/app/supplier/page.tsx` | Supplier portal home |
| `/supplier/dashboard` | `src/app/supplier/dashboard/page.tsx` | Supplier dashboard (RFQs, messages, quotes) |
| `/supplier/active-requests` | `src/app/supplier/active-requests/page.tsx` | Active RFQs |
| `/supplier/messages` | `src/app/supplier/messages/page.tsx` | Supplier messaging |
| `/supplier/submitted-quotes` | `src/app/supplier/submitted-quotes/page.tsx` | Submitted quote history |

### API Routes

| Route | Method | File | Purpose |
|---|---|---|---|
| `/api/agent` | POST | `api/agent/route.ts` (565 lines) | Main sourcing agent — orchestrates full order lifecycle |
| `/api/agent/checkout` | POST | `api/agent/checkout/route.ts` | Creates Polar.sh checkout session |
| `/api/agent/confirm-payment` | POST | `api/agent/confirm-payment/route.ts` | Confirms Polar payment success |
| `/api/agent/history` | GET | `api/agent/history/route.ts` | User's email log history |
| `/api/agent/merge-suggestion` | POST | `api/agent/merge-suggestion/route.ts` | AI merges suggestion into draft |
| `/api/agent/pay-deposit` | POST | `api/agent/pay-deposit/route.ts` | Triggers supplier sourcing after deposit |
| `/api/agent/suggestions` | POST | `api/agent/suggestions/route.ts` | Generates contextual AI suggestions |
| `/api/chat` | POST | `api/chat/route.ts` (407 lines) | Multi-turn chat with AI (inventory, pricing, supplier) |
| `/api/supplier-sourcing` | POST | `api/supplier-sourcing/route.ts` (117 lines) | Procurement agent — generates supplier PO |
| `/api/products` | GET/POST | `api/products/route.ts` | List / create products |
| `/api/products/[id]` | PUT/DELETE | `api/products/[id]/route.ts` | Update / delete product |
| `/api/admin/escalations` | GET | `api/admin/escalations/route.ts` | List escalated orders |
| `/api/admin/inventory` | GET/POST | `api/admin/inventory/route.ts` | List / update inventory |
| `/api/admin/orders` | GET/PATCH | `api/admin/orders/route.ts` | List / update orders |
| `/api/admin/orders/chat-log` | GET | `api/admin/orders/chat-log/route.ts` | Fetch chat log for an order |
| `/api/admin/orders/send-message` | POST | `api/admin/orders/send-message/route.ts` | Send admin message to supplier |
| `/api/admin/orders/takeover` | POST | `api/admin/orders/takeover/route.ts` | Toggle agent override |
| `/api/admin/process-approval` | POST | `api/admin/process-approval/route.ts` | Approve/reject escalated tickets |
| `/api/admin/supplier-quotes` | GET/POST | `api/admin/supplier-quotes/route.ts` | List / approve/reject supplier quotes |
| `/api/admin/upload` | POST | `api/admin/upload/route.ts` | File upload for product images |
| `/api/profile/invoices` | GET | `api/profile/invoices/route.ts` | User's invoice list |
| `/api/webhook/polar` | POST | `api/webhook/polar/route.ts` | Polar.sh webhook → `handleSuccessfulPayment` |

## Database Schema

7 tables, PostgreSQL via Drizzle ORM. Connection in `src/db/index.ts` uses `postgres` driver with `prepare: false` (required for Supabase transaction pool mode).

### `user`
| Column | Type | Notes |
|---|---|---|
| id | text PK | Populated from `auth.users.id` via trigger |
| name | text | |
| email | text UNIQUE NOT NULL | |
| image | text | |
| role | text DEFAULT 'client' NOT NULL | `client` \| `admin` |
| created_at | timestamp DEFAULT now() | |

### `email_logs`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK DEFAULT random() | |
| user_id | text FK → user.id | ON DELETE CASCADE |
| subject | text NOT NULL | |
| body | text NOT NULL | |
| status | text DEFAULT 'draft sourcing' | Lifecycle status |
| ai_response_draft | text | AI-generated response |
| metadata | jsonb | Flexible metadata |
| final_quote_amount | numeric(10,2) | |
| unit_price | numeric(10,2) | |
| total_price | numeric(10,2) | |
| items | jsonb | Line items snapshot |
| supplier_payload | jsonb | Supplier data |
| agent_override | boolean DEFAULT false | Admin takeover flag |
| created_at | timestamp DEFAULT now() | |

### `invoices`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK DEFAULT random() | |
| user_id | text FK → user.id | ON DELETE CASCADE |
| invoice_number | text UNIQUE NOT NULL | e.g. `INV-2026-XXXX` |
| total_amount | text NOT NULL | |
| status | text DEFAULT 'unpaid' | `unpaid` \| `paid` \| `shipping` |
| items_snapshot | jsonb NOT NULL | Frozen cart state |
| created_at | timestamp DEFAULT now() | |

### `products`
| Column | Type | Notes |
|---|---|---|
| id | text PK | e.g. `gildan-18500-hoodie` |
| title | text NOT NULL | |
| cat | text NOT NULL | Category |
| img | text NOT NULL | Image URL |
| price | double precision NOT NULL | |
| price_range | text NOT NULL | |
| description | text NOT NULL | |
| moq | integer NOT NULL | Minimum order quantity |
| customization | text NOT NULL | |
| created_at | timestamp DEFAULT now() | |

### `supplier_quotes`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK DEFAULT random() | |
| order_id | text NOT NULL | |
| supplier_name | text NOT NULL | |
| quoted_cost_per_unit | numeric(10,2) NOT NULL | |
| estimated_delivery_days | integer NOT NULL | |
| status | text DEFAULT 'under review' | |
| created_at | timestamp DEFAULT now() | |

### `materials_inventory`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| product_name | text UNIQUE NOT NULL | |
| stock_quantity | integer DEFAULT 0 | |
| reorder_level | integer DEFAULT 20 | |

### `supplier_messages`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| order_id | text NOT NULL | |
| sender | text NOT NULL | `admin` \| `supplier` \| `stitchhub_procurement_agent` |
| message_text | text NOT NULL | |
| channel_type | text DEFAULT 'supplier_portal' | |
| created_at | timestamptz DEFAULT now() | |

## Order Lifecycle

```
draft sourcing
    ↓ (AI processes)
review required  ←──┐
    ↓                │
escalate_to_admin ───┤ (admin approves/rejects)
    ↓                │
approved ────────────┘
    ↓
processing
    ↓ (inventory deducted, supplier notified)
shipping
    ↓
delivered
```

## Auth & Access Control

**Auth flow:**
- Supabase Auth with SSR (`@supabase/ssr`), session managed via cookies
- `SupabaseProvider.tsx` wraps the app — provides `session`, `user`, `isLoading` via context
- Login/signup/forgot-password/MFA handled by `useAuth.ts` hook
- Role assignment via hardcoded email lists on signup

**Role system:**
- **Client** — default role. Access to products, checkout, profile.
- **Admin** — 7 hardcoded emails in `src/utils/admin.ts`. Full access to admin dashboard and all API routes.
- **Supplier** — 2 hardcoded emails in `src/utils/supplier.ts`. Access to supplier portal only.

**Route protection (`src/proxy.ts`):**
- Guards `/products/checkout`, `/admin/*`, `/supplier/*`, `/api/admin/*`, `/api/supplier*`
- Admin API routes return 403 for non-admins
- Supplier routes accept both supplier and admin emails
- Page routes redirect to `/auth/login` or `/` on unauthorized access

## Component Architecture

```
src/components/
├── admin/
│   ├── AdminPageHeader.tsx
│   ├── EmptyState.tsx
│   ├── FormField.tsx
│   ├── GlassCard.tsx
│   ├── LoadingSpinner.tsx
│   ├── StatusBadge.tsx
│   ├── approval/
│   │   ├── ApprovalsConsole.tsx
│   │   └── ApprovalsQueue.tsx
│   ├── inventory/
│   │   ├── InventoryMetrics.tsx
│   │   └── InventoryTable.tsx
│   ├── order/
│   │   ├── ConversationCenter.tsx
│   │   ├── InboxQueue.tsx
│   │   └── SpecificationsModal.tsx
│   └── supplier-quote/
│       ├── QuotesConsole.tsx
│       └── QuotesQueue.tsx
├── agentic-ai-inbox/
│   ├── agent-response-form.tsx
│   └── agent-side-panel.tsx
├── auth/
│   ├── AuthAlert.tsx
│   ├── AuthBrandHeader.tsx
│   ├── AuthForm.tsx
│   └── AuthInput.tsx
├── landing/
│   ├── LandingHero.tsx
│   ├── LandingAiAdvantage.tsx
│   ├── LandingProcess.tsx
│   ├── LandingProductFeatures.tsx
│   ├── LandingProductLineup.tsx
│   ├── LandingTestimonials.tsx
│   ├── LandingFaq.tsx
│   ├── LandingCta.tsx
│   └── LandingFooter.tsx
├── products/
│   ├── AddToCartButton.tsx
│   ├── ColorSelector.tsx
│   ├── CustomizationMethods.tsx
│   ├── ProductBreadcrumb.tsx
│   ├── ProductCard.tsx
│   ├── ProductFilters.tsx
│   ├── ProductImage.tsx
│   ├── ProductInfo.tsx
│   ├── SizeSelector.tsx
│   ├── SourcingVolumeMatrix.tsx
│   └── VolumeStepper.tsx
├── profile/
│   ├── InboxPanel.tsx
│   ├── OrderHistoryTab.tsx
│   ├── OrderTrackingTab.tsx
│   ├── ProfileAccountTab.tsx
│   ├── ProfileSecurityTab.tsx
│   └── ProfileSidebar.tsx
├── supplier/
│   ├── ActiveRfqDetails.tsx
│   ├── ActiveRfqSidebar.tsx
│   ├── ChatInputForm.tsx
│   ├── ChatMessageBubble.tsx
│   ├── ChatThreadSidebar.tsx
│   ├── SubmittedQuoteCard.tsx
│   └── WholesaleQuoteForm.tsx
├── ui/
│   ├── DancingDots.tsx
│   └── GoldButton.tsx
├── Navbar.tsx
├── CartDrawer.tsx
└── CartDrawerWrapper.tsx
```

## State Management (Zustand)

| Store | File | Key State | Notes |
|---|---|---|---|
| `useCartStore` | `stores/cart-store.ts` | `cart[]`, `isOpen` | `persist` middleware (localStorage: `stitchhub_cart`) |
| `useCheckoutFormStore` | `stores/checkout-form-store.ts` | `toEmail`, `subject`, `message`, `isSubmitting`, `isSuccess` | + helper generators |
| `useProductFilterStore` | `stores/product-filter-store.ts` | `activeCategory`, `sortBy`, filtered products | Pure filter/sort pipeline |
| `useProfileStore` | `stores/profile-store.ts` | Tab selection, user, logs, invoices, MFA status | |
| `useReducedMotionStore` | `stores/reduced-motion-store.ts` | `prefersReducedMotion` | SSR-safe observer |
| `useSupplierStore` | `stores/supplier-store.ts` | RFQs, bids, invoices, threads, messages | |

## React Hooks

| Hook | File | Purpose |
|---|---|---|
| `useAuth` | `hooks/useAuth.ts` (259 lines) | Login/signup/forgot-password/MFA state machine |
| `useProducts` | `hooks/useProducts.ts` (49 lines) | TanStack Query fetch + filter/sort |
| `useProductDetail` | `hooks/useProductDetail.ts` (71 lines) | Quantity/size/price logic, add-to-cart, checkout |
| `useProductDetailPage` | `hooks/useProductDetailPage.ts` (42 lines) | Page-level product lookup wrapper |
| `useCheckoutForm` | `hooks/useCheckoutForm.ts` (172 lines) | Cart review, suggestions, file upload, submit to `/api/agent` |
| `useCart` | `hooks/useCart.ts` | Cart operations wrapper |
| `useNavbar` | `hooks/useNavbar.ts` (64 lines) | Session normalization, dropdown, cart badge |
| `useProfile` | `hooks/useProfile.ts` (303 lines) | Profile CRUD, MFA enrollment |
| `useChat` | `hooks/useChat.ts` (157 lines) | Chat threads, send messages |
| `useReducedMotion` | `hooks/useReducedMotion.ts` (33 lines) | OS media query listener |
| `useLandingProcess` | `hooks/useLandingProcess.ts` (16 lines) | Landing step tracker |
| `useLandingFaq` | `hooks/useLandingFaq.ts` (20 lines) | FAQ accordion toggle |
| `useActiveRequests` | `hooks/useActiveRequests.ts` (190 lines) | Supplier RFQ fetch + quote submission |
| `useSubmittedQuotes` | `hooks/useSubmittedQuotes.ts` (81 lines) | Supplier's submitted bids |
| `useSupplierMessages` | `hooks/useSupplierMessages.ts` (200 lines) | Thread fetch + real-time subscription + send |
| `useAdminApprovals` | `hooks/useAdminApprovals.ts` (195 lines) | Escalation load + approve/reject |
| `useAdminEscalations` | `hooks/useAdminEscalations.ts` (34 lines) | Simple escalation fetch |
| `useAdminInventory` | `hooks/useAdminInventory.ts` (114 lines) | Stock/reorder CRUD |
| `useAdminOrders` | `hooks/useAdminOrders.ts` (293 lines) | Full order management |
| `useAdminProducts` | `hooks/useAdminProducts.ts` (195 lines) | Product CRUD + image upload |
| `useAdminSupplierQuotes` | `hooks/useAdminSupplierQuotes.ts` (111 lines) | Quote review + margin calculation |

## AI Agent Architecture

**Dual-model design:**
1. **Primary:** Local Ollama `stitchhub_v5` (fine-tuned GGUF, `http://localhost:11434`, 3s timeout)
2. **Fallback:** Google Gemini API (`GEMINI_MODEL` env var, default `gemini-2.5-flash` or `gemini-3.1-flash-lite`)

**Business Logic Interceptor Middleware** (in both `/api/agent/route.ts` and `/api/chat/route.ts`):
- Timeline validation (minimum 28 days)
- Individualization / custom material detection
- Inventory depletion pre-approval checks
- Tiered pricing computation
- Escalation detection (`<action>PAUSE</action>`, `escalate_to_admin`)
- Background supplier portal notifications
- Mock supplier quote creation
- Brevo transactional email dispatch

**System prompts** defined in `src/utils/prompts.ts`:
- `AGENT_SYSTEM_PROMPT` — sourcing agent persona
- `generateSupplierPrompt()` — procurement agent persona

## Payment Flow (Polar.sh)

1. User submits sourcing request → AI processes → `POST /api/agent/checkout` creates Polar checkout session
2. User redirected to Polar hosted checkout page
3. Polar sends webhook `POST /api/webhook/polar` → `handleSuccessfulPayment()` (`src/lib/polar-utils.ts`)
4. Payment handler: deducts inventory → updates `email_logs` status to "processing" → updates `invoices` status to "paid" → triggers `POST /api/supplier-sourcing` in background

## Styling System

**Tailwind CSS v4** with custom design tokens defined in `src/app/globals.css`:
- **Color palette:** Primary (purple), Secondary (sky blue), Accent (amber), Success (emerald), Neutral (slate)
- **Typography:** `--font-display` (Plus Jakarta Sans), `--font-body` (Inter)
- **Scale:** `--text-xs` through `--text-hero` (clamp-based responsive)
- **Spacing:** 4px grid base (`--space-1` through `--space-32`)
- **Borders:** sm(6px), md(12px), lg(20px), xl(28px), full(9999px)
- **Shadows:** xs through lg, plus `glow-primary` and `glow-success`
- **Transitions:** spring, smooth, gentle easings; fast(140ms), normal(260ms), slow(480ms)
- **Z-index scale:** below(-1) through toast(60)
- **Accessibility:** `prefers-reduced-motion` disables all animations

Custom animations in `src/styles/animations.css`: shimmer, pulse-slow, fade-in-up, slide-in-right, slide-in-left, dance. Glass panel utility class.

## Product Catalog

Static data in `src/data/products.ts` — 11 products across 4 categories:

| Category | Count | Examples | Price Range | MOQ |
|---|---|---|---|---|
| Apparel | 5 | Gildan 18500 Hoodie, UA Polo, Windbreaker, Heavyweight Hoodie, Corporate Polo | $14.99–$79.99 | 25–50 |
| Drinkware | 3 | Matte Black Tumbler, Thermo Flask, Insulated Tumbler | $24.99–$44.99 | 25–50 |
| Gear | 2 | Tech Organizer, EDC Pouch | $34.99–$89.99 | 25 |
| Office | 1 | Framed Acoustic Art Panel | $59.99 | 25 |

## Environment Variables (`.env.example` reference)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
PUBLISHABLE_KEY=
SUPABASE_SERVICE_KEY=
DATABASE_URL=
POLAR_ACCESS_TOKEN=
POLAR_ORGANIZATION_ID=
BREVO_API_KEY=
GEMINI_API_KEY=
GEMINI_MODEL=
```

## Important Gotchas

1. **Next.js 16 breaking changes** — `AGENTS.md` instructs reading guides in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.
2. **`src/db/index.ts`** disables `prepare: false` (required for Supabase transaction pool mode with `postgres` driver).
3. **Admin/Supplier roles** are determined by hardcoded email lists in `src/utils/admin.ts` (7 emails) and `src/utils/supplier.ts` (2 emails) — not database-driven.
4. **Supplier portal** uses real-time Supabase subscriptions for live messaging (`useSupplierMessages.ts`).
5. **Ollama 3s timeout** — if the local model is unavailable or slow, the fallback to Gemini is automatic.
6. **No test files exist** in the project — no testing framework is configured.
7. **Cart uses localStorage** via Zustand `persist` middleware (`stitchhub_cart` key).
8. **Image uploads** stored at Supabase Storage (`yqsnerhfucwebmaweudf.supabase.co`).
9. **`proxy.ts` matcher** uses specific path patterns — adding new protected routes requires updating both the matcher config and the handler logic.
