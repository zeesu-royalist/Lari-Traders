'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Star,
  Clock,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Film,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4';

interface SlideData {
  id: number;
  title: string;
  trackBadge: string;
  duration: string;
  releaseDate: string;
  description: string;
  tagline: string;
  genre: string;
  specs: string[];
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    title: 'Order Flow & Institutional Liquidity Dynamics',
    trackBadge: 'Core Framework',
    duration: '12 Hours',
    releaseDate: 'Curriculum 2026',
    description:
      'Deconstruct how institutional market makers position, absorb liquidity, and distribute inventory across global equities and foreign exchange.',
    tagline: 'Understanding auction market theory and order-book depth transforms price action from random noise into actionable structure.',
    genre: 'Market Structure',
    specs: ['Order Flow Analytics', 'Volume Profiling', 'Liquidity Pools', 'Execution Playbooks'],
  },
  {
    id: 2,
    title: 'Quantitative Risk Management & Asymmetric Sizing',
    trackBadge: 'Capital Protection',
    duration: '8 Hours',
    releaseDate: 'Core Requirement',
    description:
      'Master mathematical position sizing, portfolio Value-at-Risk (VaR), correlation controls, and disciplined drawdown mitigation.',
    tagline: 'Longevity in trading is governed by your loss management, not the frequency of your winning trades.',
    genre: 'Risk Architecture',
    specs: ['VaR Modeling', 'Max Drawdown Caps', 'Asymmetric Payoffs', 'Correlation Matrices'],
  },
  {
    id: 3,
    title: 'Multi-Asset Macro Regimes & Cross-Market Flows',
    trackBadge: 'Advanced Strategy',
    duration: '10 Hours',
    releaseDate: 'Advanced Series',
    description:
      'Analyze central bank balance sheets, interest rate differentials, yield curve shifts, and their transmission into equity and commodity trends.',
    tagline: 'Macro drivers provide the prevailing market wind; technical structure dictates the precise risk-defined entry.',
    genre: 'Macro Economics',
    specs: ['Central Bank Policy', 'Yield Curve Analysis', 'Intermarket Flow', 'COT Positioning'],
  },
];

