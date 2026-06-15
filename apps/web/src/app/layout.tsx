import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'CarbonWise - Your Sustainability Intelligence',
  description: 'Understand, track, and reduce your carbon footprint with actionable insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-background`}>
        <div className="absolute top-0 w-full h-[500px] bg-gradient-premium pointer-events-none -z-10" />
        <nav className="glass w-full sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-float shadow-lg shadow-primary/30">
              <span className="text-white font-bold tracking-tighter">CW</span>
            </div>
            <h1 className="text-xl font-heading font-extrabold text-foreground tracking-tight">
              Carbon<span className="text-primary">Wise</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-semibold hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/calculator" className="text-sm font-semibold hover:text-primary transition-colors">Calculator</Link>
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center overflow-hidden transition-micro">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="User" />
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
