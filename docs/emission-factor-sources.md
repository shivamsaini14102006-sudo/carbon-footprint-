# Emission Factor Sources

CarbonWise uses peer-reviewed, government-published emission factors to calculate carbon footprints. Below is a complete reference of every factor used in our Carbon Intelligence Engine.

---

## Transportation

| Activity     | Factor (kg CO₂e) | Unit   | Source                                      |
|-------------|-------------------|--------|---------------------------------------------|
| Car Travel  | 0.192             | per km | DEFRA 2024 — Average passenger vehicle      |
| Bus Travel  | 0.089             | per km | DEFRA 2024 — Local bus, average occupancy    |
| Flight      | 0.255             | per km | ICAO Carbon Emissions Calculator             |
| Bike / Walk | 0.000             | per km | Zero direct emissions                        |

**References:**
- [UK DEFRA Greenhouse Gas Reporting Conversion Factors 2024](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2024)
- [ICAO Carbon Emissions Calculator Methodology](https://www.icao.int/environmental-protection/CarbonOffset/Pages/default.aspx)

---

## Food & Diet

| Activity         | Factor (kg CO₂e) | Unit     | Source                                              |
|-----------------|-------------------|----------|-----------------------------------------------------|
| Meat Meal       | 3.3               | per meal | Poore & Nemecek (2018), Science — Global food LCA   |
| Vegetarian Meal | 0.8               | per meal | Poore & Nemecek (2018), Science — Global food LCA   |

**References:**
- Poore, J. & Nemecek, T. (2018). *Reducing food's environmental impacts through producers and consumers.* Science, 360(6392), 987-992.
- [Our World in Data — Environmental Impacts of Food](https://ourworldindata.org/environmental-impacts-of-food)

---

## Energy

| Activity       | Factor (kg CO₂e) | Unit    | Source                                        |
|---------------|-------------------|---------|-----------------------------------------------|
| Electricity   | 0.500             | per kWh | EPA eGRID — US Average Grid Emission Factor   |

**References:**
- [US EPA eGRID Summary Tables](https://www.epa.gov/egrid/summary-data)
- [IEA Emission Factors Database](https://www.iea.org/data-and-statistics)

---

## Shopping & Consumer Goods

| Activity       | Factor (kg CO₂e) | Unit     | Source                                              |
|---------------|-------------------|----------|-----------------------------------------------------|
| Clothing Item | 15.0              | per item | WRAP UK — Valuing Our Clothes Report                 |

**References:**
- [WRAP — Valuing Our Clothes: The Cost of UK Fashion](https://wrap.org.uk/resources/report/valuing-our-clothes-cost-uk-fashion)
- [IPCC AR6 Working Group III — Chapter 5: Demand, Services and Social Aspects](https://www.ipcc.ch/report/ar6/wg3/)

---

## Normalization & Scoring

The CarbonWise scoring engine normalizes total weekly emissions against a baseline of **300 kg CO₂e** (representing average weekly personal emissions in developed countries). This baseline is derived from:

- **IPCC AR6 (2022):** Global average per-capita annual emissions ≈ 6.3 tonnes CO₂e → ~121 kg/week
- **EPA (2023):** US average per-capita annual emissions ≈ 15.5 tonnes CO₂e → ~298 kg/week

We use the higher US average as the normalization ceiling to ensure the scoring system differentiates meaningfully across high-emission lifestyles.

**Carbon Score Formula:**
```
normalized = (totalEmission / 300) × 100
carbonScore = max(0, round(100 - normalized))
```

A score of **100** indicates zero emissions. A score of **0** indicates emissions at or above the 300 kg/week threshold.

---

## Tree Equivalence Calculation

The SavingsTracker component converts CO₂ savings into "trees planted" equivalence using:

- **EPA Greenhouse Gas Equivalencies Calculator:** 1 mature tree absorbs approximately **22 kg CO₂ per year**.
- Source: [EPA GHG Equivalencies](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator)

---

## Data Quality & Updates

- All emission factors are updated annually when source agencies publish new reports.
- Factors represent **global or regional averages** and may vary based on local grid mix, vehicle efficiency, and dietary specifics.
- Future versions of CarbonWise will support **location-aware emission factors** for improved accuracy.
