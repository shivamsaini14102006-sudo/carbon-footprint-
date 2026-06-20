'use client';
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const DATA = [
  { month: 'Jan', emissions: 240 },
  { month: 'Feb', emissions: 210 },
  { month: 'Mar', emissions: 225 },
  { month: 'Apr', emissions: 190 },
  { month: 'May', emissions: 180 },
  { month: 'Jun', emissions: 165 },
];

export function EmissionHistory() {
  return (
    <section 
      aria-labelledby="history-heading" 
      className="glass rounded-[2rem] p-8 md:col-span-3 transition-micro"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 id="history-heading" className="text-xl font-heading font-bold text-foreground">Emission Trends</h3>
          <p className="text-sm text-muted-foreground">Your carbon footprint history over the last 6 months</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-xs text-muted-foreground">kg CO₂e</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 15, 15, 0.9)', 
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: 'var(--primary)' }}
            />
            <Area 
              type="monotone" 
              dataKey="emissions" 
              stroke="var(--primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEmissions)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
