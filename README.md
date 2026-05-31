# Stitch Hub

**Intelligent B2B custom apparel sourcing — powered by an agentic AI logistics engine.**

Stitch Hub is a premium B2B merchandise platform purpose-built for corporate sourcing teams, creative directors, and brand strategists who demand zero tolerance for color inconsistency, delayed timelines, or opaque procurement pipelines.

---

## ✦ Overview

This repository contains the full-stack landing page for the Stitch Hub platform. The design is built around a premium **dark-luxury** aesthetic — high-contrast black and gold palette, glassmorphic cards, studio-grade product photography, and fluid micro-interactions — all engineered to reflect the caliber of the operational engine behind it.

> *"We handle the complex material physics so you can focus on your legacy."*

---

## ✦ Landing Page Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full-bleed banner with metallic shimmering CTA button |
| 2 | **AI Advantage** | Three glassmorphic benefit cards — Predictive Engine, Escalation Protocol, Procurement |
| 3 | **B2B Process Flow** | Interactive 4-step sourcing timeline with live selector panels |
| 4 | **Why Choose Us** | High-contrast product feature reveals with image zoom transitions |
| 5 | **Product Lineup** | 4-column responsive showcase grid with hover gradients |
| 6 | **Client Testimonials** | Verified B2B corporate reviews with gold star ratings |
| 7 | **FAQ** | State-driven interactive accordion panels |
| 8 | **Footer CTA** | Legacy-focused conversion section with clean brand navigation |

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Images** | `next/image` — optimized WebP with responsive `sizes` and priority preloading |
| **Animation** | CSS keyframes + Tailwind transitions |
| **State** | React `useState` (lightweight, no external store) |
| **Icons** | Inline SVG |
| **Fonts** | Plus Jakarta Sans · Inter (Google Fonts) |

---

## ✦ Performance Highlights

- **100% WebP image assets** — 90%+ file size reduction vs. PNG equivalents
- **Responsive `sizes` attributes** — Next.js generates optimal `srcset` per viewport
- **LCP-optimized `priority` preloading** on above-the-fold images
- **Static pre-rendering** — all routes output as static HTML at build time
- **Turbopack** — sub-5 second production builds

---

## ✦ Project Structure

```
src/
├── app/
│   ├── page.tsx            # Page composition (section assembly)
│   ├── layout.tsx          # Root layout with metadata
│   ├── globals.css         # Design system tokens & base styles
│   ├── animations.css      # Custom keyframe animations
│   └── icon.svg            # Luxury SVG favicon
│
└── components/
    └── landing/
        ├── LandingHero.tsx             # Hero section
        ├── LandingAiAdvantage.tsx      # AI feature cards
        ├── LandingProcess.tsx          # Interactive process timeline
        ├── LandingProductFeatures.tsx  # Featured product showcase
        ├── LandingProductLineup.tsx    # Product catalog grid
        ├── LandingTestimonials.tsx     # Client review matrix
        ├── LandingFaq.tsx              # FAQ accordion panel
        └── LandingFooter.tsx           # Bottom CTA & footer links

public/
├── hero-banner.webp    # Full-bleed hero background
├── polo.webp           # Performance polo studio shot
├── pouch.webp          # Tech organizer pouch shot
├── hoodie.webp         # Gildan 18500 hoodie with hood up
└── tumbler.webp        # Matte black drinkware shot
```

---

## ✦ Getting Started

**Prerequisites**: Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/1ewig/stitch-hub.git
cd stitch-hub

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm run start
```

---

## ✦ Design System

The color palette is built around a **black canvas** with **liquid gold** accents — reinforcing exclusivity and corporate credibility.

| Token | Value | Usage |
|-------|-------|-------|
| Gold Primary | `#d4af37` | CTAs, highlights, stars, dividers |
| Gold Deep | `#b38e20` | Button gradients, shimmer starts |
| Gold Light | `#ebd06f` | Button shimmer peaks, hover states |
| Surface Dark | `#09090b` (zinc-950) | Primary page background |
| Glass Fill | `rgba(255,255,255,0.05)` | Glassmorphic card backgrounds |
| Cream | `#f5f2eb` | High-contrast light section break |

---

## ✦ License

This project is private. All product imagery and copy is proprietary to Stitch Hub B2B.

---

<div align="center">
  <strong>STITCH HUB<span style="color:#d4af37">.</span></strong><br/>
  <sub>Intelligent Design. Distinctive Presence. Ascend Your Brand.</sub>
</div>
