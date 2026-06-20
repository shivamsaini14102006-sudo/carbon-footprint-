# 🌍 CarbonWise

> Helping individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

---

# 🎯 Problem Statement

Design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

CarbonWise was built specifically to solve this challenge by turning sustainability data into actionable behavior change.

Unlike traditional carbon calculators that only display emissions, CarbonWise helps users:

✅ Understand where their emissions come from

✅ Track progress over time

✅ Receive personalized recommendations

✅ Simulate future environmental impact

✅ Build sustainable habits

---

# 🌱 Why CarbonWise?

Most carbon footprint tools stop after showing a number.

CarbonWise focuses on helping people take action.

The platform follows a three-stage sustainability journey:

## 1. Understand

Users discover:

* Carbon Score
* Sustainability Rating
* Emission Breakdown
* Carbon Hotspots

## 2. Track

Users monitor:

* Daily Activities
* Historical Trends
* Carbon Savings
* Goal Progress
* Sustainability Streaks

## 3. Reduce

Users receive:

* Personalized Recommendations
* Estimated Carbon Savings
* Carbon Twin Forecasts
* Sustainability Action Plans

---

# 🚀 Core Features

## 📊 Carbon Intelligence Engine

Calculates emissions across major lifestyle categories:

### Transportation

* Car Travel
* Public Transport
* Flights
* Train Travel
* Bike Usage

### Food

* Meat Consumption
* Dairy Consumption
* Vegetarian Meals
* Vegan Meals

### Energy

* Electricity Usage
* Heating
* Cooling

### Shopping

* Clothing
* Electronics
* Household Purchases

The engine converts everyday activities into measurable carbon emissions and generates an overall Carbon Score.

---

## 🔥 Carbon Hotspot Detection

CarbonWise automatically identifies the user's largest emission sources.

Example:

```text
Transportation: 55%

Food: 20%

Energy: 15%

Shopping: 10%
```

This helps users focus on the highest-impact opportunities first.

---

## 📈 Sustainability Dashboard

The dashboard provides:

* Carbon Score
* Sustainability Rating
* Monthly Emissions
* Emission Trends
* Goal Progress
* Carbon Savings

Users can instantly understand their current environmental impact.

---

## 🎯 Personalized Recommendation Engine

Recommendations are generated using:

* Emission Hotspots
* User Preferences
* Historical Activities
* Sustainability Goals

Example:

```text
Recommendation:
Replace two weekly car trips with public transport

Estimated Annual Savings:
120 kg CO₂
```

Every recommendation includes:

* Impact Level
* Difficulty Level
* Estimated Savings
* Reasoning

---

## 💚 Carbon Savings Tracker

CarbonWise tracks the real-world impact of completed actions.

Example:

```text
Public Transport Adoption
↓
120 kg CO₂ Saved

Reduced Meat Consumption
↓
90 kg CO₂ Saved

Total Annual Savings
↓
210 kg CO₂
```

This transforms sustainability from an abstract concept into measurable progress.

---

## 🔥 Sustainability Habit Streaks

Behavior change is difficult.

CarbonWise encourages consistency through sustainability streaks.

Examples:

* 7 Day Sustainable Transport Streak
* 14 Day Low-Energy Usage Streak
* 30 Day Carbon Reduction Streak

The goal is to build long-term sustainable habits.

---

## 🔮 Carbon Twin Engine

CarbonWise introduces a Carbon Twin system.

A Carbon Twin is a virtual model of a user's lifestyle that predicts future outcomes.

Users can compare:

### Current Lifestyle

Current emissions and carbon score.

### Public Transport Scenario

Predicted impact if transportation habits improve.

### Vegetarian Diet Scenario

Predicted impact if dietary habits change.

### Combined Sustainability Plan

Predicted impact when multiple actions are adopted together.

Carbon Twin forecasts include:

* Future Emissions
* Carbon Savings
* Sustainability Score
* Reduction Percentage

This allows users to evaluate decisions before making real-world changes.

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

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Shadcn/UI

## Backend

* NestJS
* TypeScript

## Database

* PostgreSQL
* Prisma ORM

## Caching

* Redis

## Authentication

* JWT
* Refresh Tokens
* Refresh Token Rotation
* bcrypt

## Security

* Helmet
* Rate Limiting
* Input Validation
* Secure Environment Variables

## Testing

* Jest
* Supertest
* Playwright
* axe-core

---

# 🔐 Security

CarbonWise follows secure-by-default development practices.

Implemented protections include:

* JWT Authentication
* Refresh Token Rotation
* Password Hashing with bcrypt
* Helmet Security Headers
* Rate Limiting
* Zod Validation
* Protected Routes
* SQL Injection Protection via Prisma

---

# 🧪 Testing

CarbonWise follows a multi-layer testing strategy.

### Unit Tests

Framework:

* Jest

### Integration Tests

Framework:

* Supertest

### End-to-End Tests

Framework:

* Playwright

Covered User Flows:

* Registration
* Login
* Dashboard
* Carbon Calculator
* Recommendations
* Goals
* Carbon Twin

### Accessibility Testing

Tools:

* Playwright
* axe-core

---

# ♿ Accessibility

CarbonWise is designed for inclusive usage.

Features include:

* WCAG 2.2 AA Compliance
* Keyboard Navigation
* ARIA Labels
* Screen Reader Support
* Accessible Forms
* Color Contrast Compliance

---

# 📊 Emission Data Sources

Carbon calculations are based on recognized sustainability references including:

* IPCC Guidelines
* EPA Emission Factors
* DEFRA Greenhouse Gas Conversion Factors

These sources provide standardized emission factors for transportation, food, energy, and consumer activities.

---

# 🎯 Challenge Alignment

| Challenge Requirement | CarbonWise Solution                     |
| --------------------- | --------------------------------------- |
| Understand            | Carbon Intelligence Engine              |
| Track                 | Dashboard, Analytics, Goal Tracking     |
| Reduce                | Recommendations, Carbon Savings Tracker |
| Personalized Insights | Recommendation Engine                   |
| Future Planning       | Carbon Twin Engine                      |
| Practical Usability   | Sustainability Dashboard                |
| Real-World Impact     | Measurable Carbon Savings               |

---

# 🌱 Vision

CarbonWise aims to transform sustainability from a complex environmental concept into simple daily actions that anyone can understand, track, and improve.

By combining carbon intelligence, personalized recommendations, carbon savings tracking, and predictive forecasting, CarbonWise helps users build sustainable habits and make better environmental decisions.
