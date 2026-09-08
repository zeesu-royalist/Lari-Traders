'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  Filter,
  RefreshCw,
} from 'lucide-react';

type TimeframeKey = '1D' | '1W' | '1M' | '1Y' | 'ALL';

interface TimeframeData {
  volume: string;
  volumeCents: string;
  change: string;
  isPositive: boolean;
  comparison: string;
  labels: string[];
  bars: number[];
  fillRate: number;
  signalAccuracy: number;
  varMargin: number;
  poolDepth: number;
}

const TIMEFRAME_CONFIG: Record<TimeframeKey, TimeframeData> = {
  '1D': {
    volume: '$48,920,400',
    volumeCents: '.00',
    change: '+32.4%',
    isPositive: true,
    comparison: 'vs. yesterday ($36.8M)',
    labels: ['09:30', '11:00', '12:30', '14:00', '16:00'],
    bars: [
      23, 40, 53, 40, 33, 14, 7, 17, 75, 65,
      88, 75, 65, 47, 33, 88, 14, 18, 22, 28,
      95, 65, 79, 37, 18, 40, 22, 26, 62, 47,
      92, 72,
    ],
    fillRate: 99.4,
    signalAccuracy: 78.4,
    varMargin: 94.2,
    poolDepth: 86.7,
  },
  '1W': {
    volume: '$342,180,500',
    volumeCents: '.50',
    change: '+18.7%',
    isPositive: true,
    comparison: 'vs. last week ($288.2M)',
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bars: [
      45, 58, 62, 70, 55, 48, 65, 80, 92, 85,
      78, 90, 84, 72, 60, 88, 76, 82, 89, 94,
      91, 85, 79, 88, 92, 84, 78, 86, 95, 90,
      87, 93,
    ],
    fillRate: 99.6,
    signalAccuracy: 81.2,
    varMargin: 95.0,
    poolDepth: 89.4,
  },
  '1M': {
    volume: '$1,420,890,000',
    volumeCents: '.00',
    change: '+44.2%',
    isPositive: true,
    comparison: 'vs. last month ($985.4M)',
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    bars: [
      32, 44, 50, 68, 60, 52, 74, 86, 78, 82,
      90, 85, 88, 79, 84, 91, 95, 89, 92, 86,
      94, 98, 91, 87, 93, 89, 96, 92, 99, 95,
      93, 97,
    ],
    fillRate: 99.7,
    signalAccuracy: 83.5,
    varMargin: 95.8,
    poolDepth: 91.2,
  },
  '1Y': {
    volume: '$18,650,200,000',
    volumeCents: '.00',
    change: '+128.5%',
    isPositive: true,
    comparison: 'vs. FY2025 ($8.16B)',
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'YTD'],
    bars: [
      20, 28, 35, 42, 48, 55, 60, 68, 72, 78,
      82, 80, 85, 89, 91, 88, 92, 94, 90, 93,
      95, 97, 94, 96, 98, 95, 97, 99, 96, 98,
      99, 100,
    ],
    fillRate: 99.8,
    signalAccuracy: 85.1,
    varMargin: 96.5,
    poolDepth: 93.8,
  },
  'ALL': {
    volume: '$54,820,000,000',
    volumeCents: '.00',
    change: '+384.2%',
    isPositive: true,
    comparison: 'Lifetime cleared volume',
    labels: ['2022', '2023', '2024', '2025', '2026'],
    bars: [
      12, 18, 22, 29, 36, 42, 48, 54, 60, 66,
      70, 75, 78, 82, 85, 88, 90, 92, 91, 94,
      95, 96, 94, 97, 98, 96, 98, 99, 98, 99,
      100, 100,
    ],
    fillRate: 99.9,
    signalAccuracy: 86.8,
    varMargin: 97.4,
    poolDepth: 95.5,
  },
};

