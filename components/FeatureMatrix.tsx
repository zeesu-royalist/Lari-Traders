'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Layers,
  Shield,
  CheckCircle,
  Activity,
} from 'lucide-react';

const METRICS = [
  { label: 'Curriculum Depth', value: '120+ Hrs', sub: 'Foundational to institutional execution' },
  { label: 'Risk Framework', value: '1:3+ R:R', sub: 'Asymmetric trade profiling' },
  { label: 'Market Briefings', value: 'Daily', sub: 'London & NY pre-market intelligence' },
  { label: 'Execution Rules', value: '100%', sub: 'Systematic discipline & zero emotion' },
];

const FEATURES = [
  {
    icon: Activity,
    title: 'Institutional Order Flow & Structure',
    description:
      'Master the underlying mechanics of market liquidity, fair value gaps, order blocks, and auction theory rather than relying on lagging indicators.',
    badge: 'Empirical Methodology',
  },
  {
    icon: Shield,
    title: 'Asymmetric Risk & Capital Protection',
    description:
      'Enforce dynamic position sizing, portfolio volatility limits, and maximum drawdown thresholds to preserve your capital before seeking returns.',
    badge: 'Capital Preservation',
  },
  {
    icon: Zap,
    title: 'Live Market Breakdowns & Trade Replays',
    description:
      'Analyze active market regimes in real-time with veteran analysts, dissecting trade invalidation levels, execution timing, and volume context.',
    badge: 'Daily Execution',
  },
];

export default function FeatureMatrix() {
  const [activeMetricTab, setActiveMetricTab] = useState(0);

  return (
    <section id="risk-philosophy" className="relative w-full py-16 sm:py-24 px-5 sm:px-8 md:px-[82px] bg-[#080A19] text-white border-t border-white/[0.08]">
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Section Heading styled like Hero */}
        <div className="max-w-[720px] mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 h-[36px] px-4 rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] border border-white/10 text-white/90 text-[13px] sm:text-[14px] font-[450] mb-4">
            <Activity className="w-3.5 h-3.5 text-white/80" />
            <span>Our Systematic Methodology</span>
          </div>
          <h2 className="text-white text-[32px] sm:text-[48px] md:text-[56px] font-normal leading-[1.0] mb-4 tracking-[-0.02em]">
           Research-led. Risk-aware. Reality-driven.
          </h2>
          <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[580px]">
            Lari Traders combines rigorous macroeconomic analysis, institutional order flow education, and strict risk parameters to develop competent, self-sufficient traders.
          </p>
        </div>

        {/* Metrics Row (styled identically to Hero RevenueCard) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {METRICS.map((m, idx) => (
            <div
              key={m.label}
              onClick={() => setActiveMetricTab(idx)}
              className={`p-6 sm:p-8 rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border cursor-pointer transition-all ${activeMetricTab === idx
                  ? 'border-white/40 bg-[rgba(17,16,15,0.55)]'
                  : 'border-white/10 hover:border-white/20'
                }`}
            >
              <p className="text-[12px] sm:text-[13px] font-[450] text-white/60 uppercase tracking-wider mb-2">
                {m.label}
              </p>
              <p className="text-[28px] sm:text-[40px] md:text-[46px] font-[450] leading-[1] text-white mb-2">
                {m.value}
              </p>
              <p className="text-[12px] sm:text-[14px] font-[450] text-white/70">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Features 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 sm:p-8 rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-[14px] bg-white/10 flex items-center justify-center mb-6 text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-[450] text-white mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] font-[450] text-white/70 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[12px] sm:text-[13px] text-white/80 font-[450]">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                  <span>{feat.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
