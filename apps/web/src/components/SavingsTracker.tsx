'use client';
import React from 'react';

interface SavingsTrackerProps {
  totalSaved: number;       // kg CO₂ saved so far
  annualGoal: number;       // kg CO₂ annual target
  equivalentTrees: number;  // CO₂ equivalent in trees planted
}

export function SavingsTracker({
  totalSaved = 120,
  annualGoal = 500,
  equivalentTrees = 6,
}: SavingsTrackerProps) {
  const progressPct = Math.min(100, Math.round((totalSaved / annualGoal) * 100));

  return (
    <article
      aria-labelledby="savings-heading"
      className="glass rounded-[2rem] p-8 relative overflow-hidden transition-micro"
    >
      <div aria-hidden="true" className="absolute w-48 h-48 bg-green-500/10 blur-3xl rounded-full -top-10 -left-10" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xl" aria-hidden="true">
            🌱
          </div>
          <h3 id="savings-heading" className="text-xl font-heading font-bold text-foreground">
            Carbon Savings
          </h3>
        </div>

        <div className="text-center my-6" aria-live="polite">
          <p className="text-muted-foreground text-sm">You have saved</p>
          <p className="text-5xl font-black text-green-400 mt-2">
            {totalSaved} <span className="text-lg font-normal text-muted-foreground">kg CO₂</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            🌳 Equivalent to <strong className="text-green-400">{equivalentTrees} trees</strong> planted this year
          </p>
        </div>

        {/* Progress toward annual goal */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-muted-foreground font-semibold">Annual Goal Progress</span>
            <span className="text-xs text-primary font-bold">{progressPct}%</span>
          </div>
          <div
            className="h-4 w-full bg-white/10 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Annual savings progress: ${progressPct}%`}
          >
            <div
              className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {totalSaved} / {annualGoal} kg CO₂ — Keep going!
          </p>
        </div>
      </div>
    </article>
  );
}
