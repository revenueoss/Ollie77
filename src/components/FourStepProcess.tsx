import React from 'react';
import { Search, Sliders, PlayCircle, BarChart3, ArrowRight } from 'lucide-react';

interface FourStepProcessProps {
  onOpenAudit: () => void;
}

export const FourStepProcess: React.FC<FourStepProcessProps> = ({ onOpenAudit }) => {
  const steps = [
    {
      number: '01',
      title: 'Free Revenue Audit',
      timeline: '24–48 Hours',
      icon: Search,
      headline: 'We inspect your current intake and local footprint.',
      details:
        'We analyze your Google Profile categories, peak-hour phone answer rate, and open quote drop-off.',
      output: 'A concrete report detailing missed call volume and estimate drop-off.',
    },
    {
      number: '02',
      title: 'Configure Your System',
      timeline: 'Day 3–5',
      icon: Sliders,
      headline: 'We tailor triage rules and AI coverage to your shop.',
      details:
        'We program operating hours, define emergency criteria (burst pipes vs faucet drips), and calibrate tone.',
      output: 'Custom call trees, triage rules, and approved SMS follow-up templates.',
    },
    {
      number: '03',
      title: 'Test & Launch',
      timeline: 'Day 6–7',
      icon: PlayCircle,
      headline: 'Live simulation before a single homeowner hears it.',
      details:
        'We simulate emergency calls and open quote check-ins with your lead technicians before going live.',
      output: 'Verified phone forwarding, tested SMS delivery, and technician sign-off.',
    },
    {
      number: '04',
      title: 'Monitor & Refine',
      timeline: 'Ongoing',
      icon: BarChart3,
      headline: 'Continuous human oversight and exception handling.',
      details:
        'Our team monitors daily logs for carrier bounces, handles edge cases, updates holiday hours, and audits review flows.',
      output: 'Monthly summary showing recovered revenue and resolved exceptions.',
    },
  ];

  return (
    <section id="how-it-works" className="min-h-screen flex flex-col justify-center py-14 sm:py-20 bg-[#F7F5F0] border-t border-[#E2DDD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#201B17] bg-[#EFECE4] px-3.5 py-1 rounded-xs border border-[#E2DDD1] mb-3 shadow-2xs">
            Implementation Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.12]">
            How Ollie is configured and managed for{' '}
            <span className="editorial-highlight text-[#201B17] font-normal inline-block px-2">
              your plumbing business.
            </span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#4A433B] leading-relaxed">
            No complicated software to learn or manage while driving a van. Ollie is a fully managed service engineered to fit your existing operations.
          </p>
        </div>

        {/* 4-Step Open Sequential Ledger (No Card Boxes) */}
        <div className="border-y border-[#E2DDD1] py-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E2DDD1]">
            {steps.map((step) => (
              <div key={step.number} className="py-6 lg:py-0 px-4 sm:px-6 flex flex-col justify-between">
                <div>
                  <div className="text-center pb-3 border-b border-[#E2DDD1] mb-4">
                    <span className="font-bold text-[#201B17] text-2xl font-mono block">{step.number}</span>
                    <span className="text-[#736A5E] font-mono text-xs block mt-1 tracking-wider uppercase font-semibold">{step.timeline}</span>
                  </div>

                  <h3 className="text-xl font-serif font-normal text-[#201B17] mb-2 text-center">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-[#201B17] mb-2.5 leading-snug text-center">
                    {step.headline}
                  </p>

                  <p className="text-xs text-[#736A5E] leading-relaxed mb-6 text-center">
                    {step.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2DDD1] text-xs text-[#201B17] font-mono text-center">
                  <span className="text-[#736A5E]">Output: </span>
                  <span className="font-medium">{step.output}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Bottom Action Invitation (No Card Shell) */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#D89E34] font-bold">
            Step 1 is completely free
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#201B17]">
            Ready to find the unrecovered revenue in your service area?
          </h3>
          <p className="text-xs sm:text-sm text-[#736A5E]">
            Takes 2 minutes to request. We analyze your local plumbing footprint within 48 hours.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold tracking-wide text-[#201B17] bg-[#F3C363] border border-[#231F1C]/15 rounded-xs hover:bg-[#E6AF47] transition-all whitespace-nowrap cursor-pointer shadow-xs hover:shadow"
            >
              <span>Request Your Revenue Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
