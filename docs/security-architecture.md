# Security Architecture

## Authentication Flow

```
1. POST /auth/register → hash password (bcrypt, cost=10) → create user
2. POST /auth/login    → verify bcrypt → issue access (15m) + refresh (30d) tokens
3. POST /auth/refresh  → verify refresh token → issue new access token
4. POST /auth/logout   → client clears tokens
```

## Token Strategy

| Token | Type | Expiry | Storage |
|-------|------|--------|---------|
| Access | JWT | 15 minutes | Memory (JS variable) |
| Refresh | JWT | 30 days | HttpOnly cookie (future) |

## Security Controls

### Transport
- All API traffic served over HTTPS only (HSTS: 2 years + preload)

### Headers (Helmet 8)
| Header | Value |
|--------|-------|
| Content-Security-Policy | `default-src 'self'`, restrictive directives |
| X-Frame-Options | DENY |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| HSTS | max-age=63072000; includeSubDomains; preload |

### Input Validation
- All request bodies validated with Zod schemas via `nestjs-zod`
- DTOs enforce min/max constraints and email format

### Rate Limiting
- 100 requests per minute per IP via `@nestjs/throttler`
- OpenRouter AI endpoint: stricter 10 req/min limit

## Threat Mitigation

| Threat | Mitigation |
|--------|-----------|
| SQL Injection | Prisma parameterized queries |
| XSS | CSP + React's JSX escaping |
| CSRF | SameSite cookies (future) |
| Brute Force | Rate limiting + bcrypt cost factor |
| Token Theft | Short-lived access tokens (15m) |
| Clickjacking | X-Frame-Options: DENY |

## Password Policy
- Minimum 8 characters (enforced by Zod)
- Hashed with bcrypt, cost factor 10
- Never stored or logged in plaintext
