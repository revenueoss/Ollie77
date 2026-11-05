import React from 'react';
import { Check, X, Shield, ArrowUpRight, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onOpenAudit: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAudit }) => {
  const inclusions = [
    {
      title: 'Local Google Profile Optimization & Maintenance',
      desc: 'Category audits, verified business hours sync, and profile health monitoring.',
    },
    {
      title: 'Configured AI Call Answering Within Agreed Hours',
      desc: '24/7 or after-hours intake capturing caller details, symptoms, and urgency.',
    },
    {
      title: 'Missed-Call & Abandoned Inquiry Recovery',
      desc: 'Immediate automated SMS check-ins to capture lost inquiries.',
    },
    {
      title: 'Lead & Open-Estimate Follow-Up Sequences',
      desc: 'Approved check-ins that halt automatically on reply or opt-out.',
    },
    {
      title: 'Ethical Review-Request Workflows',
      desc: 'Post-job SMS links requesting honest Google reviews without gating.',
    },
    {
      title: 'Centralized Inquiry Tracking & Weekly Monitoring',
      desc: 'Unified oversight of every caller, follow-up, and carrier exception.',
    },
  ];

  const exclusions = [
    'Paid advertising management and media spend (Google Ads, LSA)',
    'Purchased or shared lead lists (e.g. Angi, Thumbtack, Yelp)',
    'Additional separate geographic business locations',
    'Variable high-volume carrier voice/SMS pass-through charges',
    'Major custom software development beyond plumbing workflows',
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#F7F5F0] border-t border-[#201B17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#201B17] bg-[#EFECE4] px-3.5 py-1 rounded-xs border border-[#E2DDD1] mb-3 shadow-2xs">
            Single Transparent Tier
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.12]">
            One complete system.{' '}
            <span className="editorial-highlight text-[#201B17] font-normal inline-block px-2">
              No hidden retainers.
            </span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#4A433B] leading-relaxed">
            Everything your plumbing business needs to capture demand and recover pipeline in a single subscription.
          </p>
        </div>

        {/* Authoritative Open Price Header Strip (No Card Shell) */}
        <div className="border-t border-[#E2DDD1] py-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D89E34] font-bold mb-1">
              Managed Plumbing Revenue Service
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#201B17] font-normal">
              Ollie Complete
            </h3>
            <p className="text-xs sm:text-sm text-[#736A5E] mt-1">
              Full intake, recovery, estimate follow-up, and profile care for 1 US plumbing shop location.
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-5xl sm:text-6xl font-serif font-bold text-[#201B17] tracking-tight">
                $397
              </span>
              <span className="text-xs sm:text-sm font-sans font-medium text-[#736A5E]">USD / mo</span>
            </div>

            <button
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-[#201B17] bg-[#F3C363] border border-[#231F1C]/15 rounded-xs hover:bg-[#E6AF47] transition-all cursor-pointer shadow-xs hover:shadow whitespace-nowrap"
            >
              <span>Request Revenue Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Open Inclusions & Disclosures Ledger (No Card Container) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2DDD1] border-y border-[#E2DDD1] py-8">
          {/* Left: What Is Included */}
          <div className="lg:col-span-7 pr-0 lg:pr-10 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#201B17] font-bold">
              <Check className="w-4 h-4 text-[#E6AF47]" />
              <span>What Is Included in Ollie Complete</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {inclusions.map((item) => (
                <div key={item.title} className="space-y-1">
                  <div className="text-sm font-semibold text-[#201B17] flex items-center gap-2">
                    <span className="text-[#E6AF47] font-bold">✓</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#736A5E] leading-relaxed pl-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Explicit Disclosures & Boundaries */}
          <div className="lg:col-span-5 pl-0 lg:pl-10 pt-8 lg:pt-0 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#736A5E] font-bold">
              <HelpCircle className="w-4 h-4 text-[#736A5E]" />
              <span>Explicit Boundaries & Exclusions</span>
            </div>

            <div className="space-y-2.5">
              {exclusions.map((exclusion) => (
                <div key={exclusion} className="flex items-start gap-2.5 text-xs text-[#736A5E]">
                  <X className="w-3.5 h-3.5 text-[#A25A3C] shrink-0 mt-0.5" />
                  <span className="leading-snug">{exclusion}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E2DDD1] text-xs text-[#736A5E] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-[#201B17] mb-1">
                <Shield className="w-4 h-4 text-[#201B17]" />
                <span>Fair Terms Commitment</span>
              </div>
              Month-to-month agreement. Cancel anytime with 14 days notice. Data and caller contacts remain 100% yours.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
