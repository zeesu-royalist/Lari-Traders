'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  Clock,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Menu,
  X,
  Volume2,
  VolumeX,
  ArrowLeft,
  Film,
} from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4';

const CINEMATIC_SLIDES = [
  {
    id: 1,
    title: 'Order Flow & Institutional Liquidity Dynamics',
    trackBadge: 'Core Framework',
    duration: '12 Hours',
    releaseDate: 'Curriculum 2026',
    description:
      'Deconstruct how institutional market makers position, absorb liquidity, and distribute inventory across global equities and foreign exchange.',
  },
  {
    id: 2,
    title: 'Quantitative Risk Management & Asymmetric Sizing',
    trackBadge: 'Capital Protection',
    duration: '8 Hours',
    releaseDate: 'Core Requirement',
    description:
      'Master mathematical position sizing, portfolio Value-at-Risk (VaR), correlation controls, and disciplined drawdown mitigation.',
  },
  {
    id: 3,
    title: 'Multi-Asset Macro Regimes & Cross-Market Flows',
    trackBadge: 'Advanced Strategy',
    duration: '10 Hours',
    releaseDate: 'Advanced Series',
    description:
      'Analyze central bank balance sheets, interest rate differentials, yield curve shifts, and their transmission into equity and commodity trends.',
  },
];

const NAV_LINKS = [
  "Core Curriculum",
  "Order Flow",
  "Risk Models",
  "Macro Series",
  "Trade Breakdowns",
];

export default function CinemaPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentSlide = CINEMATIC_SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CINEMATIC_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CINEMATIC_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-['Inter',sans-serif] flex flex-col justify-between">
      {/* BACKGROUND VIDEO: fixed behind everything at z-index 0 */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* BOTTOM BLUR OVERLAY (no gradient darkening, only blur) at z-index 1 */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none backdrop-blur-xl mask-bottom-blur"
        style={{
          WebkitBackdropFilter: 'blur(24px)',
          backdropFilter: 'blur(24px)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
        }}
      />

      {/* NAVBAR (z-index 50, relative positioned) */}
      <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
        {/* Left: Brand logo + back link */}
        <div
          className="animate-blur-fade-up flex items-center gap-4"
          style={{ animationDelay: '0ms' }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white liquid-glass rounded-full px-3.5 py-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lari Traders</span>
          </Link>

          <span className="text-xl sm:text-2xl font-bold tracking-wider text-white">
            MASTERCLASS THEATER
          </span>
        </div>

        {/* Center: Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link}
              href="#"
              className="animate-blur-fade-up text-sm text-white hover:text-gray-300 transition-colors"
              style={{ animationDelay: `${100 + idx * 50}ms` }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Search, Profile & Sound toggle */}
        <div className="flex items-center gap-3">
          {/* Sound toggle button */}
          <button
            onClick={toggleSound}
            className="animate-blur-fade-up liquid-glass rounded-full px-3.5 py-2 text-xs text-white/80 hover:text-white flex items-center gap-1.5 transition-colors"
            style={{ animationDelay: '300ms' }}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">Mute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline text-emerald-400">Audio</span>
              </>
            )}
          </button>

          {/* Search button */}
          <button
            className="animate-blur-fade-up hidden sm:flex items-center gap-2 rounded-full liquid-glass px-4 md:px-6 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            style={{ animationDelay: '350ms' }}
          >
            <Search className="w-[18px] h-[18px]" />
            <span>Search</span>
          </button>

          {/* User profile button */}
          <button
            className="animate-blur-fade-up hidden sm:flex items-center justify-center w-10 h-10 rounded-full liquid-glass text-white hover:bg-white/10 transition-colors"
            style={{ animationDelay: '400ms' }}
            aria-label="User profile"
          >
            <User className="w-[18px] h-[18px]" />
          </button>

          {/* Hamburger menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="animate-blur-fade-up lg:hidden flex items-center justify-center w-10 h-10 rounded-full liquid-glass text-white hover:bg-white/10 transition-colors"
            style={{ animationDelay: '350ms' }}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {isOpen ? (
                <X className="w-5 h-5 transition-all duration-500 rotate-180" />
              ) : (
                <Menu className="w-5 h-5 transition-all duration-500" />
              )}
            </div>
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden absolute top-[72px] left-4 right-4 z-40 bg-gray-900/95 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 shadow-2xl animate-fade-scale">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="py-3 px-3 rounded-lg text-white/90 hover:bg-gray-800/50 text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-3 sm:hidden">
              <button className="flex-1 py-2 rounded-full liquid-glass text-xs flex items-center justify-center gap-2">
                <Search className="w-4 h-4" /> Search
              </button>
              <button className="py-2 px-4 rounded-full liquid-glass text-xs flex items-center justify-center gap-2">
                <User className="w-4 h-4" /> Profile
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO CONTENT (bottom of viewport, z-index 10) */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          {/* Left side */}
          <div className="flex-1 max-w-2xl">
            {/* Metadata row */}
            <div
              className="animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm"
              style={{ animationDelay: '300ms' }}
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                <span className="font-medium text-white">{currentSlide.trackBadge}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/80">
                <Clock className="w-4 h-4" />
                <span>{currentSlide.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/80">
                <Calendar className="w-4 h-4" />
                <span>{currentSlide.releaseDate}</span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="animate-blur-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] mb-4 md:mb-6"
              style={{ animationDelay: '400ms' }}
            >
              {currentSlide.title}
            </h1>

            {/* Description */}
            <p
              className="animate-blur-fade-up text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl"
              style={{ animationDelay: '500ms' }}
            >
              {currentSlide.description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="animate-blur-fade-up bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors"
                style={{ animationDelay: '600ms' }}
              >
                <Play className="w-[18px] h-[18px] fill-black text-black" />
                <span>Watch Masterclass</span>
              </button>
              <Link
                href="/#pricing"
                className="animate-blur-fade-up rounded-full font-medium liquid-glass px-6 sm:px-8 py-2.5 sm:py-3 text-white hover:bg-white/10 transition-colors inline-flex items-center"
                style={{ animationDelay: '700ms' }}
              >
                Enroll in Program
              </Link>
            </div>
          </div>

          {/* Right side navigation arrows */}
          <div className="flex items-center gap-3 md:self-end">
            <button
              onClick={handlePrev}
              className="animate-blur-fade-up rounded-full liquid-glass px-4 sm:px-6 py-2.5 sm:py-3 text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              style={{ animationDelay: '800ms' }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
              <span className="hidden sm:inline text-sm">Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="animate-blur-fade-up rounded-full liquid-glass px-4 sm:px-6 py-2.5 sm:py-3 text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              style={{ animationDelay: '900ms' }}
            >
              <span className="hidden sm:inline text-sm">Next</span>
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8">
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/20 bg-black">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <video
                src={VIDEO_URL}
                className="w-full h-full object-cover"
                controls
                autoPlay
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
