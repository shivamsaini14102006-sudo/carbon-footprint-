'use client';
import React from 'react';
import type { CarbonCalculationResult } from '@carbonwise/types';

interface CarbonScoreCardProps {
  score?: number;
  totalEmission?: number;
  trend?: number; // positive = improving (e.g. 8 = 8% better)
  isLoading?: boolean;
}

export function CarbonScoreCard({
  score = 68,
  totalEmission = 180,
  trend = 8,
  isLoading = false,
}: CarbonScoreCardProps) {
  const circumference = 2 * Math.PI * 80; // r=80
  const dashOffset = circumference - (score / 100) * circumference;

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Loading carbon score"
        className="glass rounded-[2rem] p-8 flex flex-col items-center justify-center animate-pulse"
      >
        <div className="w-48 h-48 rounded-full bg-white/10" />
        <div className="mt-4 h-4 w-24 rounded bg-white/10" />
      </div>
    );
  }

  const isImproving = trend > 0;

  return (
    <article
      aria-label={`Your carbon score is ${score} out of 100`}
      className="glass rounded-[2rem] p-8 flex flex-col items-center justify-center relative overflow-hidden transition-micro group"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute w-40 h-40 bg-primary/20 blur-3xl -top-10 -right-10 rounded-full group-hover:bg-primary/30 transition-colors"
      />

      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 z-10">
        Carbon Score
      </h3>

      <div className="relative flex items-center justify-center z-10" role="img" aria-label={`Score gauge: ${score}/100`}>
        <svg className="w-48 h-48 transform -rotate-90" aria-hidden="true">
          <circle cx="96" cy="96" r="80" className="stroke-white/10" strokeWidth="12" fill="none" />
          <circle
            cx="96" cy="96" r="80"
            className="stroke-primary transition-all duration-700"
            strokeWidth="12" fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-5xl font-heading font-black text-foreground" aria-hidden="true">
          {score}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center z-10">
        <span className="text-primary font-bold text-lg">
          {isImproving ? 'Improving' : 'Needs attention'}
        </span>
        <span
          className={`text-sm mt-1 flex items-center gap-1 ${isImproving ? 'text-green-400' : 'text-red-400'}`}
          aria-label={`${Math.abs(trend)}% ${isImproving ? 'better' : 'worse'} than last month`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {isImproving
              ? <path d="m12 19V5M5 12l7-7 7 7" />
              : <path d="m12 5v14M5 12l7 7 7-7" />
            }
          </svg>
          {Math.abs(trend)}% from last month
        </span>
        <p className="text-xs text-muted-foreground mt-2">
          Total: {totalEmission} kg CO₂e
        </p>
      </div>
    </article>
  );
}
