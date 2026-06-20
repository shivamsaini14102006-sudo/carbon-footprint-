'use client';
import React from 'react';
import type { CarbonBreakdown, ActivityCategory } from '@carbonwise/types';

const CATEGORY_META: Record<ActivityCategory, { emoji: string; color: string; label: string }> = {
  TRANSPORTATION: { emoji: '🚗', color: 'bg-red-400', label: 'Transportation' },
  FOOD: { emoji: '🍔', color: 'bg-orange-400', label: 'Food & Diet' },
  ENERGY: { emoji: '⚡', color: 'bg-primary', label: 'Energy Use' },
  SHOPPING: { emoji: '🛍️', color: 'bg-blue-400', label: 'Shopping' },
};

/** Actionable, human-readable insights explaining WHY each category matters and HOW to reduce it. */
const CATEGORY_INSIGHTS: Record<ActivityCategory, { why: string; action: string; saving: string }> = {
  TRANSPORTATION: {
    why: 'Transportation contributes the majority of personal carbon emissions due to fossil-fuel powered vehicles.',
    action: 'Replace just 2 weekly car trips with public transport or cycling.',
    saving: 'Estimated annual reduction: 120 kg CO₂',
  },
  FOOD: {
    why: 'Meat and dairy production requires intensive land, water, and energy resources, generating significant methane emissions.',
    action: 'Swap 3 meat meals per week with plant-based alternatives.',
    saving: 'Estimated annual reduction: 95 kg CO₂',
  },
  ENERGY: {
    why: 'Electricity generated from coal and natural gas is one of the largest sources of greenhouse gas emissions.',
    action: 'Switch to LED bulbs and reduce standby power consumption.',
    saving: 'Estimated annual reduction: 80 kg CO₂',
  },
  SHOPPING: {
    why: 'Fast fashion and consumer goods have a large carbon footprint from manufacturing, shipping, and disposal.',
    action: 'Buy second-hand or choose sustainable brands for 50% of purchases.',
    saving: 'Estimated annual reduction: 60 kg CO₂',
  },
};

interface HotspotCardProps {
  breakdown?: CarbonBreakdown;
  hotspot?: ActivityCategory | 'NONE';
  isLoading?: boolean;
}

const DEFAULT_BREAKDOWN: CarbonBreakdown = {
  TRANSPORTATION: 99,
  FOOD: 36,
  ENERGY: 27,
  SHOPPING: 18,
};

export function HotspotCard({
  breakdown = DEFAULT_BREAKDOWN,
  hotspot = 'TRANSPORTATION',
  isLoading = false,
}: HotspotCardProps) {
  const total = Object.values(breakdown).reduce((s, v) => s + v, 0) || 1;
  const sorted = (Object.entries(breakdown) as [ActivityCategory, number][]).sort((a, b) => b[1] - a[1]);

  if (isLoading) {
    return (
      <div role="status" aria-label="Loading emission hotspots" className="glass rounded-[2rem] p-8 md:col-span-2 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded mb-6" />
        {[1, 2, 3, 4].map(i => <div key={i} className="h-8 bg-white/10 rounded-full mb-4" />)}
      </div>
    );
  }

  return (
    <section
      aria-labelledby="hotspot-heading"
      className="glass rounded-[2rem] p-8 md:col-span-2 relative overflow-hidden transition-micro"
    >
      <h3 id="hotspot-heading" className="text-xl font-heading font-bold text-foreground mb-6">
        Emission Hotspots
        {hotspot !== 'NONE' && (
          <span className="ml-3 text-xs bg-red-400/20 text-red-400 px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
            {CATEGORY_META[hotspot]?.emoji} {CATEGORY_META[hotspot]?.label} is your top emitter
          </span>
        )}
      </h3>

      <ol className="space-y-5" aria-label="Carbon emission categories sorted by impact">
        {sorted.map(([cat, val]) => {
          const pct = Math.round((val / total) * 100);
          const meta = CATEGORY_META[cat];
          const insight = CATEGORY_INSIGHTS[cat];
          const isTopEmitter = cat === hotspot;
          return (
            <li key={cat}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2" aria-hidden="true">
                  {meta.emoji} {meta.label}
                </span>
                <span className="text-sm font-bold" aria-label={`${pct}% — ${val} kg CO₂e`}>
                  {pct}% ({val.toFixed(0)} kg)
                </span>
              </div>
              <div
                className="h-3 w-full bg-white/10 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${meta.label}: ${pct}%`}
              >
                <div
                  className={`h-full ${meta.color} rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {/* Actionable insight explaining WHY and HOW to reduce */}
              {isTopEmitter && (
                <div className="mt-3 p-4 bg-white/5 rounded-xl border border-white/10 space-y-1" role="note" aria-label={`Insight for ${meta.label}`}>
                  <p className="text-sm text-muted-foreground">{insight.why}</p>
                  <p className="text-sm text-primary font-semibold">💡 {insight.action}</p>
                  <p className="text-xs text-green-400 font-bold">🌱 {insight.saving}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
