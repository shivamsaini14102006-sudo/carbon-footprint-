import React from 'react';
import { CarbonScoreCard } from '../components/CarbonScoreCard';
import { HotspotCard } from '../components/HotspotCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { CarbonTwinCard } from '../components/CarbonTwinCard';
import { EmissionHistory } from '../components/EmissionHistory';

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-[100] font-semibold"
      >
        Skip to main content
      </a>

      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-heading font-bold text-foreground">Welcome back, Rahul 👋</h2>
          <p className="text-muted-foreground mt-1">Here is your sustainability snapshot for today.</p>
        </div>
        <button
          aria-label="Log a new activity"
          className="glass bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full font-semibold transition-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          + Log Activity
        </button>
      </header>

      {/* Main Dashboard Content */}
      <main id="main-content">
        {/* Top Row — Score + Hotspots */}
        <section aria-label="Carbon overview" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CarbonScoreCard score={68} totalEmission={180} trend={8} />
          <HotspotCard
            breakdown={{ TRANSPORTATION: 99, FOOD: 36, ENERGY: 27, SHOPPING: 18 }}
            hotspot="TRANSPORTATION"
          />
        </section>

        {/* Middle Row — History Chart */}
        <section aria-label="Historical trends" className="mt-6">
          <EmissionHistory />
        </section>

        {/* Bottom Row — Recommendation + Carbon Twin */}
        <section aria-label="Insights and forecasts" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecommendationCard
            recommendation={{
              id: 'rec_001',
              title: 'Switch to Public Transport',
              description: 'Replacing just two car trips weekly with public transport drastically lowers your primary emission hotspot.',
              targetCategory: 'TRANSPORTATION',
              priority: 'HIGH',
              difficulty: 'MEDIUM',
              estimatedSavings: 120,
            }}
          />
          <CarbonTwinCard
            scenario={{
              scenarioName: 'Transport Goal',
              currentEmission: 250,
              projectedEmission: 180,
              potentialSavings: 70,
            }}
          />
        </section>
      </main>
    </div>
  );
}
