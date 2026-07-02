# Stitch Hub

**Intelligent B2B custom apparel sourcing — powered by an agentic AI logistics engine.**

Stitch Hub is a full-stack platform connecting corporate buyers, suppliers, and administrators through an AI-driven procurement pipeline. It automates RFQ processing, quote generation, inventory management, and supplier coordination — with human oversight via dashboards, approval queues, and real-time messaging.

---

## Features

- **AI Procurement Agent** — Dual-model system (local Ollama + Gemini fallback) generates professional B2B sourcing quotes, detects escalation triggers, and enforces business rules (minimum timelines, banned modifications, inventory checks)
- **Three-Role Portal** — Distinct interfaces for corporate buyers (product catalog, checkout, order history), administrators (dashboard, orders, approvals, inventory, supplier quotes), and suppliers (RFQs, quote submission, real-time chat)
- **Smart Checkout & Payments** — Multi-step RFQ flow with AI-generated quote suggestions and Polar.sh deposit payments (30% upfront)
- **Real-time Supplier Communication** — Supabase Realtime-driven chat between administrators and suppliers, with notification badges and unread indicators
- **Inventory Intelligence** — Raw materials tracking with reorder alerts, auto-replenishment on quote approval, inline stock editing
- **B2B Product Catalog** — Tiered volume pricing, color/size variants, customization methods (embroidery, screen-print), MOQ enforcement
- **Admin Dashboard** — KPI cards, sales overview chart (Recharts), quote conversion rates, pipeline task breakdown, CSV export, urgent alerts

---

## Architecture

```
Client Browser
    │
    ▼
Next.js 16 (App Router + Turbopack)
    │
    ├── Supabase Auth (SSR sessions, MFA, role-based access)
    ├── React Query (server-state caching)
    ├── Zustand (client-state: cart, filters, forms)
    │
    ├── API Routes
    │   ├── /api/agent/*       → Ollama ↔ Gemini AI models
    │   ├── /api/admin/*       → Admin operations
    │   ├── /api/products/*    → Product CRUD
    │   ├── /api/chat          → Conversational AI
    │   ├── /api/webhook/polar → Payment events
    │   └── /api/supplier-sourcing → PO automation
    │
    └── External Services
        ├── Supabase (PostgreSQL + Storage + Realtime)
        ├── Ollama (local LLM inference)
        ├── Gemini API (cloud AI fallback)
        ├── Polar.sh (payment processing)
        └── Brevo (transactional email)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript (strict) |
| **Database** | Supabase PostgreSQL + Drizzle ORM |
| **Authentication** | Supabase Auth (SSR, MFA, role-based) |
| **AI Inference** | Ollama (local) + Google Gemini (fallback) |
| **Payments** | Polar.sh SDK |
| **Email** | Brevo (Sendinblue v5) |
| **Styling** | Tailwind CSS v4 |
| **State** | Zustand v5 (6 stores, persist middleware for cart) |
| **Server State** | TanStack React Query v5 |
| **Animations** | Framer Motion v12 |
| **Charts** | Recharts v3 |
| **Storage** | Supabase Storage (product images) |
| **Real-time** | Supabase Realtime (supplier chat) |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page (9 sections)
│   ├── layout.tsx              # Root layout + providers
│   ├── products/               # Client: catalog, detail, checkout
│   ├── profile/                # Client: orders, inbox, settings, security
│   ├── admin/                  # Admin: dashboard, orders, approvals, inventory, supplier-quotes
│   ├── supplier/               # Supplier: RFQs, quotes, messages
│   ├── auth/                   # Login, password reset
│   ├── payment/                # Payment success
│   └── api/                    # 22+ API route handlers
├── components/                 # Domain-organized components
│   ├── landing/                # Marketing sections
│   ├── products/               # Product browsing, detail, cart
│   ├── admin/                  # Dashboard, orders, approvals, inventory, products
│   ├── supplier/               # RFQs, quote form, chat
│   ├── agentic-ai-inbox/       # AI response UI
│   ├── auth/                   # Login/signup forms
│   ├── profile/                # Account, security, history, inbox
│   └── ui/                     # Shared (GoldButton, DancingDots)
├── hooks/                      # 20 custom React hooks
├── stores/                     # 6 Zustand stores
├── db/                         # Schema, migrations, seeds
├── lib/                        # Polar.sh SDK client, utilities
├── providers/                  # React Query + Supabase context providers
├── types/                      # Shared TypeScript interfaces
├── utils/                      # Pricing, inventory, prompts, admin/supplier lists
└── styles/                     # Custom CSS animations
```

