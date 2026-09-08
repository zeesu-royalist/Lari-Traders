'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Star, Sparkles, ArrowUpRight, Film, ExternalLink } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  category: 'Price Action' | 'Risk Management' | 'Macro Analysis' | 'Psychology';
  rating: string;
  duration: string;
  year: string;
  image: string;
  tag: string;
  synopsis: string;
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'm1',
    title: 'Liquidity Pools & Institutional Footprints',
    category: 'Price Action',
    rating: '4.9',
    duration: '1h 45m',
    year: '2026 Edition',
    image:
      'https://cdn.prod.website-files.com/649e7e19aca422fdfb636e26/69a1a3706406617f6b00514c_prime-hero.png',
    tag: 'Most Watched',
    synopsis:
      'Forensic breakdown of how order book imbalances, liquidity sweeps, and institutional accumulation manifest across global markets.',
  },
  {
    id: 'm2',
    title: 'The Systematic Risk Protocol',
    category: 'Risk Management',
    rating: '4.9',
    duration: '2h 10m',
    year: 'Core Framework',
    image:
      'https://www.worldfinance.com/wp-content/uploads/2024/06/A081_rt.jpg',
    tag: 'Essential',
    synopsis:
      'How professional desks calculate dynamic position sizing, manage portfolio beta, and enforce stop-loss rules to eliminate catastrophic drawdowns.',
  },
  {
    id: 'm3',
    title: 'Central Bank Policy & Rate Differentials',
    category: 'Macro Analysis',
    rating: '4.8',
    duration: '1h 55m',
    year: '2026 Updated',
    image:
      'https://www.investopedia.com/thmb/YFvGW7qTY3lUk-dSFrFXpRiARKc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TradingChanneGettyImages-155285322-a17995f7318f4d5db3a43d1de33261c2.jpg',
    tag: 'Macro Series',
    synopsis:
      'Deciphering Federal Reserve communications, sovereign bond yields, and inflation differentials to forecast high-conviction trends.',
  },
  {
    id: 'm4',
    title: 'Trader Psychology & Emotional Discipline',
    category: 'Psychology',
    rating: '4.9',
    duration: '1h 35m',
    year: 'Core Curriculum',
    image:
      'https://images.pexels.com/photos/38375328/pexels-photo-38375328/free-photo-of-financial-market-trading-screen-with-graphs-and-charts.jpeg?h=1000&w=1500&fit=crop',
    tag: 'Mental Mastery',
    synopsis:
      'Cognitive bias deconstruction, revenge trading prevention, and building unshakeable consistency through objective execution rules.',
  },
  {
    id: 'm5',
    title: 'Volume Profiling & Auction Market Theory',
    category: 'Price Action',
    rating: '4.8',
    duration: '2h 20m',
    year: 'Advanced Series',
    image:
      'https://img-cdn.publive.online/fit-in/853x480/filters:format(webp)/trade-brains/media/media_files/wp-content/uploads/2023/12/Top-7-Derivatives-Trading-Courses-Cover-Image.jpg',
    tag: 'Deep Dive',
    synopsis:
      'Analyzing Value Areas, Point of Control (POC), and composite volume distributions to identify asymmetric trade locations before market open.',
  },
  {
    id: 'm6',
    title: 'Multi-Timeframe Trend Confluence',
    category: 'Price Action',
    rating: '4.9',
    duration: '1h 50m',
    year: '2026 Edition',
    image:
      'https://www.klingenstein.com/wp-content/uploads/2023/09/11-21-2016-trading.png',
    tag: 'Top Rated',
    synopsis:
      'Aligning higher-timeframe macroeconomic direction with intraday technical triggers for maximum risk-to-reward trade executions.',
  },
];

const CATEGORIES = ['All', 'Price Action', 'Risk Management', 'Macro Analysis'] as const;

