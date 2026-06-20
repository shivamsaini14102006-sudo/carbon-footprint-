# Testing Strategy

## Test Layers

| Layer | Tool | Target Coverage |
|-------|------|----------------|
| Unit Tests | Jest + ts-jest | 90%+ |
| Integration | Supertest | 80%+ |
| E2E | Playwright (future) | Key user flows |

## Unit Test Coverage

### AuthService (`auth.service.spec.ts`)
- ✅ Register new user
- ✅ Reject duplicate email
- ✅ Login success → tokens issued
- ✅ Login fail → user not found
- ✅ Login fail → wrong password
- ✅ Refresh valid token → new access token
- ✅ Refresh invalid token → UnauthorizedException

### CarbonService (`carbon.service.spec.ts`)
- ✅ Zero emissions → score 100
- ✅ Transportation emission calculation
- ✅ Food emission calculation
- ✅ Hotspot detection
- ✅ Score capped at 0 for extreme emissions
- ✅ Total emission = sum of breakdown

### RecommendationsService (`recommendations.service.spec.ts`)
- ✅ Returns ≤ 3 recommendations
- ✅ Hotspot-aligned recommendation is ranked first
- ✅ Internal scoring fields are not exposed to caller
- ✅ Accept recommendation returns success

## Running Tests

```bash
# All tests
pnpm -F api test

# With coverage
pnpm -F api test --coverage

# Watch mode
pnpm -F api test --watch
```

## CI Integration
Tests run automatically on every push via GitHub Actions (`.github/workflows/ci.yml`).
