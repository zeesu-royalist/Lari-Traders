'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#080A19] text-white border-t border-white/10 pt-16 pb-12 px-5 sm:px-8 md:px-[82px]">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 256 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
                  fill="white"
                />
              </svg>
              <span className="text-white text-[24px] sm:text-[26px] font-[450] leading-none tracking-[-0.02em]">
                Lari Traders
              </span>
            </div>

            <p className="text-[14px] sm:text-[15px] font-[450] text-white/70 max-w-sm mb-6 leading-relaxed">
              Lari Traders is an independent financial education and market research firm dedicated to teaching disciplined, systematic trading methodologies and institutional risk management.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for market research..."
                required
                className="flex-1 h-[46px] px-4 rounded-[12px] bg-[rgba(17,16,15,0.4)] border border-white/10 text-white placeholder-white/40 text-[14px] font-[450] focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="h-[46px] px-5 bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] font-[450] hover:opacity-90 flex items-center gap-1.5 transition-opacity"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Links 1: Education & Programs */}
          <div>
            <p className="text-[12px] uppercase font-[450] text-white/50 tracking-wider mb-4">
              Education & Programs
            </p>
            <ul className="space-y-2.5 text-[14px] font-[450] text-white/70">
              <li><Link href="/cinema" className="hover:text-white transition-colors">Video Masterclass Library</Link></li>
              <li><a href="#cinematic-showcase" className="hover:text-white transition-colors">Order Flow Curriculum</a></li>
              <li><a href="#risk-philosophy" className="hover:text-white transition-colors">Risk Management Protocol</a></li>
              <li><a href="#cinematic-showcase" className="hover:text-white transition-colors">Macro Regimes Series</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Tuition & Memberships</a></li>
            </ul>
          </div>

          {/* Links 2: Market Research */}
          <div>
            <p className="text-[12px] uppercase font-[450] text-white/50 tracking-wider mb-4">
              Market Research
            </p>
            <ul className="space-y-2.5 text-[14px] font-[450] text-white/70">
              <li><a href="#trading-analytics" className="hover:text-white transition-colors">Daily Pre-Market Playbook</a></li>
              <li><a href="#trading-analytics" className="hover:text-white transition-colors">Macro & Rate Analytics</a></li>
              <li><a href="#trading-analytics" className="hover:text-white transition-colors">Order Book Liquidity Feeds</a></li>
              <li><a href="#trading-analytics" className="hover:text-white transition-colors">Multi-Asset Correlation Matrix</a></li>
              <li><a href="#trading-analytics" className="hover:text-white transition-colors">Research Archive</a></li>
            </ul>
          </div>

          {/* Links 3: Company */}
          <div>
            <p className="text-[12px] uppercase font-[450] text-white/50 tracking-wider mb-4">
              Company & Legal
            </p>
            <ul className="space-y-2.5 text-[14px] font-[450] text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">About Lari Traders</a></li>
              <li><a href="#risk-philosophy" className="hover:text-white transition-colors">Educational Methodology</a></li>
              <li><a href="#trading-analytics" className="hover:text-white transition-colors">Advisory & Contact Desk</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* High-Risk Financial & Regulatory Disclaimer */}
        <div className="p-4 sm:p-6 rounded-[18px] bg-white/[0.02] border border-white/[0.07] mb-10 text-[11px] sm:text-[12px] leading-relaxed text-white/55 font-[400]">
          <p className="font-semibold text-white/80 mb-1.5 uppercase tracking-wide text-[10px] sm:text-[11px]">
            High-Risk Investment & Financial Education Disclaimer
          </p>
          <p>
            Trading foreign exchange, equities, futures, commodities, and digital assets involves significant financial risk and may not be suitable for all investors. There is a substantial risk of loss, and you may lose some or all of your invested capital. All content, masterclasses, research reports, and analytical tools provided by Lari Traders are strictly for educational and informational purposes only and do not constitute financial, investment, legal, or tax advice. No representation is made that any individual or account will or is likely to achieve profits or losses similar to those discussed. Past performance and simulated backtest results are not indicative of future outcomes. Please consult with an independent, licensed financial advisor before making any financial or trading decisions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-[450] text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70">Educational & Market Research Desk Active</span>
          </div>

          <p>© {new Date().getFullYear()} Lari Traders Education & Research Ltd. All rights reserved. [Company Office / City, Country]. Contact: support@laritraders.com</p>
        </div>
      </div>
    </footer>
  );
}
