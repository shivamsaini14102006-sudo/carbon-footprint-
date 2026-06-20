'use client';
import React from 'react';
import type { Goal, GoalStatus } from '@carbonwise/types';

const STATUS_META: Record<GoalStatus, { color: string; label: string }> = {
  ACTIVE: { color: 'text-green-400', label: 'Active' },
  COMPLETED: { color: 'text-primary', label: 'Completed ✓' },
  PAUSED: { color: 'text-orange-400', label: 'Paused' },
};

interface GoalCardProps {
  goal?: Goal;
  isLoading?: boolean;
}

const DEFAULT_GOAL: Goal = {
  id: 'goal_001',
  userId: 'demo',
  title: 'Reduce Transportation by 20%',
  targetReduction: 20,
  currentProgress: 12,
  targetDate: '2026-12-31',
  status: 'ACTIVE',
  createdAt: new Date().toISOString(),
};

export function GoalCard({ goal = DEFAULT_GOAL, isLoading = false }: GoalCardProps) {
  if (isLoading) {
    return (
      <div role="status" aria-label="Loading goal" className="glass rounded-[2rem] p-8 animate-pulse">
        <div className="h-5 w-48 bg-white/10 rounded mb-4" />
        <div className="h-3 w-full bg-white/10 rounded-full" />
      </div>
    );
  }

  const pct = Math.min(Math.round((goal.currentProgress / goal.targetReduction) * 100), 100);
  const statusMeta = STATUS_META[goal.status];
  const daysLeft = Math.max(0, Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / 86400000));

  return (
    <article
      aria-labelledby={`goal-title-${goal.id}`}
      className="glass rounded-[2rem] p-8 transition-micro"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 id={`goal-title-${goal.id}`} className="text-lg font-heading font-bold text-foreground">
          {goal.title}
        </h3>
        <span className={`text-xs font-bold ${statusMeta.color}`} aria-label={`Goal status: ${statusMeta.label}`}>
          {statusMeta.label}
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${pct}% of ${goal.targetReduction}% target`}
        className="mb-3"
      >
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{goal.currentProgress}% achieved</span>
          <span>Target: {goal.targetReduction}% reduction</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {pct}% complete · {daysLeft > 0 ? `${daysLeft} days remaining` : 'Deadline passed'}
        </p>
      </div>
    </article>
  );
}
