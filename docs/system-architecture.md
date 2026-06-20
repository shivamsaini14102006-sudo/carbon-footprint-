# System Architecture

## Overview

CarbonWise is a full-stack sustainability intelligence platform. The architecture follows a modern monorepo structure where the frontend and backend are co-located but independently deployable.

## Monorepo Structure

```
carbonwise/
├── apps/
│   ├── web/          # Next.js 15 Frontend (Vercel)
│   └── api/          # NestJS 11 Backend (Railway/Render)
├── packages/
│   ├── ui/           # Shared UI primitives (future)
│   └── validation/   # Shared Zod schemas (future)
└── docs/             # Engineering documentation
```

## Technology Choices

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 15 + React 19 | App Router, static export, RSC |
| Styling | Tailwind CSS v4 | Native CSS variables, no config file |
| Backend | NestJS 11 | DI, decorators, modular |
| Database | PostgreSQL via Prisma 7 | Type-safe ORM, migration tracking |
| Auth | JWT (access + refresh) | Stateless, scalable |
| Validation | Zod + nestjs-zod | Schema-first, type-inferred DTOs |
| Rate Limiting | @nestjs/throttler | 100 req/min per IP |
| Security Headers | Helmet 8 | CSP, HSTS, XSS, frameguard |

## Data Flow

```
User → Next.js Page → Service Layer → API (NestJS) → Prisma → PostgreSQL
                             ↑
                      JWT Bearer Token (Auth Guard)
```

## Carbon Scoring Engine

The scoring engine uses empirical emission factors (IPCC 2023 data) to calculate a normalized 0–100 score. Score 0 = 300+ kg CO₂e monthly, Score 100 = net zero.

### Scoring Formula
```
Emission = Σ(activity_quantity × emission_factor)
Score = 100 - min(emission / 300 × 100, 100)
Hotspot = argmax(category_emissions)
```

## Recommendation Engine

Recommendations are ranked by: `Priority Score = Impact × Feasibility × Hotspot_Alignment`

Higher-weight recommendations are served first. Accepted recommendations trigger a goal creation flow.
