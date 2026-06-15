'use client';
import React, { useState } from 'react';

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<'transport' | 'food' | 'energy' | 'shopping'>('transport');

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-heading font-black text-foreground">Carbon Calculator</h2>
        <p className="text-lg text-muted-foreground">Log your activities to instantly update your footprint score.</p>
      </header>

      {/* Tabs */}
      <div className="flex p-1 bg-white/5 dark:bg-black/20 rounded-2xl glass mx-auto w-full max-w-2xl overflow-hidden backdrop-blur-md">
        {['transport', 'food', 'energy', 'shopping'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${
              activeTab === tab 
                ? 'bg-primary text-white shadow-lg scale-[1.02]' 
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden transition-all duration-300 min-h-[400px]">
        {/* Ambient glow */}
        <div className="absolute w-64 h-64 bg-primary/10 blur-[100px] top-0 left-0 pointer-events-none" />

        {activeTab === 'transport' && (
          <div className="space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-500">
            <h3 className="text-2xl font-bold font-heading mb-8">Transportation Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Car Travel (km)</label>
                <input type="number" placeholder="e.g. 120" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Bus Travel (km)</label>
                <input type="number" placeholder="e.g. 30" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Flights (km)</label>
                <input type="number" placeholder="e.g. 800" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Bike/Walk (km)</label>
                <input type="number" placeholder="e.g. 15" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div className="space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-500">
            <h3 className="text-2xl font-bold font-heading mb-8">Food & Diet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Meat Meals (Weekly)</label>
                <input type="number" placeholder="e.g. 5" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Vegetarian Meals (Weekly)</label>
                <input type="number" placeholder="e.g. 10" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-12 flex justify-end relative z-10">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/30 transition-all active:scale-95 flex items-center gap-2">
            Calculate Footprint
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 7-7 7 7M12 19V5"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
