# 🌍 CarbonWise

> Helping individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

---

## 📖 Overview

CarbonWise is an intelligent sustainability platform designed to help people make environmentally conscious decisions through data-driven insights, personalized recommendations, and predictive sustainability forecasting.

Most carbon footprint calculators simply show emissions.

CarbonWise goes beyond measurement by helping users:

- Understand where emissions originate
- Track sustainability progress over time
- Identify carbon hotspots
- Receive personalized recommendations
- Simulate future environmental outcomes before making lifestyle changes

The platform acts as a personal sustainability coach focused on long-term behavior change rather than one-time calculations.

---

## 🎯 Problem Statement

Design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

CarbonWise directly addresses all three objectives:

### Understand

Users gain visibility into:

- Carbon Score
- Sustainability Rating
- Emission Breakdown
- Carbon Hotspots

### Track

Users can monitor:

- Daily Activities
- Historical Trends
- Goal Progress
- Sustainability Reports

### Reduce

Users receive:

- Personalized Recommendations
- Action Plans
- Carbon Twin Simulations
- Predicted Savings

---

# 🚀 Key Features

## 📊 Carbon Intelligence Engine

Calculates emissions across multiple categories:

### Transportation

- Car Travel
- Bus Travel
- Train Travel
- Flights
- Bike Usage

### Food

- Meat Consumption
- Dairy Consumption
- Vegetarian Meals
- Vegan Meals

### Energy

- Electricity Usage
- Heating
- Cooling

### Shopping

- Clothing
- Electronics
- Household Purchases

The engine converts user activities into measurable carbon emissions and generates a sustainability score.

---

## 📈 Sustainability Dashboard

Provides users with:

- Carbon Score
- Sustainability Rating
- Monthly Emissions
- Historical Trends
- Emission Breakdown
- Goal Progress

Designed to help users quickly understand their environmental impact.

---

## 🎯 Personalized Recommendation Engine

The recommendation engine analyzes:

- Emission Hotspots
- User Preferences
- Historical Activities
- Sustainability Goals

Example:

Transportation-heavy users may receive:

```text
Use public transport twice per week
```

Estimated impact:

```text
120 kg CO₂ reduction annually
```

Each recommendation includes:

- Impact Level
- Difficulty Level
- Estimated Savings
- Action Plan

---

## 🔮 Carbon Twin Engine

CarbonWise introduces a Carbon Twin system that simulates future sustainability outcomes.

Users can explore scenarios such as:

```text
What if I reduce car usage?

What if I switch to public transport?

What if I reduce meat consumption?

What if I lower electricity usage?
```

The system forecasts:

- Current Emissions
- Future Emissions
- Potential Savings
- Projected Carbon Score

This helps users make informed decisions before changing real-world habits.

---

## 🎯 Goal Tracking System

Users can:

- Create Sustainability Goals
- Track Progress
- Monitor Milestones
- Measure Reductions

Examples:

```text
Reduce Transportation Emissions by 20%

Reduce Monthly Carbon Footprint by 15%

Reduce Meat Consumption by 30%
```

---

# 🏗️ System Architecture

```text
User
 │
 ▼
Next.js Frontend
 │
 ▼
NestJS Backend
 │
 ├── Authentication Engine
 ├── Carbon Intelligence Engine
 ├── Recommendation Engine
 ├── Goal Engine
 ├── Analytics Engine
 └── Carbon Twin Engine
 │
 ▼
PostgreSQL
 │
 ▼
Redis Cache
```

---

# 🛠️ Technology Stack

## Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn/UI
- TanStack Query

## Backend

- NestJS
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Caching

- Redis

## Authentication

- JWT
(Access Token
Refresh Token
Refresh Token Rotation)
- bcrypt

## Security

- Helmet
- Rate Limiting
- Input Validation
- Secure Environment Variables

## Testing

- Jest
- Supertest
- Playwright
- axe-core

---

# 🔐 Security Features

CarbonWise follows secure-by-default development practices.

Implemented protections include:

### Authentication

- JWT Access Tokens
- Refresh Tokens
- Password Hashing

### Input Validation

- Zod Validation
- Request Sanitization

### API Security

- Helmet Security Headers
- Rate Limiting
- Protected Routes

### Database Security

- Prisma ORM
- SQL Injection Protection

---

# ⚡ Performance Optimizations

To ensure scalability and responsiveness:

### Database

- Indexed Queries
- Optimized Schema Design
- Pagination

### Backend

- Redis Caching
- Efficient API Responses

### Frontend

- Lazy Loading
- Code Splitting
- Optimized Rendering

Performance Targets:

```text
Dashboard Load Time < 2 Seconds

API Response Time < 500 ms

Carbon Calculation < 100 ms
```

---

# 🧪 Testing Strategy

CarbonWise follows a multi-layer testing approach.

### Unit Testing

Framework:

```text
Jest
```

Coverage Target:

```text
90%+
```

---

### Integration Testing

Framework:

```text
Supertest
```

Coverage Target:

```text
80%+
```

---

### End-to-End Testing

Framework:

```text
Playwright
```

Critical User Flows:

- Registration
- Login
- Carbon Calculator
- Recommendations
- Goal Tracking
- Carbon Twin

---

### Accessibility Testing

Tools:

```text
Playwright
axe-core
```

---

# ♿ Accessibility

CarbonWise is designed to support diverse users.

Features include:

- WCAG 2.2 AA Compliance
- Keyboard Navigation
- Screen Reader Compatibility
- Semantic HTML
- ARIA Labels
- Accessible Forms
- Color Contrast Compliance

---

# 📂 Project Structure

```text
carbonwise/

├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── ui/
│   ├── validation/
│   ├── types/
│   └── utilities/
│
├── infrastructure/
│
├── tests/
│
├── docs/
│
└── README.md
```

---

# 🎯 Challenge Alignment

The project directly addresses the challenge requirements.

| Requirement | Implementation |
|------------|----------------|
| Understand | Carbon Intelligence Engine |
| Track | Dashboard + Analytics + Goals |
| Reduce | Recommendations + Carbon Twin |
| Personalized Insights | Recommendation Engine |
| Practical Usability | Dashboard + Goal Tracking |
| Real-World Value | Sustainability Decision Support |

---

# 🚀 Future Enhancements

Planned future improvements:

- AI Sustainability Coach
- Community Challenges
- Smart Device Integrations
- Sustainability Achievements
- Advanced Carbon Forecasting
- Gamification System

---

# 👨💻 Development Principles

The project follows:

- SOLID Principles
- Clean Architecture
- Modular Design
- Security-First Development
- Test-Driven Development
- Accessibility-First Design

---

# 📜 License

This project is developed as part of a sustainability-focused software engineering challenge.

---

# 🌱 Vision

CarbonWise aims to transform sustainability from a complex environmental concept into simple daily actions that anyone can understand, track, and improve.

By combining carbon intelligence, personalized recommendations, and predictive forecasting, CarbonWise helps users build lasting sustainable habits and make better environmental decisions.
