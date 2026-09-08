'use client';

import React, { useState, useRef } from 'react';
import {
  Check,
  Sparkles,
  X,
  ArrowRight,
  Copy,
  CheckCheck,
  QrCode,
  Smartphone,
  ShieldCheck,
  MessageCircle,
  Maximize2,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: string;
  priceYearly: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PLANS: PricingPlan[] = [
  {
    id: 'foundation',
    name: 'Market Foundation',
    priceMonthly: 'Free',
    priceYearly: 'Free',
    period: '',
    description: 'Essential market literacy, introductory risk principles, and weekly public economic briefings.',
    features: [
      'Core Market Basics Course (15+ Lessons)',
      'Weekly Macroeconomic Calendar Briefing',
      'Fundamental Technical Analysis Primer',
      'Interactive Risk-to-Reward Calculator Tool',
      'Access to Community Discussion Channels',
    ],
  },
  {
    id: 'pro',
    name: 'Professional Trader',
    priceMonthly: '₹2499/m',
    priceYearly: '₹4000/m',
    period: '/m',
    description: 'Comprehensive curriculum for serious traders seeking structured mentorship, daily analysis, and risk models.',
    features: [
      'Institutional Order Flow & Price Action Curriculum',
      'Daily Pre-Market Playbook & Liquidity Heatmaps',
      'Weekly Live Charting Sessions & Market Breakdowns',
      'Proprietary Trading Journal & Risk Analytics Tool',
      'Direct Q&A with Senior Market Instructors',
    ],
    popular: true,
  },
  {
    id: 'institutional',
    name: 'Institutional Desk',
    priceMonthly: '₹9999/m',
    priceYearly: '₹10K/m',
    period: '/m',
    description: 'Advanced quantitative strategies, custom risk frameworks, and direct advisory for funds and prop traders.',
    features: [
      'All Professional Tier Curriculum & Tools',
      'Institutional Macro Strategy & Central Bank Reports',
      'Custom Systematic Model Backtesting Frameworks',
      '1-on-1 Monthly Strategy Review with Senior Analyst',
      'Priority Direct Desk Support & Private Channel Access',
    ],
  },
];

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';

const PAYMENT_NUMBER = '+91 91405 77713';
const PAYMENT_NUMBER_CLEAN = '9140577713';
const SCREENSHOT_NUMBER = '+91 6386757012';
const SCREENSHOT_NUMBER_CLEAN = '916386757012';
const QR_IMAGE_SRC = '/qr-payment.jpg';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isQrZoomed, setIsQrZoomed] = useState(false);
  const [copiedPayment, setCopiedPayment] = useState(false);
  const [copiedScreenshot, setCopiedScreenshot] = useState(false);

  // Smooth mouse tracking for ambient cursor lighting
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const copyToClipboard = (text: string, type: 'payment' | 'screenshot') => {
    navigator.clipboard.writeText(text);
    if (type === 'payment') {
      setCopiedPayment(true);
      setTimeout(() => setCopiedPayment(false), 2200);
    } else {
      setCopiedScreenshot(true);
      setTimeout(() => setCopiedScreenshot(false), 2200);
    }
  };

  const whatsappLink = (planName?: string) => {
    const text = planName
      ? `Hello Lari Traders Team, I want to enroll in the ${planName} plan. I have completed the payment to +91 91405 77713. Here is my payment screenshot for verification.`
      : `Hello Lari Traders Team, I have completed the payment to +91 91405 77713. Here is my payment screenshot for enrollment verification.`;
    return `https://wa.me/${SCREENSHOT_NUMBER_CLEAN}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="pricing"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-[82px] bg-[#080A19] border-t border-white/[0.08] overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* CRISP CINEMATIC VIDEO BACKGROUND (Constrained height to preserve 1080p quality) */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 top-0 h-[920px] sm:h-[1050px] lg:h-[1150px] z-0 overflow-hidden pointer-events-none bg-[#080A19]">
        {/* The Exact Video playing clean, sharp and crisp at native 16:9 ratio */}
        <video
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-top sm:object-center opacity-55 transition-opacity duration-700"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            filter: 'contrast(1.08) brightness(0.92)',
          }}
        />

        {/* Top natural fade into #080A19 */}
        <div
          className="absolute inset-x-0 top-0 h-44 z-[1]"
          style={{
            background:
              'linear-gradient(to bottom, #080A19 0%, rgba(8, 10, 25, 0.85) 40%, rgba(8, 10, 25, 0.2) 75%, transparent 100%)',
          }}
        />

        {/* Bottom seamless fade into #080A19 */}
        <div
          className="absolute inset-x-0 bottom-0 h-72 sm:h-96 z-[1]"
          style={{
            background:
              'linear-gradient(to top, #080A19 0%, rgba(8, 10, 25, 0.98) 45%, rgba(8, 10, 25, 0.5) 75%, transparent 100%)',
          }}
        />

        {/* Soft lateral vignette to frame the center video and blend cleanly with page edges */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 35%, rgba(8, 10, 25, 0.65) 75%, #080A19 100%)',
          }}
        />

        {/* Soft subtle cursor-following ambient glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-25 transition-all duration-700 ease-out z-[2]"
          style={{
            background:
              'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(14, 165, 233, 0.1) 45%, transparent 70%)',
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        {/* ========================================================================= */}
        {/* TOP TOGGLE PILL (Monthly / Yearly)                                        */}
        {/* ========================================================================= */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center p-1 rounded-full bg-[rgba(10,7,7,0.55)] backdrop-blur-xl border border-white/10 shadow-lg">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-[450] transition-all ${!isYearly
                  ? 'bg-white text-black shadow-md font-medium'
                  : 'text-white/70 hover:text-white'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-[450] transition-all flex items-center gap-1.5 ${isYearly
                  ? 'bg-white text-black shadow-md font-medium'
                  : 'text-white/70 hover:text-white'
                }`}
            >
              <span>Yearly</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-cyan-400/20 text-cyan-300 font-semibold">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GIANT GLOWING "Pricing" TITLE & "Lari Traders" BRAND BADGE                */}
        {/* ========================================================================= */}
        <div className="relative flex items-baseline justify-center mb-6 sm:mb-10 select-none">
          <h2
            className="text-[68px] sm:text-[115px] md:text-[155px] lg:text-[190px] font-bold tracking-tight text-center leading-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(224, 242, 254, 0.98) 0%, rgba(94, 185, 230, 0.8) 45%, rgba(14, 60, 95, 0.15) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 50px rgba(56, 189, 248, 0.35))',
            }}
          >
            Pricing
          </h2>

          {/* "Lari Traders" badge on top-right of "Pricing" title */}
          <span className="absolute top-2 sm:top-6 right-6 sm:right-24 md:right-36 lg:right-48 text-white/90 text-sm sm:text-lg md:text-xl font-medium tracking-wide flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
            <span>Lari Traders</span>
          </span>
        </div>

        {/* ========================================================================= */}
        {/* THREE PRICING CARDS (Free, Standard, Pro)                                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2 mb-16 sm:mb-24">
          {PLANS.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`group relative rounded-[24px] sm:rounded-[33px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2.5 ${plan.popular
                    ? 'bg-[rgba(16,25,48,0.65)] backdrop-blur-[30px] border border-cyan-400/45 shadow-[0_20px_55px_rgba(6,182,212,0.18)] hover:border-cyan-400/70'
                    : 'bg-[rgba(17,16,15,0.5)] backdrop-blur-[24px] border border-white/10 shadow-2xl hover:border-white/30'
                  }`}
                style={{
                  boxShadow: plan.popular
                    ? '0 0 40px rgba(56, 189, 248, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                    : 'inset 0 1px 1px rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Subtle top card glow highlight */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div>
                  {/* Plan Name */}
                  <p className="text-[15px] font-[450] text-white/70 mb-1">
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-3">
                    <h3 className="text-[38px] sm:text-[46px] font-semibold text-white tracking-tight leading-none">
                      {price}
                    </h3>
                  </div>

                  {/* Subtitle Description */}
                  <p className="text-[13px] sm:text-[14px] font-[450] text-white/65 leading-relaxed mb-8 min-h-[44px]">
                    {plan.description}
                  </p>

                  {/* Features List with Circle Checkmark */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-[13px] sm:text-[14px] font-[450] text-white/90"
                      >
                        <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:border-cyan-400/40 transition-colors">
                          <Check className="w-3 h-3 text-white stroke-[2.5]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Centered Pill "Choose Plan" Button */}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="w-full sm:w-auto min-w-[165px] h-[44px] px-8 rounded-full bg-white text-black font-semibold text-[13.5px] hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Select Program</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* DEDICATED QR SCANNER & DIRECT PAYMENT ENROLLMENT SECTION                  */}
        {/* ========================================================================= */}
        <div
          id="payment-details"
          className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[rgba(16,25,48,0.7)] to-[rgba(10,12,24,0.85)] border border-cyan-400/30 backdrop-blur-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden"
        >
          {/* Ambient background glows */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant QR Enrollment • UPI & Direct Payment</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Direct Payment & Instant Verification
            </h3>
            <p className="max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
              Scan our official QR code with any UPI app (Google Pay, PhonePe, Paytm) or pay directly to our official number, then share the screenshot on WhatsApp for immediate activation.
            </p>
          </div>

          {/* Content Grid: Left QR Scanner Box & Right Payment Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* LEFT: QR Code Scanner Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group p-5 sm:p-6 rounded-[24px] bg-[#0c1022] border border-cyan-400/40 shadow-[0_0_35px_rgba(6,182,212,0.2)] hover:border-cyan-400/80 transition-all duration-300">
                {/* Cyber Corner Decors */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm pointer-events-none" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm pointer-events-none" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm pointer-events-none" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br-sm pointer-events-none" />

                {/* QR Image Container */}
                <div
                  onClick={() => setIsQrZoomed(true)}
                  className="relative w-60 h-60 sm:w-68 sm:h-68 rounded-xl overflow-hidden bg-white p-3 cursor-pointer group-hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center shadow-inner"
                >
                  <img
                    src={QR_IMAGE_SRC}
                    alt="Lari Traders Official Payment QR Scanner"
                    className="w-full h-full object-contain rounded-lg"
                  />

                  {/* Hover Overlay to Zoom */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[2px]">
                    <Maximize2 className="w-4 h-4 text-cyan-300" />
                    <span>Click to Enlarge</span>
                  </div>
                </div>

                {/* Subtitle Under QR */}
                <div className="mt-4 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-1.5 text-xs text-white/80 font-medium">
                    <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Scan with any UPI Application</span>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1">
                    Google Pay • PhonePe • Paytm • BHIM • Cred
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsQrZoomed(true)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open Full-Screen QR Code</span>
              </button>
            </div>

            {/* RIGHT: Payment Instructions & Details (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Box 1: Official Payment Number */}
              <div className="relative p-4 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-cyan-400 font-semibold truncate">
                          Step 1 • Official Payment Number
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5 font-mono select-all">
                        {PAYMENT_NUMBER}
                      </div>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(PAYMENT_NUMBER, 'payment')}
                    className={`w-full sm:w-auto h-10 sm:h-9 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0 cursor-pointer ${copiedPayment
                        ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      }`}
                  >
                    {copiedPayment ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-white/70" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white/60">
                  <span>Pay directly using PhonePe, Google Pay, or Paytm number.</span>
                  <span className="text-cyan-300 font-medium shrink-0">Instant UPI Transfer</span>
                </div>
              </div>

              {/* Box 2: Screenshot Verification Number & WhatsApp Button */}
              <div className="relative p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-white/[0.04] to-cyan-950/20 border border-emerald-400/30 hover:border-emerald-400/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-emerald-400 font-semibold truncate">
                          Step 2 • WhatsApp Screenshot Verification
                        </span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5 font-mono select-all">
                        {SCREENSHOT_NUMBER}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto shrink-0">
                    {/* Copy Button */}
                    <button
                      onClick={() => copyToClipboard(SCREENSHOT_NUMBER, 'screenshot')}
                      className={`flex-1 sm:flex-initial h-10 sm:h-9 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${copiedScreenshot
                          ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                        }`}
                    >
                      {copiedScreenshot ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-white/70" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {/* Send on WhatsApp Button */}
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial h-10 sm:h-9 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] cursor-pointer whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Send Screenshot</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white/75">
                  <span className="text-emerald-300 font-medium">
                    Payment hone ke baad is number pe WhatsApp screenshot bhejein.
                  </span>
                  <span className="text-white/50 shrink-0">Verification in &lt; 5 mins</span>
                </div>
              </div>

              {/* Box 3: 3 Quick Verification Steps & Trust Badge */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="font-semibold text-white block">Scan & Pay</span>
                    <span className="text-white/60 text-[11px]">
                      QR scan karein ya +91 91405 77713 pe transfer karein.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="font-semibold text-white block">Take Screenshot</span>
                    <span className="text-white/60 text-[11px]">
                      Transaction successful hone par screenshot le lijiye.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <span className="font-semibold text-white block">Get Activated</span>
                    <span className="text-white/60 text-[11px]">
                      6386757012 pe bhejte hi onboarding & access shuru!
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/50 px-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Verified Official Account
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Fast Track Enrollment
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                  Direct Instructor Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PLAN CHECKOUT MODAL WITH INTEGRATED QR PAYMENT & WHATSAPP SUPPORT        */}
      {/* ========================================================================= */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080A19]/90 backdrop-blur-[24px] p-4 sm:p-6 animate-fade-scale overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 bg-[rgba(14,17,35,0.95)] backdrop-blur-[35px] border border-cyan-400/35 shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-white max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                  Enrollment & Checkout
                </span>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Plan Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedPlan.name}</h3>
                <p className="text-xs text-white/60">{selectedPlan.description}</p>
              </div>
              <div className="text-right sm:text-right shrink-0">
                <span className="text-2xl sm:text-3xl font-bold text-cyan-300">
                  {isYearly ? selectedPlan.priceYearly : selectedPlan.priceMonthly}
                </span>
                <span className="text-xs text-white/50 block">
                  {isYearly ? 'Billed annually' : 'Billed monthly'}
                </span>
              </div>
            </div>

            {/* Payment & QR Integration inside Modal */}
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#090b17] border border-cyan-400/25">
              <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-3 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" />
                <span>Scan or Transfer to Complete Enrollment</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* QR Code in Modal */}
                <div
                  onClick={() => setIsQrZoomed(true)}
                  className="w-36 h-36 rounded-xl bg-white p-2 shrink-0 cursor-pointer shadow-md hover:scale-105 transition-transform group relative"
                >
                  <img
                    src={QR_IMAGE_SRC}
                    alt="Payment QR"
                    className="w-full h-full object-contain rounded"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-medium rounded">
                    Zoom QR
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3 w-full">
                  {/* Payment Number */}
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/50 block uppercase">
                        Payment Number
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono">
                        {PAYMENT_NUMBER}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(PAYMENT_NUMBER, 'payment')}
                      className="px-3 py-1 rounded-lg text-xs bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 transition-colors font-medium flex items-center gap-1"
                    >
                      {copiedPayment ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPayment ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Screenshot Verification Number */}
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-400/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-300/80 block uppercase">
                        Screenshot Verification
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono">
                        {SCREENSHOT_NUMBER}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(SCREENSHOT_NUMBER, 'screenshot')}
                      className="px-3 py-1 rounded-lg text-xs bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400/30 transition-colors font-medium flex items-center gap-1"
                    >
                      {copiedScreenshot ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedScreenshot ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-white/60 text-center sm:text-left">
                Payment karne ke baad screenshot <strong>{SCREENSHOT_NUMBER}</strong> par bhejein for instant access credentials.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-full sm:w-auto h-11 px-6 rounded-full border border-white/20 text-xs font-medium text-white/80 hover:text-white transition-colors"
              >
                Close
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={whatsappLink(selectedPlan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-11 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Screenshot on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL-SCREEN QR CODE LIGHTBOX ZOOM                                         */}
      {/* ========================================================================= */}
      {isQrZoomed && (
        <div
          onClick={() => setIsQrZoomed(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-scale cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm sm:max-w-md w-full bg-[#0c1022] border border-cyan-400/60 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-[0_0_60px_rgba(6,182,212,0.3)] text-center cursor-default"
          >
            <button
              onClick={() => setIsQrZoomed(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase mb-4">
              <QrCode className="w-3.5 h-3.5" />
              <span>Official Payment Scanner</span>
            </div>

            <div className="w-64 h-64 sm:w-80 sm:h-80 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center mb-5">
              <img
                src={QR_IMAGE_SRC}
                alt="Lari Traders Official QR"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full space-y-2 mb-5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.05] text-xs">
                <span className="text-white/60">UPI / Payment Number:</span>
                <span className="font-mono font-bold text-white text-sm">{PAYMENT_NUMBER}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/30 text-xs border border-emerald-400/20">
                <span className="text-emerald-300">Screenshot WhatsApp:</span>
                <span className="font-mono font-bold text-white text-sm">{SCREENSHOT_NUMBER}</span>
              </div>
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Screenshot to {SCREENSHOT_NUMBER}</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

