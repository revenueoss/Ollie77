import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B1815] text-[#F7F5F0] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="inline-flex items-baseline gap-1.5 text-2xl font-serif font-normal text-white group"
            >
              <span>Ollie</span>
              <span className="w-2 h-2 rounded-full bg-[#F3C363] inline-block mb-1 group-hover:scale-125 transition-transform" aria-hidden="true" />
            </a>
            <p className="text-xs sm:text-sm text-white/75 max-w-sm leading-relaxed">
              The managed revenue and customer inquiry system engineered specifically for US independent plumbing contractors.
            </p>
            <div className="pt-2 text-xs font-mono text-[#F3C363] font-semibold">
              Managed System · Human Oversight · Strict Dispatch Safety
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3 font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <a href="#system" className="hover:text-[#F3C363] transition-colors">
                  The 5-Stage System
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#F3C363] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-[#F3C363] transition-colors">
                  Live Dashboard Preview
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#F3C363] transition-colors">
                  Interactive ROI Calculator
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#F3C363] transition-colors">
                  Ollie Complete Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F3C363] transition-colors">
                  Operational FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Operational Standard */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3 font-bold">
              Operational Standards
            </div>
            <p className="text-xs text-white/75 leading-relaxed">
              Ollie operates strictly under approved customer communication rules. We do not resell leads, buy third-party lists, or promise unverified technician arrivals.
            </p>
            <div className="pt-2 text-xs text-white/65 leading-normal border-t border-white/10">
              <strong className="text-white/90">FCC / TCPA Compliance:</strong> All messaging utilizes verified 10DLC brand registrations with mandatory STOP/opt-out triggers.
            </div>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 space-y-4 text-xs text-white/50 leading-relaxed">
          <p>
            <strong>Regulatory & FTC Notice:</strong> Ollie facilitates compliant customer communication workflows. In strict accordance with Federal Trade Commission (FTC) guidelines, Google terms of service, and consumer review protections, Ollie does not filter reviews, gate negative feedback, or incentivize customer ratings. All review prompts invite honest, unvarnished customer feedback.
          </p>
          <p>
            <strong>Search Engine Disclaimer:</strong> Google, Google Business Profile, and Google Maps are trademarks of Google LLC. Ollie is an independent provider of managed revenue systems and is not affiliated with or endorsed by Google LLC. Ranking and inquiry volume are dependent on authentic local market signals and cannot be guaranteed.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 text-white/40">
            <span>© {new Date().getFullYear()} Ollie. All rights reserved. Managed Plumbing Revenue System.</span>
            <div className="flex items-center gap-4">
              <span>Terms of Service</span>
              <span aria-hidden="true">·</span>
              <span>Privacy Policy</span>
              <span aria-hidden="true">·</span>
              <span>Acceptable Use</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
