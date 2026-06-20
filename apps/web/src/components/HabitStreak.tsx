'use client';
import React from 'react';

interface HabitStreakProps {
  streakDays: number;
  habitName: string;
  weekStatus: boolean[]; // 7 booleans, Mon→Sun
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function HabitStreak({
  streakDays = 7,
  habitName = 'Sustainable Transport',
  weekStatus = [true, true, true, true, true, true, true],
}: HabitStreakProps) {
  return (
    <article
      aria-labelledby="streak-heading"
      className="glass rounded-[2rem] p-8 relative overflow-hidden transition-micro"
    >
      <div aria-hidden="true" className="absolute w-48 h-48 bg-orange-500/10 blur-3xl rounded-full -bottom-10 -right-10" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl" aria-hidden="true">
            🔥
          </div>
          <h3 id="streak-heading" className="text-xl font-heading font-bold text-foreground">
            Habit Streak
          </h3>
        </div>

        <div className="text-center my-6" aria-live="polite">
          <p className="text-5xl font-black text-orange-400">
            {streakDays} <span className="text-lg font-normal text-muted-foreground">days</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            🔥 <strong className="text-orange-400">{habitName}</strong> streak
          </p>
        </div>

        {/* Weekly visual indicator */}
        <div className="flex justify-center gap-3 mt-6" role="list" aria-label="Weekly streak status">
          {weekStatus.map((completed, idx) => (
            <div
              key={idx}
              role="listitem"
              aria-label={`${DAY_LABELS[idx]}: ${completed ? 'completed' : 'missed'}`}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  completed
                    ? 'bg-gradient-to-br from-orange-400 to-primary text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white/5 text-muted-foreground border border-white/10'
                }`}
              >
                {completed ? '✓' : DAY_LABELS[idx]}
              </div>
              <span className="text-[10px] text-muted-foreground">{DAY_LABELS[idx]}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Keep it up! Consistency is the key to lasting carbon reduction.
        </p>
      </div>
    </article>
  );
}
