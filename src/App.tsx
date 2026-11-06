/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OnboardingIntakePortal } from './components/OnboardingIntakePortal';
import { DashboardMockup } from './components/DashboardMockup';
import { FiveStages } from './components/FiveStages';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { ArrowUpRight, ArrowLeft, ShieldCheck } from 'lucide-react';

type ActiveView = 'intake' | 'system' | 'dashboard' | 'pricing' | 'faq';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('intake');
  const targetEmail = 'ollie.os@aol.com';

  const switchToIntake = () => {
    setActiveView('intake');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#201B17] selection:bg-[#F3C363] selection:text-[#201B17]">
      {/* Top Application Header */}
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/95 backdrop-blur-xs border-b border-[#E2DDD1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand & Mode */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={switchToIntake}
              className="flex items-baseline gap-2 text-2xl font-serif font-bold text-[#201B17] tracking-tight cursor-pointer"
            >
              <span>Ollie</span>
              <span className="w-2 h-2 rounded-full bg-[#E6AF47]" />
            </button>
            <span className="text-xs font-mono uppercase text-[#736A5E] tracking-wider pl-2 border-l border-[#D4CEBF] hidden sm:inline">
              Plumbing Client Intake Portal
            </span>
          </div>

          {/* View Navigation Tabs (Smooth Anchor Links) */}
          <nav className="flex items-center gap-1 sm:gap-3 text-xs font-mono">
            <a
              href="#problems-we-solve"
              className="px-2.5 py-1 text-[#4A433B] hover:text-[#201B17] font-medium transition-colors hidden md:inline-block"
            >
              Problems (70%)
            </a>
            <a
              href="#the-solution"
              className="px-2.5 py-1 text-[#4A433B] hover:text-[#201B17] font-medium transition-colors hidden sm:inline-block"
            >
              Solution (20%)
            </a>
            <a
              href="#pricing"
              className="px-2.5 py-1 text-[#4A433B] hover:text-[#201B17] font-medium transition-colors hidden lg:inline-block"
            >
              Pricing ($397/mo)
            </a>
            <a
              href="#faq"
              className="px-2.5 py-1 text-[#4A433B] hover:text-[#201B17] font-medium transition-colors hidden lg:inline-block"
            >
              FAQ
            </a>
            <a
              href="#onboarding-intake-form"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-[#201B17] text-white hover:bg-[#38312B] rounded-xs shadow-xs transition-all cursor-pointer"
            >
              <span>Onboard Your Shop</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E6AF47]" />
            </a>
          </nav>
        </div>
      </header>

      {/* Main Single-Page Content Area */}
      <main className="flex-1">
        <OnboardingIntakePortal
          onOpenSpecs={() => {
            const el = document.getElementById('pricing');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          middleSections={
            <>
              {/* SECTION: COMPLETE PRICING & INCLUSIONS LEDGER */}
              <PricingSection onOpenAudit={switchToIntake} />

              {/* SECTION: OPERATIONAL FAQS */}
              <FaqSection />
            </>
          }
        />
      </main>

      {/* Global Grounded Editorial Footer */}
      <footer className="border-t border-[#E2DDD1] py-8 bg-[#F7F5F0] text-xs text-[#736A5E] mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-[#201B17]">Ollie Complete</span>
            <span>·</span>
            <span>Managed Revenue & Inquiry Capture for US Plumbers</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={`mailto:${targetEmail}`} className="hover:text-[#201B17] font-mono">
              Direct: {targetEmail}
            </a>
            <span>·</span>
            <span>$397 / mo Flat</span>
            <span>·</span>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
