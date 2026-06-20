# API Contracts

## Base URL
```
http://localhost:3001/api/v1
```
All production routes are served over HTTPS.

---

## Auth Endpoints

### POST /auth/register
**Body:**
```json
{ "fullName": "string", "email": "string", "password": "string (min 8)" }
```
**Response 201:**
```json
{ "success": true, "message": "User registered successfully" }
```

### POST /auth/login
**Body:** `{ "email": "string", "password": "string" }`
**Response 200:**
```json
{
  "success": true,
  "data": { "accessToken": "jwt", "refreshToken": "jwt" }
}
```

### POST /auth/refresh
**Body:** `{ "refreshToken": "string" }`
**Response 200:** `{ "accessToken": "jwt" }`

### POST /auth/logout
**Response 200:** `{ "success": true }`

---

## Carbon Endpoints

### POST /carbon/calculate *(Auth Required)*
**Header:** `Authorization: Bearer <accessToken>`
**Body:**
```json
{
  "transportation": { "carKm": 0, "busKm": 0, "flightKm": 0, "bikeKm": 0 },
  "food": { "meatMeals": 0, "vegetarianMeals": 0 },
  "energy": { "electricityKwh": 0 },
  "shopping": { "clothingItems": 0 }
}
```
**Response 200:**
```json
{
  "success": true,
  "data": {
    "carbonScore": 68,
    "totalEmission": 180.5,
    "unit": "kgCO2e",
    "hotspot": "TRANSPORTATION",
    "breakdown": { "TRANSPORTATION": 99, "FOOD": 36, "ENERGY": 27, "SHOPPING": 18 }
  }
}
```

---

## Recommendations Endpoints

### POST /recommendations/generate *(Auth Required)*
**Body:** `{ "hotspot": "TRANSPORTATION" }`
**Response 200:** `{ "success": true, "data": [Recommendation[]] }`

### POST /recommendations/:id/accept *(Auth Required)*
**Response 200:** `{ "success": true }`

---

## Users Endpoints

### GET /users/profile *(Auth Required)*
**Response 200:** `{ "success": true, "data": { User } }`