export default function CinematicCurations() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  const filteredItems =
    selectedCategory === 'All'
      ? MEDIA_ITEMS
      : MEDIA_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative w-full py-16 sm:py-24 px-5 sm:px-8 md:px-[82px] bg-[#080A19] text-white border-t border-white/[0.08]">
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-[700px]">
            <div className="inline-flex items-center gap-2 h-[36px] px-4 rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] border border-white/10 text-white/90 text-[13px] sm:text-[14px] font-[450] mb-4">
              <Film className="w-3.5 h-3.5 text-white/80" />
              <span>On-Demand Video Curriculum</span>
            </div>
            <h2 className="text-white text-[32px] sm:text-[48px] md:text-[56px] font-normal leading-[1.0] mb-4 tracking-[-0.02em]">
              Professional Trading Masterclasses
            </h2>
            <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[580px]">
              Structured video coursework, real-market replay breakdowns, and deep-dive technical tutorials curated for disciplined traders.
            </p>
          </div>

          {/* Category Filter Pills styled like Hero navigation */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`h-[42px] px-5 rounded-[11px] text-[13.5px] font-[450] transition-all ${
                  selectedCategory === category
                    ? 'bg-[#E9E9E9] text-[#0A0707]'
                    : 'bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] border border-white/10 text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid (styled with Hero's rounded-[24px] sm:rounded-[33px] cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-[24px] sm:rounded-[33px] overflow-hidden bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0C1A]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A19] via-[#080A19]/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-[8px] text-[11px] font-[450] bg-[rgba(10,7,7,0.6)] backdrop-blur-[12px] text-white/90 border border-white/10">
                    {item.tag}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-[8px] bg-[rgba(10,7,7,0.6)] backdrop-blur-[12px] border border-white/10 text-xs font-[450] text-white">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{item.rating}</span>
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-[14px] bg-white text-[#0A0707] flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-[#0A0707] translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-white/50 mb-2 font-[450]">
                  <span>{item.category}</span>
                  <span>{item.duration} • {item.year}</span>
                </div>
                <h3 className="text-[20px] font-[450] text-white mb-2 group-hover:text-white transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-white/70" />
                </h3>
                <p className="text-[14px] text-white/70 font-[450] line-clamp-2 leading-relaxed">
                  {item.synopsis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item preview modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080A19]/90 backdrop-blur-[24px] p-4 sm:p-8 animate-fade-scale">
          <div className="relative w-full max-w-xl rounded-[24px] sm:rounded-[33px] p-6 sm:p-8 bg-[rgba(17,16,15,0.7)] backdrop-blur-[30px] border border-white/15 shadow-2xl text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs text-white/60 uppercase tracking-widest font-[450] block mb-1">
                  {activeItem.category}
                </span>
                <h3 className="text-2xl font-[450] text-white">{activeItem.title}</h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="w-9 h-9 rounded-[10px] bg-[rgba(10,7,7,0.4)] border border-white/15 flex items-center justify-center text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-[450] text-white/70 mb-4">
              <span className="flex items-center gap-1 text-white">
                <Star className="w-3.5 h-3.5 fill-white text-white" />
                {activeItem.rating}/10
              </span>
              <span>•</span>
              <span>{activeItem.duration}</span>
              <span>•</span>
              <span>{activeItem.year}</span>
            </div>

            <p className="text-sm font-[450] text-white/80 mb-6 leading-relaxed">
              {activeItem.synopsis}
            </p>

            <div className="aspect-video w-full rounded-[16px] overflow-hidden mb-6 relative">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3">
                <a
                  href="#cinematic-showcase"
                  onClick={() => setActiveItem(null)}
                  className="h-[46px] px-6 rounded-[12px] bg-[#E9E9E9] text-[#0A0707] font-[450] text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Play className="w-4 h-4 fill-[#0A0707]" />
                  Preview in Showcase
                </a>
                <Link
                  href="/cinema"
                  onClick={() => setActiveItem(null)}
                  className="h-[46px] px-5 rounded-[12px] border border-white text-white font-[450] text-sm flex items-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Masterclass Theater
                </Link>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="h-[42px] px-6 rounded-[12px] border border-white/20 text-white/80 hover:text-white text-xs sm:text-sm font-[450]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
