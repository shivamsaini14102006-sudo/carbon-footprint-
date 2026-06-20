'use client';
import React from 'react';
import type { Recommendation, RecommendationPriority } from '@carbonwise/types';

const PRIORITY_STYLES: Record<RecommendationPriority, { badge: string; text: string }> = {
  HIGH: { badge: 'bg-red-400/20 text-red-400', text: 'High Impact' },
  MEDIUM: { badge: 'bg-orange-400/20 text-orange-400', text: 'Medium Impact' },
  LOW: { badge: 'bg-blue-400/20 text-blue-400', text: 'Low Impact' },
};

interface RecommendationCardProps {
  recommendation?: Recommendation;
  onAccept?: (id: string) => void;
  isLoading?: boolean;
}

const DEFAULT_REC: Recommendation = {
  id: 'rec_001',
  title: 'Switch to Public Transport',
  description: 'Replacing just two car trips weekly with public transport drastically lowers your primary emission hotspot.',
  targetCategory: 'TRANSPORTATION',
  priority: 'HIGH',
  difficulty: 'MEDIUM',
  estimatedSavings: 120,
};

export function RecommendationCard({
  recommendation = DEFAULT_REC,
  onAccept,
  isLoading = false,
}: RecommendationCardProps) {
  if (isLoading) {
    return (
      <div role="status" aria-label="Loading recommendation" className="glass rounded-[2rem] p-8 animate-pulse">
        <div className="h-4 w-20 bg-white/10 rounded mb-4" />
        <div className="h-6 w-full bg-white/10 rounded mb-2" />
        <div className="h-4 w-3/4 bg-white/10 rounded" />
      </div>
    );
  }

  const priorityStyle = PRIORITY_STYLES[recommendation.priority];

  return (
    <article
      aria-labelledby={`rec-title-${recommendation.id}`}
      className="glass rounded-[2rem] p-8 flex flex-col justify-between transition-micro relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`inline-block px-3 py-1 ${priorityStyle.badge} text-xs font-bold rounded-full`}>
            Top Insight
          </span>
          <span className={`inline-block px-2 py-1 ${priorityStyle.badge} text-xs rounded-full`}>
            {priorityStyle.text}
          </span>
          <span className="text-xs text-muted-foreground">
            Difficulty: {recommendation.difficulty}
          </span>
        </div>
        <h3 id={`rec-title-${recommendation.id}`} className="text-2xl font-heading font-bold text-foreground">
          {recommendation.title}
        </h3>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          {recommendation.description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Est. Savings</p>
          <p className="text-2xl font-black text-primary mt-1">
            {recommendation.estimatedSavings} kg <span className="text-sm font-normal">CO₂/yr</span>
          </p>
        </div>
        {onAccept && (
          <button
            onClick={() => onAccept(recommendation.id)}
            aria-label={`Accept goal: ${recommendation.title}`}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Accept Goal
          </button>
        )}
      </div>
    </article>
  );
}
