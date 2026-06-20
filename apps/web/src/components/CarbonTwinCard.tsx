'use client';
import React, { useState } from 'react';
import type { CarbonTwinScenario } from '@carbonwise/types';

const SCENARIOS: CarbonTwinScenario[] = [
  { scenarioName: 'Public Transport', currentEmission: 250, projectedEmission: 180, potentialSavings: 70 },
  { scenarioName: 'Vegetarian Diet', currentEmission: 250, projectedEmission: 195, potentialSavings: 55 },
  { scenarioName: 'Combined Plan', currentEmission: 250, projectedEmission: 130, potentialSavings: 120 },
];

interface CarbonTwinCardProps {
  scenarios?: CarbonTwinScenario[];
  isLoading?: boolean;
}

export function CarbonTwinCard({ scenarios = SCENARIOS, isLoading = false }: CarbonTwinCardProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scenario = scenarios[activeIdx];

  if (isLoading) {
    return (
      <div role="status" aria-label="Loading carbon twin forecast" className="glass rounded-[2rem] p-8 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded mb-4" />
        <div className="h-20 bg-white/10 rounded-2xl" />
      </div>
    );
  }

  const savingsPct = Math.round(((scenario.currentEmission - scenario.projectedEmission) / scenario.currentEmission) * 100);

  return (
    <article
      aria-labelledby="twin-heading"
      className="glass rounded-[2rem] p-8 border border-primary/30 flex flex-col justify-between transition-micro relative overflow-hidden group"
    >
      <div aria-hidden="true" className="absolute w-64 h-64 bg-primary/10 blur-3xl rounded-full -bottom-20 -right-20 animate-float" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center" aria-hidden="true">
            ✨
          </div>
          <h3 id="twin-heading" className="text-2xl font-heading font-bold text-foreground">
            Carbon Twin Forecast
          </h3>
        </div>

        {/* Scenario Selector Tabs */}
        <div role="tablist" aria-label="Select a lifestyle scenario" className="flex gap-2 mb-6 flex-wrap">
          {scenarios.map((s, idx) => (
            <button
              key={s.scenarioName}
              role="tab"
              id={`twin-tab-${idx}`}
              aria-selected={activeIdx === idx}
              aria-controls="twin-panel"
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                activeIdx === idx
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10'
              }`}
            >
              {s.scenarioName}
            </button>
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed">
          Switching to <strong className="text-primary">{scenario.scenarioName}</strong> could reduce your emissions by{' '}
          <strong className="text-primary">{savingsPct}%</strong> — saving{' '}
          <strong className="text-green-400">{scenario.potentialSavings} kg CO₂</strong> per year.
        </p>
      </div>

      {/* Comparison Panel */}
      <div
        id="twin-panel"
        role="tabpanel"
        aria-labelledby={`twin-tab-${activeIdx}`}
        className="mt-8 flex justify-between items-center bg-black/40 rounded-2xl p-6 relative z-10"
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Current</p>
          <p className="text-xl font-bold mt-1 text-white" aria-label={`Current emissions: ${scenario.currentEmission} kg CO2`}>
            {scenario.currentEmission} kg
          </p>
        </div>
        <div className="flex flex-col items-center gap-1" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-xs text-green-400 font-bold">-{savingsPct}%</span>
        </div>
        <div className="text-center">
          <p className="text-sm text-primary font-bold">Predicted</p>
          <p className="text-2xl font-black text-primary mt-1" aria-label={`Predicted emissions: ${scenario.projectedEmission} kg CO2`}>
            {scenario.projectedEmission} kg
          </p>
        </div>
      </div>
    </article>
  );
}