const ASSET_ALLOCATION = [
  { id: 'alpha', name: 'Core Trend & Equities', value: 42, amount: '$104.3M', color: '#38bdf8', change: '+32.4%' },
  { id: 'mesh', name: 'Fixed Income & Cash Reserves', value: 28, amount: '$69.5M', color: '#818cf8', change: '+18.2%' },
  { id: 'yield', name: 'Tactical Commodities (Gold/Oil)', value: 18, amount: '$44.7M', color: '#34d399', change: '+9.4%' },
  { id: 'hedge', name: 'Systematic Hedging Reserves', value: 12, amount: '$29.8M', color: 'rgba(255,255,255,0.3)', change: '+5.1%' },
];

interface Ticker {
  id: string;
  pair: string;
  price: string;
  cents: string;
  change: string;
  isUp: boolean;
}

const TICKER_BY_TIMEFRAME: Record<TimeframeKey, Ticker[]> = {
  '1D': [
    { id: 'BTC',  pair: 'BTC / USD',  price: '$89,420', cents: '.00', change: '+32.4%', isUp: true },
    { id: 'ETH',  pair: 'ETH / USD',  price: '$3,840',  cents: '.00', change: '+24.8%', isUp: true },
    { id: 'SOL',  pair: 'SOL / USD',  price: '$198',    cents: '.50', change: '+41.2%', isUp: true },
    { id: 'NVDA', pair: 'NVDA / USD', price: '$134',    cents: '.80', change: '+18.5%', isUp: true },
    { id: 'EUR',  pair: 'EUR / USD',  price: '1.08',    cents: '42',  change: '+2.1%',  isUp: true },
    { id: 'GOLD', pair: 'GOLD (XAU)', price: '$2,682',  cents: '.00', change: '+14.7%', isUp: true },
  ],
  '1W': [
    { id: 'BTC',  pair: 'BTC / USD',  price: '$91,250', cents: '.00', change: '+18.7%', isUp: true },
    { id: 'ETH',  pair: 'ETH / USD',  price: '$3,960',  cents: '.00', change: '+14.2%', isUp: true },
    { id: 'SOL',  pair: 'SOL / USD',  price: '$204',    cents: '.30', change: '+22.5%', isUp: true },
    { id: 'NVDA', pair: 'NVDA / USD', price: '$138',    cents: '.40', change: '+9.8%',  isUp: true },
    { id: 'EUR',  pair: 'EUR / USD',  price: '1.09',    cents: '15',  change: '+1.4%',  isUp: true },
    { id: 'GOLD', pair: 'GOLD (XAU)', price: '$2,695',  cents: '.00', change: '+7.3%',  isUp: true },
  ],
  '1M': [
    { id: 'BTC',  pair: 'BTC / USD',  price: '$94,800', cents: '.00', change: '+44.2%', isUp: true },
    { id: 'ETH',  pair: 'ETH / USD',  price: '$4,120',  cents: '.00', change: '+31.6%', isUp: true },
    { id: 'SOL',  pair: 'SOL / USD',  price: '$215',    cents: '.80', change: '+53.8%', isUp: true },
    { id: 'NVDA', pair: 'NVDA / USD', price: '$142',    cents: '.60', change: '+24.1%', isUp: true },
    { id: 'EUR',  pair: 'EUR / USD',  price: '1.09',    cents: '80',  change: '+3.6%',  isUp: true },
    { id: 'GOLD', pair: 'GOLD (XAU)', price: '$2,740',  cents: '.00', change: '+19.2%', isUp: true },
  ],
  '1Y': [
    { id: 'BTC',  pair: 'BTC / USD',  price: '$108,500', cents: '.00', change: '+128.5%', isUp: true },
    { id: 'ETH',  pair: 'ETH / USD',  price: '$5,280',   cents: '.00', change: '+87.4%',  isUp: true },
    { id: 'SOL',  pair: 'SOL / USD',  price: '$298',     cents: '.00', change: '+142.6%', isUp: true },
    { id: 'NVDA', pair: 'NVDA / USD', price: '$168',     cents: '.20', change: '+64.3%',  isUp: true },
    { id: 'EUR',  pair: 'EUR / USD',  price: '1.11',     cents: '40',  change: '+8.2%',   isUp: true },
    { id: 'GOLD', pair: 'GOLD (XAU)', price: '$3,040',   cents: '.00', change: '+43.8%',  isUp: true },
  ],
  'ALL': [
    { id: 'BTC',  pair: 'BTC / USD',  price: '$108,500', cents: '.00', change: '+384.2%', isUp: true },
    { id: 'ETH',  pair: 'ETH / USD',  price: '$5,280',   cents: '.00', change: '+218.6%', isUp: true },
    { id: 'SOL',  pair: 'SOL / USD',  price: '$298',     cents: '.00', change: '+512.4%', isUp: true },
    { id: 'NVDA', pair: 'NVDA / USD', price: '$168',     cents: '.20', change: '+196.8%', isUp: true },
    { id: 'EUR',  pair: 'EUR / USD',  price: '1.11',     cents: '40',  change: '+14.5%',  isUp: true },
    { id: 'GOLD', pair: 'GOLD (XAU)', price: '$3,040',   cents: '.00', change: '+124.3%', isUp: true },
  ],
};

