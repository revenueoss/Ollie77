import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

interface HeroProps {
  onOpenAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAudit }) => {
  return (
    <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center relative py-12 sm:py-16 overflow-hidden bg-[#F7F5F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Editorial Eyebrow in warm travertine tones */}
        <div className="text-center mb-5 sm:mb-6">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#201B17] bg-[#EFECE4] px-3.5 py-1 border border-[#E2DDD1] rounded-xs shadow-2xs">
            The Complete Plumbing Revenue System
          </span>
        </div>

        {/* Oversized Serif Headline with Warm Honey Amber Highlight */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-serif font-normal text-[#201B17] leading-[1.08] tracking-tight">
            Turn more local demand into{' '}
            <span className="editorial-highlight text-[#201B17] font-normal inline-block px-2.5 sm:px-3">
              real customer opportunities.
            </span>
          </h1>
        </div>

        {/* Concise Supporting Copy in Warm Earth Charcoal */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
          <p className="text-base sm:text-lg text-[#4A433B] leading-relaxed font-normal">
            Independent plumbers lose tens of thousands in unrecovered pipeline from unanswered calls on job sites,
            drifting Google profile hours, and unprompted water heater estimates. Ollie is the single managed system
            that protects your intake, follows up cleanly, and turns calls into verified revenue.
          </p>
        </div>

        {/* Action Buttons in Warm Honey Sand & Crisp Travertine */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-12">
          <button
            onClick={onOpenAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide text-[#201B17] bg-[#F3C363] border border-[#231F1C]/15 rounded-xs hover:bg-[#E6AF47] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer shadow-xs hover:shadow"
          >
            <span>Get Your Free Revenue Audit</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <a
            href="#dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide text-[#201B17] bg-[#FFFFFF] border border-[#E2DDD1] rounded-xs hover:bg-[#EFECE4] hover:border-[#D4CEBF] transition-all whitespace-nowrap shadow-2xs"
          >
            <span>Explore The System</span>
            <ArrowDown className="w-4 h-4 text-[#736A5E]" aria-hidden="true" />
          </a>
        </div>

        {/* Quiet Editorial Trust Markers - Unboxed with · separators */}
        <div className="pt-6 sm:pt-8 border-t border-[#E2DDD1] max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-[13px] text-[#736A5E] font-medium">
            <span>Built strictly for US plumbing contractors</span>
            <span className="hidden sm:inline text-[#D4CEBF]" aria-hidden="true">·</span>
            <span>Zero lead-buying or spam ad spend</span>
            <span className="hidden sm:inline text-[#D4CEBF]" aria-hidden="true">·</span>
            <span>100% human-verified dispatch safety</span>
            <span className="hidden sm:inline text-[#D4CEBF]" aria-hidden="true">·</span>
            <span>Transparent exception reporting</span>
          </div>
        </div>
      </div>
    </section>
  );
};
