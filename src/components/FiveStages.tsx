import React from 'react';
import { Compass, PhoneCall, Workflow, HeartHandshake, Eye, CheckCircle } from 'lucide-react';

export const FiveStages: React.FC = () => {
  const stages = [
    {
      number: '01',
      timeline: '24–48 Hours',
      step: 'Stage 01',
      title: 'Get Discovered & Free Revenue Audit',
      summary: 'Optimize & maintain local profile foundations without fake ranking promises.',
      icon: Compass,
      description:
        'We optimize your Google Business Profile and local directories with primary plumbing categories, emergency hours, and geotagged indicators.',
      plumbingScenario:
        'A homeowner searches for "gas water heater repair". Your profile displays current operating hours, verified phone line, and active services.',
      systemAction:
        'Weekly audit of NAP consistency, holiday hours synchronization, and category checks across local search.',
      boundary:
        'Compliance: We never guarantee rankings or call volume. Google algorithms cannot be bought or guaranteed.',
    },
    {
      number: '02',
      timeline: 'Under 2 Rings',
      step: 'Stage 02',
      title: 'Capture the Inquiry & Triage Calls',
      summary: 'Configured AI call answering & immediate missed-call recovery with strict dispatch rules.',
      icon: PhoneCall,
      description:
        'Calls during agreed coverage (on-job or after-hours) are answered in 2 rings, capturing caller address and plumbing symptoms.',
      plumbingScenario:
        'Caller rings at 7:15 PM with water leaking from a main shutoff. Ollie gathers address, shutoff status, and alerts on-call supervisor.',
      systemAction:
        'Instant SMS confirmation to caller, dispatch notification to designated techs, and missed-call recovery text.',
      boundary:
        'Dispatch Safety: System never promises dispatch times or quotes without explicit human confirmation.',
    },
    {
      number: '03',
      timeline: 'Estimate Recovery',
      step: 'Stage 03',
      title: 'Move Opportunities Forward',
      summary: 'Centralized inquiry triage and respectful, approved open-estimate follow-ups.',
      icon: Workflow,
      description:
        'Every inquiry enters a centralized queue. Open quotes receive polite follow-ups that halt immediately upon any customer response.',
      plumbingScenario:
        'You sent a proposal on Tuesday for a tankless heater. On Thursday, an approved check-in text asks if they have questions on sizing.',
      systemAction:
        'Automatic tracking of days elapsed. Immediate cessation of messages upon any reply, decline, or status change.',
      boundary:
        'Verification: Follow-ups only trigger on verified eligible quotes. Bookings recorded only when human-verified.',
    },
    {
      number: '04',
      timeline: 'Trust & Reviews',
      step: 'Stage 04',
      title: 'Build Trust & Repeat Business',
      summary: 'Ethical, compliant post-job reviews and consented customer care touchpoints.',
      icon: HeartHandshake,
      description:
        'Post-completion SMS delivers a clean Google review link for honest feedback. Supports seasonal reminders where consent exists.',
      plumbingScenario:
        'Technician finishes a PRV replacement. The homeowner receives a clean text requesting their candid Google review.',
      systemAction:
        'One-touch Google review link with full TCPA and FTC endorsement compliance.',
      boundary:
        'FTC Compliance: Strictly zero review gating, buying reviews, or selectively filtering unhappy customers.',
    },
    {
      number: '05',
      timeline: 'Continuous Oversight',
      step: 'Stage 05',
      title: 'Monitor the Whole System',
      summary: 'Transparent, unvarnished reporting that flags failures instead of faking success.',
      icon: Eye,
      description:
        'Unified dashboard showing call answers, delivery receipts, customer reply rates, and exceptions (e.g. landline bounces).',
      plumbingScenario:
        'Caller rings from an analog landline unable to receive SMS. System flags this to office staff for voice phone callback.',
      systemAction:
        'Automated exception logging, daily summaries, and weekly operational review logs for the owner.',
      boundary:
        'Integrity: We report actual delivered counts and failed exceptions rather than masking errors with fake 100% scores.',
    },
  ];

  return (
    <section id="system" className="py-16 sm:py-28 bg-[#F7F5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-20 sm:space-y-28">
        {/* Centered Main Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#736A5E] mb-3">
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-normal text-[#201B17] tracking-tight leading-[1.1]">
            One managed system covering every mile of{' '}
            <span className="editorial-highlight text-[#201B17] font-normal inline-block px-2">
              plumbing demand.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A433B] leading-relaxed">
            From search discovery to post-job reviews, Ollie manages the operational handoffs that protect your revenue.
          </p>
        </div>

        {/* The 5 Stages Stacked Sequentially Below Each Other (No Choosing / No Tabs) */}
        <div className="space-y-20 sm:space-y-28">
          {stages.map((stage, idx) => (
            <div
              key={stage.number}
              className={`space-y-8 ${idx > 0 ? 'pt-16 sm:pt-24 border-t border-[#E2DDD1]' : ''}`}
            >
              {/* Centered Stage Header with Number and Timeline Directly Below */}
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex flex-col items-center justify-center mb-4">
                  <span className="font-mono text-4xl sm:text-6xl font-bold text-[#201B17] tracking-tighter leading-none">
                    {stage.number}
                  </span>
                  <span className="font-mono text-xs text-[#736A5E] mt-2 tracking-[0.25em] uppercase font-semibold">
                    {stage.timeline}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-serif text-[#201B17] font-normal tracking-tight mb-2">
                  {stage.title}
                </h3>

                <p className="text-base sm:text-xl font-serif italic text-[#4A433B] mb-3">
                  {stage.summary}
                </p>

                <p className="text-sm text-[#736A5E] max-w-2xl mx-auto leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Open Editorial Narrative (No Cards, Pure Hairlines) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-6 border-t border-[#E2DDD1] text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="font-mono uppercase tracking-wider text-[#201B17] font-bold">
                    Field Scenario
                  </div>
                  <p className="text-[#4A433B] leading-relaxed font-sans">
                    {stage.plumbingScenario}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono uppercase tracking-wider text-[#201B17] font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#E6AF47]" />
                    <span>Operational Execution & Safeguards</span>
                  </div>
                  <p className="text-[#4A433B] leading-relaxed font-sans">
                    {stage.systemAction}
                  </p>
                  <p className="text-xs text-[#736A5E] pt-1">
                    {stage.boundary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