interface OrderItem {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  amount: string;
  price: string;
  time: string;
}

const INITIAL_ORDERS: OrderItem[] = [
  { id: 'TX-9481', pair: 'BTC/USD', type: 'BUY', amount: '14.5 BTC', price: '$89,410.00', time: 'Just now' },
  { id: 'TX-9480', pair: 'NVDA', type: 'BUY', amount: '2,500 Shares', price: '$134.75', time: '1 min ago' },
  { id: 'TX-9479', pair: 'ETH/USD', type: 'SELL', amount: '120.0 ETH', price: '$3,838.50', time: '3 mins ago' },
  { id: 'TX-9478', pair: 'SOL/USD', type: 'BUY', amount: '850.0 SOL', price: '$198.60', time: '5 mins ago' },
  { id: 'TX-9477', pair: 'GOLD/USD', type: 'BUY', amount: '45.0 Oz', price: '$2,681.20', time: '8 mins ago' },
  { id: 'TX-9476', pair: 'EUR/USD', type: 'SELL', amount: '500,000 EUR', price: '1.0840', time: '12 mins ago' },
];

export default function TradingDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeKey>('1D');
  const [selectedTicker, setSelectedTicker] = useState<string>('BTC');
  const [orderFilter, setOrderFilter] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  const [hoveredBar, setHoveredBar] = useState<{ index: number; height: number } | null>(null);
  const [hoveredAsset, setHoveredAsset] = useState<typeof ASSET_ALLOCATION[0] | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [rebalanceMessage, setRebalanceMessage] = useState<string | null>(null);

  const currentData = TIMEFRAME_CONFIG[selectedTimeframe];
  const currentTickers = TICKER_BY_TIMEFRAME[selectedTimeframe];
  const maxBarHeight = Math.max(...currentData.bars);

  // Trigger simulated live ticker pulses periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Gentle shift in recent orders
      setOrders((prev) => {
        const sides: ('BUY' | 'SELL')[] = ['BUY', 'SELL'];
        const randomSide = sides[Math.floor(Math.random() * sides.length)];
        const pairs = ['BTC/USD', 'ETH/USD', 'SOL/USD', 'NVDA', 'GOLD/USD'];
        const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
        const newId = `TX-${Math.floor(9482 + Math.random() * 100)}`;
        
        const newOrder: OrderItem = {
          id: newId,
          pair: randomPair,
          type: randomSide,
          amount: randomPair.includes('BTC') ? `${(Math.random() * 8 + 1).toFixed(2)} BTC` : `${(Math.random() * 2000 + 100).toFixed(0)} Units`,
          price: randomPair.includes('BTC') ? `$89,${Math.floor(350 + Math.random() * 150)}.00` : `$${(Math.random() * 250 + 50).toFixed(2)}`,
          time: 'Just now',
        };

        return [newOrder, ...prev.slice(0, 4)];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleRebalance = () => {
    setIsRebalancing(true);
    setRebalanceMessage('Re-weighting educational model portfolio across defensive and cyclical asset classes...');
    setTimeout(() => {
      setIsRebalancing(false);
      setRebalanceMessage('✓ Multi-asset educational portfolio model re-weighted across defensive and cyclical asset classes.');
      setTimeout(() => setRebalanceMessage(null), 4000);
    }, 1200);
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'ALL') return true;
    return o.type === orderFilter;
  });

  return (
    <section id="trading-analytics" className="relative w-full py-20 sm:py-28 px-5 sm:px-8 md:px-[82px] bg-[#080A19] text-white border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background glow matching site lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-cyan-500/[0.07] via-indigo-500/[0.06] to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto">
        {/* Header matching Hero typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 h-[36px] px-4 rounded-[11px] bg-[rgba(10,7,7,0.45)] backdrop-blur-[17px] border border-white/10 text-white/90 text-[13px] sm:text-[14px] font-[450] mb-4 shadow-sm">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Institutional Trading & Risk Intelligence</span>
            </div>

            <h2 className="text-white text-[36px] sm:text-[52px] md:text-[64px] font-normal leading-[0.95] mb-5 tracking-[-0.02em]">
              Real-time market analytics
            </h2>

            <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[580px]">
              Comprehensive market telemetry, liquidity profiling, and portfolio risk parameters designed for disciplined trading desks and professional learners.
            </p>
          </div>

          {/* Timeframe selector pill: 1D, 1W, 1M, 1Y, ALL */}
          <div className="h-[52px] p-[3px] bg-[rgba(10,7,7,0.55)] border border-white/10 rounded-[13px] backdrop-blur-[17px] flex items-center gap-[4px] self-start lg:self-end shadow-lg">
            {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`h-[46px] px-4 sm:px-5 rounded-[11px] text-[13px] sm:text-[14px] font-[450] leading-[14px] transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-[#E9E9E9] text-[#0A0707] shadow-md font-medium scale-[1.02]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Live Ticker Cards (Interactive Asset Selector) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {currentTickers.map((t) => {
            const isSelected = selectedTicker === t.id;
            return (
              <div
                key={t.pair}
                onClick={() => setSelectedTicker(t.id)}
                className={`p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] backdrop-blur-[20px] border transition-all cursor-pointer shadow-lg group hover:-translate-y-1 ${
                  isSelected
                    ? 'bg-[rgba(16,25,48,0.75)] border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                    : 'bg-[rgba(17,16,15,0.45)] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[12px] sm:text-[13px] font-[450] transition-colors ${
                    isSelected ? 'text-cyan-300' : 'text-white/60 group-hover:text-white/85'
                  }`}>
                    {t.pair}
                  </span>
                  <span className="px-[6px] py-[2px] bg-emerald-500/15 border border-emerald-400/25 rounded-[6px] text-emerald-400 text-[11px] font-[450] leading-none">
                    {t.change}
                  </span>
                </div>
                <p className="font-[450] leading-none">
                  <span className="text-white text-[20px] sm:text-[24px]">{t.price}</span>
                  <span className="text-white/25 text-[14px] sm:text-[16px]">{t.cents}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Main 2-Column Trading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8">
          {/* Card 1: Revenue & Order Flow Bar Chart (Exact replica of Hero RevenueCard design + Interactive) */}
          <div className="lg:col-span-7 rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[24px] border border-white/10 hover:border-white/20 p-6 sm:p-8 pb-6 flex flex-col justify-between shadow-2xl transition-all relative">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px]">
                  Order Flow & Cleared Volume
                </p>
                <span className="px-2.5 py-1 bg-white/10 border border-white/15 rounded-full text-white/80 text-[11px] font-[450]">
                  Window: {selectedTimeframe}
                </span>
              </div>

              <p className="mb-2 sm:mb-3">
                <span className="text-white text-[28px] sm:text-[46px] font-[450] leading-[1]">
                  {currentData.volume}
                </span>
                <span className="text-white/20 text-[28px] sm:text-[46px] font-[450] leading-[1]">
                  {currentData.volumeCents}
                </span>
              </p>

              <div className="flex items-center gap-[10px] mb-6 sm:mb-8">
                <span className="px-[6px] py-[7px] bg-white/20 rounded-[6px] text-white text-[12px] sm:text-[14px] font-[450] leading-[14px]">
                  {currentData.change}
                </span>
                <span className="text-white/80 text-[12px] sm:text-[14px] font-[450] leading-[14px] opacity-70">
                  {currentData.comparison}
                </span>
              </div>

              {/* Bar Chart Built with Hero's Exact Stems, Interactive Hover Tooltips */}
              <div className="relative mb-6">
                {hoveredBar && (
                  <div
                    className="absolute -top-10 -translate-x-1/2 px-2.5 py-1 rounded-[6px] bg-[#0A0707]/90 border border-white/20 text-xs font-[450] text-white shadow-xl pointer-events-none z-20 whitespace-nowrap"
                    style={{
                      left: `${((hoveredBar.index + 0.5) / currentData.bars.length) * 100}%`,
                    }}
                  >
                    Vol: ${(hoveredBar.height * 0.48).toFixed(1)}M
                  </div>
                )}

                <div className="flex items-end gap-[2px] sm:gap-[3px] h-[130px] sm:h-[160px]">
                  {currentData.bars.map((h, i) => {
                    const isProjected = i >= currentData.bars.length - 5;
                    const heightPercent = (h / maxBarHeight) * 100;
                    const isHovered = hoveredBar?.index === i;

                    return (
                      <div
                        key={i}
                        onMouseEnter={() => setHoveredBar({ index: i, height: h })}
                        onMouseLeave={() => setHoveredBar(null)}
                        className={`flex-1 rounded-[0.5px] origin-bottom transition-all duration-300 cursor-pointer ${
                          isHovered ? 'scale-y-[1.05] shadow-[0_0_12px_#38bdf8]' : ''
                        }`}
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: isHovered
                            ? '#38bdf8'
                            : isProjected
                            ? 'rgba(255,255,255,0.15)'
                            : 'white',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Vertical grid lines identical to Hero RevenueCard */}
                <div className="absolute inset-0 pointer-events-none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 w-px bg-white/10"
                      style={{ left: `${((i + 1) / 5) * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Timestamps for selected timeframe */}
              <div className="flex justify-between">
                {currentData.labels.map((label, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-[11px] font-[450] leading-[10px] text-white/70"
                    style={{ opacity: i >= 3 ? 0.45 : 1 }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60 font-[450]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Live Order Book Feed ({selectedTicker})
              </span>
              <span className="text-white/90">Institutional Liquidity Routing Active</span>
            </div>
          </div>

          {/* Card 2: Portfolio Donut Allocation (Interactive Rings & Rebalancing) */}
          <div className="lg:col-span-5 rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[24px] border border-white/10 hover:border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px]">
                  Portfolio Capital Allocation
                </p>
                <button
                  onClick={handleRebalance}
                  disabled={isRebalancing}
                  className="px-[10px] py-[4px] bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 rounded-[8px] text-white/90 text-[12px] font-[450] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isRebalancing ? 'animate-spin text-cyan-400' : ''}`} />
                  <span>{isRebalancing ? 'Rebalancing...' : 'Rebalance'}</span>
                </button>
              </div>

              {rebalanceMessage && (
                <div className="mb-3 px-3 py-1.5 rounded-[8px] bg-cyan-500/15 border border-cyan-400/30 text-xs text-cyan-300 animate-fade-down">
                  {rebalanceMessage}
                </div>
              )}

              <p className="mb-4">
                <span className="text-white text-[28px] sm:text-[36px] font-[450] leading-[1]">
                  $248,500,000
                </span>
                <span className="text-white/20 text-[28px] sm:text-[36px] font-[450] leading-[1]">
                  .00
                </span>
              </p>

              {/* Custom Circular Ring Display with coordinated accents */}
              <div className="relative my-6 flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" className="rotate-[-90deg]">
                  {/* Segment 1 (42% Cyan) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={hoveredAsset?.id === 'alpha' ? 22 : 18}
                    strokeDasharray="211 502"
                    strokeDashoffset="0"
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredAsset(ASSET_ALLOCATION[0])}
                    onMouseLeave={() => setHoveredAsset(null)}
                  />
                  {/* Segment 2 (28% Indigo) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth={hoveredAsset?.id === 'mesh' ? 22 : 18}
                    strokeDasharray="140 502"
                    strokeDashoffset="-215"
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredAsset(ASSET_ALLOCATION[1])}
                    onMouseLeave={() => setHoveredAsset(null)}
                  />
                  {/* Segment 3 (18% Emerald) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth={hoveredAsset?.id === 'yield' ? 22 : 18}
                    strokeDasharray="90 502"
                    strokeDashoffset="-360"
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredAsset(ASSET_ALLOCATION[2])}
                    onMouseLeave={() => setHoveredAsset(null)}
                  />
                  {/* Segment 4 (12% Frosted White) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={hoveredAsset?.id === 'hedge' ? 22 : 18}
                    strokeDasharray="60 502"
                    strokeDashoffset="-455"
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredAsset(ASSET_ALLOCATION[3])}
                    onMouseLeave={() => setHoveredAsset(null)}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2">
                  <span className="text-white text-[20px] font-[450] leading-tight">
                    {hoveredAsset ? `${hoveredAsset.value}%` : '100%'}
                  </span>
                  <span className="text-white/60 text-[11px] font-[450] mt-0.5 max-w-[110px] truncate">
                    {hoveredAsset ? hoveredAsset.name.split(' ')[0] : 'Allocated'}
                  </span>
                  {hoveredAsset && (
                    <span className="text-cyan-300 text-[10px] font-mono mt-0.5">
                      {hoveredAsset.amount}
                    </span>
                  )}
                </div>
              </div>

              {/* Legend List matching Hero typography */}
              <div className="space-y-2.5">
                {ASSET_ALLOCATION.map((asset) => {
                  const isHovered = hoveredAsset?.id === asset.id;
                  return (
                    <div
                      key={asset.id}
                      onMouseEnter={() => setHoveredAsset(asset)}
                      onMouseLeave={() => setHoveredAsset(null)}
                      className={`flex items-center justify-between text-xs sm:text-[13px] font-[450] p-2.5 rounded-[12px] border transition-all cursor-pointer ${
                        isHovered
                          ? 'bg-white/[0.08] border-white/25 scale-[1.01]'
                          : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shadow-sm"
                          style={{ backgroundColor: asset.color }}
                        />
                        <span className="text-white/85">{asset.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">{asset.value}%</span>
                        <span className="px-[6px] py-[2px] bg-white/10 rounded-[5px] text-white/90 text-[11px]">
                          {asset.change}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Progress Gauges (Dynamic for Selected Timeframe) and Executed Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Progress Bars (Execution Efficiency) */}
          <div className="lg:col-span-6 rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[24px] border border-white/10 hover:border-white/20 p-6 sm:p-8 shadow-2xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px]">
                  Execution Quality & Risk Buffer
                </p>
                <span className="px-[8px] py-[3px] bg-white/10 border border-white/15 rounded-[7px] text-white/80 text-[12px] font-[450]">
                  Timeframe: {selectedTimeframe}
                </span>
              </div>

              <div className="space-y-6">
                {/* Progress 1 */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-[450] mb-2">
                    <span className="text-white/80">Trade Execution Fill Quality</span>
                    <span className="text-cyan-400 font-medium">{currentData.fillRate}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all duration-700"
                      style={{ width: `${currentData.fillRate}%` }}
                    />
                  </div>
                </div>

                {/* Progress 2 */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-[450] mb-2">
                    <span className="text-white/80">Model Backtest Conformance</span>
                    <span className="text-indigo-400 font-medium">{currentData.signalAccuracy}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-700"
                      style={{ width: `${currentData.signalAccuracy}%` }}
                    />
                  </div>
                </div>

                {/* Progress 3 */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-[450] mb-2">
                    <span className="text-white/80">Value at Risk (VaR) Margin Buffer</span>
                    <span className="text-emerald-400 font-medium">{currentData.varMargin}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700"
                      style={{ width: `${currentData.varMargin}%` }}
                    />
                  </div>
                </div>

                {/* Progress 4 */}
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-[450] mb-2">
                    <span className="text-white/80">Multi-Venue Liquidity Depth</span>
                    <span className="text-white/90 font-medium">{currentData.poolDepth}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-white to-white/60 transition-all duration-700"
                      style={{ width: `${currentData.poolDepth}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-[450]">
              <span>Stress-tested across 50,000+ historical market regimes (Backtest Analysis)</span>
              <span className="text-white/90 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Audited Risk Models
              </span>
            </div>
          </div>

          {/* Executed Orders Table with Interactive Filter and Real-Time Feeds */}
          <div className="lg:col-span-6 rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[24px] border border-white/10 hover:border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px]">
                    Recent Institutional Orders
                  </p>
                  <span className="text-white/50 text-xs">Simulated live execution stream</span>
                </div>

                {/* Order Filter Pills */}
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-[9px]">
                  {(['ALL', 'BUY', 'SELL'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setOrderFilter(filter)}
                      className={`px-2.5 py-1 rounded-[6px] text-xs font-[450] transition-all cursor-pointer ${
                        orderFilter === filter
                          ? 'bg-white text-[#0A0707] font-medium shadow-sm'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-[13px] font-[450]">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 pb-2">
                      <th className="py-2.5">Order ID</th>
                      <th className="py-2.5">Pair</th>
                      <th className="py-2.5">Side</th>
                      <th className="py-2.5">Quantity</th>
                      <th className="py-2.5">Price</th>
                      <th className="py-2.5 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/[0.04] transition-colors">
                        <td className="py-3 text-white/40 font-mono text-[11px]">{order.id}</td>
                        <td className="py-3 text-white font-medium">{order.pair}</td>
                        <td className="py-3">
                          <span
                            className={`px-[7px] py-[2px] rounded-[5px] text-[11px] font-[450] ${
                              order.type === 'BUY'
                                ? 'bg-emerald-500/15 border border-emerald-400/30 text-emerald-300'
                                : 'bg-rose-500/15 border border-rose-400/30 text-rose-300'
                            }`}
                          >
                            {order.type}
                          </span>
                        </td>
                        <td className="py-3 text-white/80">{order.amount}</td>
                        <td className="py-3 text-white font-medium">{order.price}</td>
                        <td className="py-3 text-right text-white/50">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-[450]">
              <span>Clearing via Tier-1 Prime Brokerages & Regulated Custodians</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="h-[36px] px-4 bg-[#E9E9E9] rounded-[9px] text-[#0A0707] text-[13px] font-[450] hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INSTITUTIONAL DEMO BOOKING MODAL                                          */}
      {/* ========================================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080A19]/85 backdrop-blur-[24px] p-4 sm:p-6 animate-fade-scale">
          <div className="relative w-full max-w-md rounded-[24px] sm:rounded-[33px] p-6 sm:p-8 bg-[rgba(17,16,15,0.92)] backdrop-blur-[30px] border border-cyan-400/35 shadow-2xl text-white">
            <button
              onClick={() => {
                setIsDemoModalOpen(false);
                setDemoSubmitted(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {demoSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-4 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Consultation Requested</h3>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  Our trading education and market research desk will reach out within 24 hours with your program syllabus and overview.
                </p>
                <button
                  onClick={() => {
                    setIsDemoModalOpen(false);
                    setDemoSubmitted(false);
                  }}
                  className="h-[44px] px-6 rounded-full bg-[#E9E9E9] text-[#0A0707] text-sm font-medium hover:opacity-90 transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-[450] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Program & Advisory Consultation</span>
                </div>
                <h3 className="text-2xl font-semibold mb-1 text-white">Schedule Educational Consultation</h3>
                <p className="text-xs text-white/60 mb-6 leading-relaxed">
                  Discuss our structured trading curriculum, live market briefings, or custom institutional research requirements.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDemoSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs text-white/70 mb-1.5 font-[450]">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full h-11 px-4 rounded-[12px] bg-white/[0.05] border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 mb-1.5 font-[450]">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      className="w-full h-11 px-4 rounded-[12px] bg-white/[0.05] border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 mb-1.5 font-[450]">Trading Experience / Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Intermediate Trader or Trading Desk"
                      className="w-full h-11 px-4 rounded-[12px] bg-white/[0.05] border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 mt-2 rounded-[12px] bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Consultation & Syllabus</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
