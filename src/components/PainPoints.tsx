import React from 'react';
import { ArrowDownRight } from 'lucide-react';

const CRAFT_IMAGE_PATH = '/src/assets/images/plumbing_craft_copper_manifold_1792063669958.jpg';

export const PainPoints: React.FC = () => {
  const leaks = [
    {
      num: '01',
      title: 'The In-Crawlspace Missed Call',
      reality: 'Sweating copper or snaking a sewer main when the phone rings.',
      consequence: 'Homeowners call the next plumber on Google within 90 seconds if unanswered.',
    },
    {
      num: '02',
      title: 'The Forgotten $3,500 Estimate',
      reality: 'Measuring closets and sizing lines without timely follow-up.',
      consequence: 'Over 50% of open quotes go cold simply because technicians are running new calls.',
    },
    {
      num: '03',
      title: 'Google Profile Drift',
      reality: 'Outdated emergency hours, unmonitored review sentiment, stale attributes.',
      consequence: 'Google quietly reduces map-pack visibility during peak emergency searches.',
    },
    {
      num: '04',
      title: 'The Silent Review Gap',
      reality: 'Crews complete clean jobs, but busy plumbers don’t ask for reviews.',
      consequence: 'Without prompt zero-friction SMS prompts, honest 5-star ratings get lost.',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center py-14 sm:py-20 bg-[#F7F5F0] border-t border-[#E2DDD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#201B17] bg-[#EFECE4] px-3.5 py-1 rounded-xs border border-[#E2DDD1] mb-3 shadow-2xs">
            Operational Diagnosis
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.12]">
            Plumbers don&apos;t lack demand.{' '}
            <span className="editorial-highlight text-[#201B17] font-normal inline-block px-2">
              They lose revenue to silence.
            </span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#4A433B] max-w-xl mx-auto leading-relaxed">
            Running trucks in the field and running a flawless front office simultaneously is an impossible dilemma.
          </p>
        </div>

        {/* Open Editorial 2-Column Ledger (No Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Natural Editorial Photography & Pull Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <img
                src={CRAFT_IMAGE_PATH}
                alt="Plumbing craft: precision copper piping"
                className="w-full h-auto max-h-[300px] object-cover rounded-xs border border-[#E2DDD1]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <p className="mt-2 text-xs text-[#736A5E] italic">
                Fig. 1 — Precision rough-in manifold. Mechanical execution demands 100% technician focus.
              </p>
            </div>

            {/* Unboxed Editorial Quote with hairline rules */}
            <div className="py-4 border-y border-[#E2DDD1] space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#E6AF47] font-bold">
                The Core Premise
              </div>
              <p className="text-sm sm:text-base font-serif text-[#201B17] leading-relaxed italic">
                &ldquo;Stop spending thousands on speculative ad clicks when you already lose 20% to 35% of the local inquiries already dialing your phone.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Open Typographic Numbered Rows (No Card Boxes) */}
          <div className="lg:col-span-7 divide-y divide-[#E2DDD1] border-y border-[#E2DDD1]">
            {leaks.map((leak) => (
              <div
                key={leak.num}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-start gap-4 group"
              >
                <div className="flex items-center gap-2 sm:gap-3 text-sm font-mono text-[#736A5E] shrink-0 sm:w-16">
                  <span className="font-bold text-base text-[#201B17] group-hover:text-[#E6AF47] transition-colors">{leak.num}</span>
                  <ArrowDownRight className="w-4 h-4 text-[#736A5E] group-hover:text-[#E6AF47] transition-colors" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-xl font-serif font-normal text-[#201B17] leading-snug">
                    {leak.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#201B17] font-medium leading-relaxed">
                    {leak.reality}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#736A5E] leading-relaxed">
                    {leak.consequence}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