export default function CinematicSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentSlide = SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="cinematic-showcase"
      className="relative w-full bg-[#080A19] py-16 sm:py-24 px-5 sm:px-8 md:px-[82px] overflow-hidden"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Section Header styled consistently with Hero's typographic rhythm */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-[700px]">
            <div className="inline-flex items-center gap-2 h-[36px] px-4 rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] border border-white/10 text-white/90 text-[13px] sm:text-[14px] font-[450] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span>Institutional Masterclasses & Market Analysis</span>
            </div>

            <h2 className="text-white text-[32px] sm:text-[48px] md:text-[56px] font-normal leading-[1.0] mb-4 tracking-[-0.02em]">
              Master real-world trading
            </h2>

            <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[580px]">
              In-depth case studies, real-time market breakdowns, and systematic risk management frameworks taught by veteran market analysts.
            </p>
          </div>

          {/* Quick links & full-screen mode */}
          <div className="flex items-center gap-3">
            <Link
              href="/cinema"
              className="h-[46px] sm:h-[51px] px-5 sm:px-[24px] rounded-[12px] border border-white/30 text-white text-[14px] sm:text-[15px] font-[450] flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Full Masterclass Theater</span>
            </Link>
          </div>
        </div>

        {/* Majestic Cinematic Frame Container (Styling mirrors Hero's RevenueCard glass aesthetic) */}
        <div className="relative w-full min-h-[580px] lg:min-h-[660px] rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-10 md:p-14">
          {/* Background Video inside frame */}
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          />

          {/* Bottom Blur Overlay (no gradient darkening, only blur via CSS mask) */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none backdrop-blur-xl mask-bottom-blur"
            style={{
              WebkitBackdropFilter: 'blur(24px)',
              backdropFilter: 'blur(24px)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
              maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
            }}
          />

          {/* Top Bar within the Showcase Frame */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            {/* Slide Index Pills */}
            <div className="h-[42px] px-4 flex items-center gap-2 bg-[rgba(10,7,7,0.45)] backdrop-blur-[17px] rounded-[11px] border border-white/10 text-xs sm:text-sm font-[450] text-white/90">
              <Film className="w-3.5 h-3.5 text-white/70" />
              <span>Masterclass {currentIndex + 1} of {SLIDES.length}</span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">{currentSlide.genre}</span>
            </div>

            {/* Audio Toggle button */}
            <button
              onClick={toggleSound}
              className="h-[42px] px-4 flex items-center gap-2 bg-[rgba(10,7,7,0.45)] backdrop-blur-[17px] rounded-[11px] border border-white/10 text-xs sm:text-sm font-[450] text-white/90 hover:bg-white/10 transition-colors"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-white/70" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline text-emerald-300">Sound On</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Hero Content within Frame */}
          <div className="relative z-10 w-full pt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              {/* Left Column: Metadata, Title, Description, Buttons */}
              <div className="max-w-2xl">
                {/* Metadata Row */}
                <div
                  className="animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-4 text-xs sm:text-sm font-[450]"
                  style={{ animationDelay: '300ms' }}
                >
                  <div className="flex items-center gap-1.5 text-white">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                    <span>{currentSlide.trackBadge}</span>
                  </div>

                  <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />

                  <div className="flex items-center gap-1.5 text-white/80">
                    <Clock className="w-4 h-4 text-white/70" />
                    <span>{currentSlide.duration}</span>
                  </div>

                  <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />

                  <div className="flex items-center gap-1.5 text-white/80">
                    <Calendar className="w-4 h-4 text-white/70" />
                    <span>{currentSlide.releaseDate}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="animate-blur-fade-up text-white text-[28px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-normal leading-[1.0] mb-3 tracking-[-0.03em]"
                  style={{ animationDelay: '400ms' }}
                >
                  {currentSlide.title}
                </h3>

                {/* Description */}
                <p
                  className="animate-blur-fade-up text-white/80 text-[15px] sm:text-[17px] md:text-[19px] font-[450] leading-[1.35] max-w-xl mb-6"
                  style={{ animationDelay: '500ms' }}
                >
                  {currentSlide.description}
                </p>

                {/* Action Buttons styled like Hero.tsx */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* "Watch Now" button - matches Hero primary demo button */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="animate-blur-fade-up h-[46px] sm:h-[51px] px-6 sm:px-[27px] bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] flex items-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98]"
                    style={{ animationDelay: '600ms' }}
                  >
                    <Play className="w-[18px] h-[18px] fill-[#0A0707] text-[#0A0707]" />
                    <span>Watch Preview</span>
                  </button>

                  {/* "Learn More" button - matches Hero secondary button */}
                  <button
                    onClick={() => setIsLearnMoreOpen(true)}
                    className="animate-blur-fade-up h-[46px] sm:h-[51px] px-6 sm:px-[27px] rounded-[12px] border border-white text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] hover:bg-white/10 transition-colors active:scale-[0.98]"
                    style={{ animationDelay: '700ms' }}
                  >
                    View Syllabus
                  </button>
                </div>
              </div>

              {/* Right Column: Navigation Pills */}
              <div className="flex items-center gap-2 sm:gap-3 md:self-end">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="animate-blur-fade-up h-[46px] sm:h-[51px] px-4 sm:px-5 bg-[rgba(10,7,7,0.4)] backdrop-blur-[17px] rounded-[12px] border border-white/10 text-white text-[14px] font-[450] flex items-center gap-2 hover:bg-white/15 transition-all active:scale-[0.97]"
                  style={{ animationDelay: '800ms' }}
                  aria-label="Previous realm"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="animate-blur-fade-up h-[46px] sm:h-[51px] px-4 sm:px-5 bg-[rgba(10,7,7,0.4)] backdrop-blur-[17px] rounded-[12px] border border-white/10 text-white text-[14px] font-[450] flex items-center gap-2 hover:bg-white/15 transition-all active:scale-[0.97]"
                  style={{ animationDelay: '900ms' }}
                  aria-label="Next realm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal (Watch Now) */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080A19]/90 backdrop-blur-[24px] p-4 sm:p-8 animate-fade-scale">
          <div className="relative w-full max-w-5xl rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.7)] backdrop-blur-[30px] border border-white/15 p-5 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white text-[18px] sm:text-[22px] font-[450]">
                  {currentSlide.title}
                </p>
                <p className="text-white/70 text-xs sm:text-sm font-[450]">
                  {currentSlide.genre} • {currentSlide.duration}
                </p>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-10 h-10 rounded-[11px] bg-[rgba(10,7,7,0.4)] backdrop-blur-[17px] border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-[16px] overflow-hidden bg-black mb-4">
              <video
                src={VIDEO_URL}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-[450]">
              <div className="flex items-center gap-2">
                {currentSlide.specs.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-[6px] bg-white/10 text-white/90"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <Link
                href="/cinema"
                className="text-white/80 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Open in dedicated masterclass theater</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Learn More Modal */}
      {isLearnMoreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080A19]/90 backdrop-blur-[24px] p-4 sm:p-8 animate-fade-scale">
          <div className="relative w-full max-w-2xl rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.7)] backdrop-blur-[30px] border border-white/15 p-6 sm:p-10 shadow-2xl text-white">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/60 font-[450] block mb-1">
                  Masterclass Syllabus & Learning Objectives
                </span>
                <h3 className="text-2xl sm:text-3xl font-[450]">
                  {currentSlide.title}
                </h3>
              </div>
              <button
                onClick={() => setIsLearnMoreOpen(false)}
                className="w-10 h-10 rounded-[11px] bg-[rgba(10,7,7,0.4)] backdrop-blur-[17px] border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-white/80 italic text-sm sm:text-base mb-6 border-l-2 border-white/30 pl-4 font-[450]">
              &quot;{currentSlide.tagline}&quot;
            </p>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 font-[450]">
              {currentSlide.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {currentSlide.specs.map((spec) => (
                <div
                  key={spec}
                  className="rounded-[12px] bg-white/[0.04] border border-white/10 p-3 text-center flex flex-col items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span className="text-xs text-white/90 font-[450]">{spec}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setIsLearnMoreOpen(false);
                  setIsVideoModalOpen(true);
                }}
                className="h-[46px] px-6 bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] font-[450] flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Play className="w-4 h-4 fill-[#0A0707]" />
                Watch Preview
              </button>
              <button
                onClick={() => setIsLearnMoreOpen(false)}
                className="h-[46px] px-6 rounded-[12px] border border-white/30 text-white text-[14px] font-[450] hover:bg-white/10 transition-colors"
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
