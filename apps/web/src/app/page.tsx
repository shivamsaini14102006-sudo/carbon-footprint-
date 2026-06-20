import React from 'react';
import { CarbonScoreCard } from '../components/CarbonScoreCard';
import { HotspotCard } from '../components/HotspotCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { CarbonTwinCard } from '../components/CarbonTwinCard';
import { EmissionHistory } from '../components/EmissionHistory';
import { SavingsTracker } from '../components/SavingsTracker';
import { HabitStreak } from '../components/HabitStreak';
import { GoalCard } from '../components/GoalCard';

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

        {/* Row 1 — Score + Hotspots */}
        <section aria-label="Carbon overview" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CarbonScoreCard score={68} totalEmission={180} trend={8} />
          <HotspotCard
            breakdown={{ TRANSPORTATION: 99, FOOD: 36, ENERGY: 27, SHOPPING: 18 }}
            hotspot="TRANSPORTATION"
          />
        </section>

        {/* Row 2 — Savings + Streaks */}
        <section aria-label="Sustainability progress" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SavingsTracker totalSaved={120} annualGoal={500} equivalentTrees={6} />
          <HabitStreak
            streakDays={7}
            habitName="Sustainable Transport"
            weekStatus={[true, true, true, true, true, true, true]}
          />
        </section>

        {/* Row 3 — History Chart */}
        <section aria-label="Historical trends" className="mt-6">
          <EmissionHistory />
        </section>

        {/* Row 4 — Recommendation + Carbon Twin */}
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
          <CarbonTwinCard />
        </section>

        {/* Row 5 — Goals */}
        <section aria-label="Sustainability goals" className="mt-6">
          <GoalCard
            goal={{
              id: 'g1',
              userId: 'u1',
              title: 'Reduce Transportation Emissions by 20%',
              targetReduction: 20,
              currentProgress: 65,
              targetDate: '2026-12-31',
              status: 'ACTIVE',
              createdAt: '2026-01-01',
            }}
          />
        </section>
      </main>
    </div>
  );
}
