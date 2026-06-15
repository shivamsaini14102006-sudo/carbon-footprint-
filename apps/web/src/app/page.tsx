import React from 'react';

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-heading font-bold text-foreground">Welcome back, Rahul</h2>
          <p className="text-muted-foreground mt-1">Here is your sustainability snapshot for today.</p>
        </div>
        <button className="glass bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full font-semibold transition-micro">
          + Log Activity
        </button>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Carbon Score Widget */}
        <div className="glass rounded-[2rem] p-8 flex flex-col items-center justify-center relative overflow-hidden transition-micro group">
          <div className="absolute w-40 h-40 bg-primary/20 blur-3xl -top-10 -right-10 rounded-full group-hover:bg-primary/30 transition-colors" />
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 z-10">Carbon Score</h3>
          <div className="relative flex items-center justify-center z-10">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="80" className="stroke-white/10" strokeWidth="12" fill="none" />
              <circle cx="96" cy="96" r="80" className="stroke-primary" strokeWidth="12" fill="none" strokeDasharray="502" strokeDashoffset="160" strokeLinecap="round" />
            </svg>
            <div className="absolute text-5xl font-heading font-black text-foreground">68</div>
          </div>
          <div className="mt-6 flex flex-col items-center z-10">
            <span className="text-primary font-bold text-lg">Improving</span>
            <span className="text-sm text-green-400 mt-1 flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19V5M5 12l7-7 7 7"/></svg>
              8% from last month
            </span>
          </div>
        </div>

        {/* Hotspots Breakdown */}
        <div className="glass rounded-[2rem] p-8 md:col-span-2 relative overflow-hidden transition-micro">
          <h3 className="text-xl font-heading font-bold text-foreground mb-6">Emission Hotspots</h3>
          <div className="space-y-6 relative z-10">
            {/* Row 1 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">🚗 Transportation</span>
                <span className="text-sm font-bold">55% (99 kg)</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 rounded-full" style={{ width: '55%' }} />
              </div>
            </div>
            {/* Row 2 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">🍔 Food</span>
                <span className="text-sm font-bold">20% (36 kg)</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
            {/* Row 3 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">⚡ Energy</span>
                <span className="text-sm font-bold">15% (27 kg)</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
            {/* Row 4 */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">🛍️ Shopping</span>
                <span className="text-sm font-bold">10% (18 kg)</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recommendations & Twin Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Recommendation */}
        <div className="glass rounded-[2rem] p-8 flex flex-col justify-between transition-micro relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full mb-4">Top Insight</span>
            <h3 className="text-2xl font-heading font-bold text-foreground">Switch to Public Transport</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Replacing just two car trips weekly with public transport drastically lowers your primary emission hotspot.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between relative z-10">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Est. Savings</p>
              <p className="text-2xl font-black text-primary mt-1">120 kg <span className="text-sm">CO₂/yr</span></p>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold filter shadow-lg shadow-primary/30 transition-all active:scale-95">
              Accept Goal
            </button>
          </div>
        </div>

        {/* Carbon Twin Preview */}
        <div className="glass rounded-[2rem] p-8 border border-primary/30 flex flex-col justify-between transition-micro relative overflow-hidden group">
          <div className="absolute w-64 h-64 bg-primary/10 blur-3xl rounded-full -bottom-20 -right-20 animate-float" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                ✨
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Carbon Twin Forecast</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Based on your habits, if you achieve your new transportation goal, see how your twin looks by year's end:
            </p>
          </div>
          
          <div className="mt-8 flex justify-between items-center bg-black/40 rounded-2xl p-6 relative z-10">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current</p>
              <p className="text-xl font-bold mt-1 text-white">250 kg</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-sm text-primary font-bold">Predicted</p>
              <p className="text-2xl font-black text-primary mt-1">180 kg</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
