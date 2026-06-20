'use client';
import React, { useState } from 'react';
import { useCarbonStore } from '../../store/useCarbonStore';
import { useRecommendations } from '../../hooks/useRecommendations';
import { RecommendationCard } from '../../components/RecommendationCard';
import { CarbonScoreCard } from '../../components/CarbonScoreCard';

type TabKey = 'transport' | 'food' | 'energy' | 'shopping';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'transport', label: '🚗 Transport' },
  { key: 'food', label: '🍔 Food' },
  { key: 'energy', label: '⚡ Energy' },
  { key: 'shopping', label: '🛍️ Shopping' },
];

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<TabKey>('transport');
  
  // Zustand Store
  const store = useCarbonStore();
  const { recommendations, accept } = useRecommendations(store.result?.hotspot);

  const numInput = (label: string, field: Parameters<typeof store.setField>[0], unit: string, id: string) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-muted-foreground block">
        {label} <span className="text-xs text-muted-foreground/60">({unit})</span>
      </label>
      <input
        id={id}
        type="number"
        min={0}
        value={store[field] || ''}
        onChange={e => store.setField(field, parseFloat(e.target.value) || 0)}
        placeholder="0"
        aria-describedby={`${id}-desc`}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-heading font-black text-foreground">Carbon Calculator</h2>
        <p className="text-lg text-muted-foreground">Log your weekly activities to instantly update your footprint score.</p>
      </header>

      {/* Tab Navigation */}
      <div role="tablist" aria-label="Activity categories" className="flex p-1 bg-white/5 dark:bg-black/20 rounded-2xl glass mx-auto w-full max-w-2xl overflow-hidden backdrop-blur-md">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            id={`tab-${key}`}
            aria-selected={activeTab === key}
            aria-controls={`panel-${key}`}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              activeTab === key
                ? 'bg-primary text-white shadow-lg scale-[1.02]'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Form Panels */}
      <main id="calculator-main" className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden transition-all duration-300 min-h-[400px]">
        <div aria-hidden="true" className="absolute w-64 h-64 bg-primary/10 blur-[100px] top-0 left-0 pointer-events-none" />

        <div id="panel-transport" role="tabpanel" aria-labelledby="tab-transport" hidden={activeTab !== 'transport'}>
          <fieldset className="space-y-6 relative z-10 border-none p-0">
            <legend className="text-2xl font-bold font-heading mb-8">Transportation (Weekly)</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {numInput('Car Travel', 'carKm', 'km', 'car-km')}
              {numInput('Bus Travel', 'busKm', 'km', 'bus-km')}
              {numInput('Flights', 'flightKm', 'km', 'flight-km')}
              {numInput('Bike / Walk', 'bikeKm', 'km', 'bike-km')}
            </div>
          </fieldset>
        </div>

        <div id="panel-food" role="tabpanel" aria-labelledby="tab-food" hidden={activeTab !== 'food'}>
          <fieldset className="space-y-6 relative z-10 border-none p-0">
            <legend className="text-2xl font-bold font-heading mb-8">Food & Diet (Weekly)</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {numInput('Meat Meals', 'meatMeals', 'meals/week', 'meat-meals')}
              {numInput('Vegetarian Meals', 'vegMeals', 'meals/week', 'veg-meals')}
            </div>
          </fieldset>
        </div>

        <div id="panel-energy" role="tabpanel" aria-labelledby="tab-energy" hidden={activeTab !== 'energy'}>
          <fieldset className="space-y-6 relative z-10 border-none p-0">
            <legend className="text-2xl font-bold font-heading mb-8">Energy Use (Monthly)</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {numInput('Electricity', 'electricityKwh', 'kWh/month', 'electricity-kwh')}
            </div>
          </fieldset>
        </div>

        <div id="panel-shopping" role="tabpanel" aria-labelledby="tab-shopping" hidden={activeTab !== 'shopping'}>
          <fieldset className="space-y-6 relative z-10 border-none p-0">
            <legend className="text-2xl font-bold font-heading mb-8">Shopping (Monthly)</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {numInput('Clothing Items', 'clothingItems', 'items/month', 'clothing-items')}
            </div>
          </fieldset>
        </div>

        <div className="mt-12 flex justify-end relative z-10">
          <button
            onClick={() => store.calculate()}
            disabled={store.isLoading}
            aria-busy={store.isLoading}
            aria-label="Calculate your carbon footprint"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/30 transition-all active:scale-95 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-2"
          >
            {store.isLoading ? 'Calculating…' : 'Calculate Footprint'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m5 12 7-7 7 7M12 19V5" />
            </svg>
          </button>
        </div>
      </main>

      {/* Results Section */}
      {store.result && (
        <section aria-label="Calculation results" aria-live="polite" className="space-y-6">
          <h3 className="text-2xl font-heading font-bold text-foreground text-center">Your Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CarbonScoreCard score={store.result.carbonScore} totalEmission={Math.round(store.result.totalEmission)} trend={0} />
            <div className="glass rounded-[2rem] p-8 space-y-4">
              <h4 className="font-heading font-bold text-lg">Personalized Actions</h4>
              {recommendations.slice(0, 1).map(r => (
                <RecommendationCard key={r.id} recommendation={r} onAccept={accept} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