---

## Portals

### Client Portal

Corporate buyers browse the B2B product catalog with category filters, search, and sort. Each product detail page displays customization methods, color/size variants, and a tiered pricing matrix by volume. The checkout flow includes an AI-powered panel that generates contextual sourcing quotes and upsell suggestions. Orders require a 30% Polar.sh deposit; on payment confirmation, a background agent notifies suppliers. Users track order history and access escalation inboxes from their profile.

### Admin Portal

Administrators monitor platform health via a dashboard with revenue KPIs, sales charts, quote conversion rates, inventory alerts, and pipeline breakdown (CSV exportable). The orders desk provides a conversation center with AI chat logs, human takeover toggles, supplier chat channels, and status/quote editing. Product management supports full CRUD with image upload to Supabase Storage. An approvals queue lets admins review AI-generated drafts, set pricing, and approve/dismiss with Brevo notifications. The supplier quote console evaluates wholesale bids, calculates margins, and auto-replenishes inventory on approval.

### Supplier Portal

Suppliers browse active RFQs with full requisition specifications and submit wholesale quotes (unit price, MOQ, lead time). Submitted quotes are tracked by status. A real-time messaging interface (powered by Supabase Realtime) connects suppliers with administrators and the AI procurement agent, with unread notifications and message threading.

---

## AI Agent System

The sourcing agent uses a **dual-model architecture**: a local Ollama instance (`stitchhub_v5` GGUF model) is the primary inference engine, with Google Gemini as a fallback if Ollama is unavailable. The agent powers:

- **Quote Generation** — `/api/agent` constructs professional B2B sourcing responses with tiered pricing, inventory checks, and escalation detection
- **Chat** — `/api/chat` handles multi-turn conversations with business rule enforcement
- **Suggestions** — `/api/agent/suggestions` generates 4-6 contextual upsell/customization options per checkout

**Business logic interceptors** run after every AI response to enforce rules: minimum 28-day timelines, banned modification detection (individual names, material swaps), override of hallucinated rejections, pre-approval inventory depletion checks, and auto-escalation for high-value orders (50+ units → supplier notification, 500+ units → admin approval required).

---

## API Routes

| Endpoint | Purpose |
|----------|---------|
| `POST /api/agent` | Generate AI sourcing quote |
| `POST /api/agent/checkout` | Create Polar.sh checkout session |
| `POST /api/agent/suggestions` | Generate upsell suggestions |
| `POST /api/agent/pay-deposit` | Confirm deposit and trigger sourcing |
| `POST /api/chat` | Conversational AI with business rules |
| `GET /api/products` | List all products |
| `POST /api/products` | Create product (admin) |
| `PUT/DELETE /api/products/[id]` | Update/delete product (admin) |
| `GET /api/admin/dashboard` | Dashboard metrics and charts |
| `GET/PATCH /api/admin/orders` | List/update orders |
| `GET/POST /api/admin/approvals` | Manage escalation queue |
| `POST /api/admin/process-approval` | Approve/dismiss escalated orders |
| `GET/POST /api/admin/supplier-quotes` | List/approve supplier quotes |
| `GET/POST /api/admin/inventory` | List/update stock levels |
| `POST /api/admin/upload` | Upload product images |
| `POST /api/webhook/polar` | Polar.sh payment webhook |
| `POST /api/supplier-sourcing` | Post-payment PO generation |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Supabase project (PostgreSQL + Auth)
- Ollama (optional, for local AI) or a Gemini API key
- A Polar.sh sandbox account

### Installation

```bash
git clone https://github.com/1ewig/stitch-hub.git
cd stitch-hub
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Direct PostgreSQL connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |
| `BREVO_API_KEY` | Brevo transactional email API key |
| `POLAR_ACCESS_TOKEN` | Polar.sh organization access token |
| `POLAR_WEBHOOK_SECRET` | Polar.sh webhook signing secret |
| `POLAR_PRODUCT_ID` | Polar.sh product ID for deposits |
| `GEMINI_API_KEY` | Google Gemini API key (fallback) |
| `GEMINI_MODEL` | Gemini model name |

### Database Setup

```bash
npm run db:migrate
```

This creates the required tables and registers Supabase Auth synchronization triggers (auto-sync `auth.users` → public `users` table).

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm run start
```

---

## Deployment

The project is ready for deployment on Vercel. Ensure all environment variables are configured in the deployment dashboard. The Supabase project must be accessible from the deployment environment.

---

## License

Private — all rights reserved. Product imagery and copy is proprietary to Stitch Hub B2B.
