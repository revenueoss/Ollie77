import React, { useState } from 'react';
import { Calculator, ArrowUpRight, Check, RotateCcw } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenAudit: () => void;
}

interface ShopPreset {
  label: string;
  vans: string;
  calls: number;
  ticket: number;
}

const PRESETS: ShopPreset[] = [
  { label: 'Solo Master', vans: '1 Van', calls: 12, ticket: 650 },
  { label: 'Growing Shop', vans: '2–4 Vans', calls: 25, ticket: 850 },
  { label: 'Commercial / Fleet', vans: '5+ Vans', calls: 50, ticket: 1250 },
];

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenAudit }) => {
  const [missedCalls, setMissedCalls] = useState<number | string>(25);
  const [avgTicket, setAvgTicket] = useState<number | string>(850);
  const [activePreset, setActivePreset] = useState<string | null>('Growing Shop');

  const safeCalls = Math.max(0, Number(missedCalls) || 0);
  const safeTicket = Math.max(0, Number(avgTicket) || 0);

  // Financial model constants:
  // Conservative recovery: 25% of missed inquiries become booked jobs
  // Gross profit margin: 55% after technician labor and materials
  const recoveredJobs = Math.round((safeCalls * 0.25) * 10) / 10;
  const lostGrossPipeline = Math.round(safeCalls * safeTicket);
  const recoveredGrossRevenue = Math.round(recoveredJobs * safeTicket);
  const grossProfitMargin = Math.round(recoveredGrossRevenue * 0.55);
  const ollieFee = 397;
  const netMonthlyProfit = Math.max(0, grossProfitMargin - ollieFee);
  const annualNetProfit = netMonthlyProfit * 12;

  // Break-even calculation
  const profitPerJob = safeTicket * 0.55;
  const breakEvenJobs = profitPerJob > 0 ? (ollieFee / profitPerJob).toFixed(1) : '1.0';

  const handlePresetSelect = (preset: ShopPreset) => {
    setActivePreset(preset.label);
    setMissedCalls(preset.calls);
    setAvgTicket(preset.ticket);
  };

  const handleCustomChange = (
    setter: React.Dispatch<React.SetStateAction<number | string>>,
    val: string
  ) => {
    setActivePreset(null);
    setter(val);
  };

  const handleReset = () => {
    handlePresetSelect(PRESETS[1]);
  };

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-[#F7F5F0] border-t border-[#E2DDD1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#736A5E] mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#201B17]" />
            <span>Intake Cost Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.14]">
            Calculate the cost of{' '}
            <span className="editorial-highlight font-normal inline-block px-2">
              unattended calls.
            </span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#4A433B] leading-relaxed">
            When a homeowner has an urgent plumbing problem, they don&apos;t wait for voicemail—they call the next shop on Google. Type your numbers below to see what slips away.
          </p>
        </div>

        {/* Step 1: Preset Buttons + Inputs (Clean, Unboxed) */}
        <div className="border-t border-[#E2DDD1] pt-6 pb-10">
          {/* Quick Preset Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#736A5E] font-semibold">
              Select Fleet Benchmark or Type Custom:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {PRESETS.map((p) => {
                const isSelected = activePreset === p.label;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePresetSelect(p)}
                    className={`px-3 py-1.5 text-xs font-mono border rounded-2xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#201B17] bg-[#201B17] text-[#FAF8F5] font-semibold'
                        : 'border-[#D4CEBF] bg-[#FAF8F5] text-[#4A433B] hover:border-[#201B17]'
                    }`}
                  >
                    {p.label} ({p.vans})
                  </button>
                );
              })}
              <button
                type="button"
                onClick={handleReset}
                title="Reset to standard shop"
                className="p-1.5 text-[#736A5E] hover:text-[#201B17] transition-colors cursor-pointer ml-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2 Clean Direct Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {/* Input 1: Missed Calls */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="missed-calls-input"
                  className="text-xs font-mono uppercase tracking-wider text-[#201B17] font-semibold"
                >
                  Monthly Missed / After-Hours Calls
                </label>
                <span className="text-xs font-mono text-[#736A5E]">Calls / Month</span>
              </div>
              <div className="relative">
                <input
                  id="missed-calls-input"
                  type="number"
                  min="0"
                  max="1000"
                  step="1"
                  value={missedCalls}
                  onChange={(e) => handleCustomChange(setMissedCalls, e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D4CEBF] focus:border-[#201B17] focus:bg-white text-3xl sm:text-4xl font-mono font-bold text-[#201B17] px-4 py-3.5 rounded-xs outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#736A5E] pointer-events-none">
                  calls
                </span>
              </div>
              <p className="text-xs text-[#736A5E]">
                Rings during jobs, after-hours voicemails, or weekend leads that drop off.
              </p>
            </div>

            {/* Input 2: Average Ticket */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="avg-ticket-input"
                  className="text-xs font-mono uppercase tracking-wider text-[#201B17] font-semibold"
                >
                  Average Completed Ticket Value
                </label>
                <span className="text-xs font-mono text-[#736A5E]">USD ($) / Job</span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-mono text-[#736A5E] pointer-events-none">
                  $
                </span>
                <input
                  id="avg-ticket-input"
                  type="number"
                  min="0"
                  step="50"
                  value={avgTicket}
                  onChange={(e) => handleCustomChange(setAvgTicket, e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D4CEBF] focus:border-[#201B17] focus:bg-white text-3xl sm:text-4xl font-mono font-bold text-[#201B17] pl-10 pr-4 py-3.5 rounded-xs outline-none transition-all"
                />
              </div>
              <p className="text-xs text-[#736A5E]">
                Blended average across repairs, drain cleanouts, and replacement installs.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Clear Before vs. After Impact Ledger (No Cards) */}
        <div className="border-t border-[#E2DDD1] py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E2DDD1]">
            {/* Left: Current Pipeline Leakage */}
            <div className="pr-0 md:pr-10 pb-8 md:pb-0 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase tracking-wider font-semibold text-[#A25A3C]">
                  Current Status Quo
                </span>
                <span className="text-[#736A5E]">Pipeline Leaking</span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-mono font-bold text-[#A25A3C] tracking-tight">
                  -${lostGrossPipeline.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-[#736A5E] mt-1.5">
                  Lost revenue per month ({safeCalls} calls × ${safeTicket})
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4A433B] leading-relaxed">
                When phones go unanswered or wait for next-day callbacks, homeowners dial the next plumber on Google. That revenue disappears permanently from your schedule.
              </p>
            </div>

            {/* Right: Recaptured Pipeline With Ollie */}
            <div className="pl-0 md:pl-10 pt-8 md:pt-0 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase tracking-wider font-semibold text-[#201B17]">
                  With Ollie Complete
                </span>
                <span className="text-[#736A5E]">Conservative 25% Capture</span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-serif font-bold text-[#201B17] tracking-tight">
                  +${recoveredGrossRevenue.toLocaleString()}
                  <span className="text-sm font-sans font-normal text-[#736A5E] ml-2">/ month</span>
                </div>
                <div className="text-xs font-mono text-[#201B17] mt-1.5 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E6AF47]" />
                  <span>≈ {recoveredJobs} additional booked jobs every 30 days</span>
                </div>
              </div>

              {/* Clean Financial Breakdown */}
              <div className="pt-3 border-t border-[#E2DDD1] space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[#4A433B]">
                  <span>Gross Profit (55% Margin):</span>
                  <span className="font-semibold text-[#201B17]">+${grossProfitMargin.toLocaleString()} / mo</span>
                </div>
                <div className="flex items-center justify-between text-[#4A433B]">
                  <span>Ollie Complete Monthly Retainer:</span>
                  <span className="font-semibold text-[#736A5E]">-$397 / mo</span>
                </div>
                <div className="pt-2 border-t border-[#E2DDD1] flex items-center justify-between text-sm font-semibold">
                  <span className="text-[#201B17] font-sans">Net Cash Surplus to Your Shop:</span>
                  <span className="font-mono text-base text-[#201B17]">
                    +${netMonthlyProfit.toLocaleString()} / mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Break-Even Highlight Banner (No Cards, Architectural Hairline Strip) */}
        <div className="border-y border-[#E2DDD1] py-4 px-5 bg-[#FAF8F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#201B17]">
            <Check className="w-4 h-4 text-[#E6AF47] shrink-0" />
            <span className="font-mono font-semibold">
              Break-Even Threshold: {breakEvenJobs} jobs / month
            </span>
            <span className="text-[#736A5E] hidden md:inline">
              — Just 1 recovered repair or replacement covers the entire $397 monthly fee.
            </span>
          </div>
          <span className="text-xs font-mono text-[#736A5E]">
            Annual net run-rate: +${annualNetProfit.toLocaleString()}/yr
          </span>
        </div>

        {/* Action Button & Note */}
        <div className="mt-12 text-center space-y-3">
          <button
            type="button"
            onClick={onOpenAudit}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wide text-[#201B17] bg-[#F3C363] border border-[#201B17]/20 rounded-xs hover:bg-[#E6AF47] active:scale-[0.99] transition-all cursor-pointer shadow-xs hover:shadow"
          >
            <span>Request Your Free Plumbing Revenue Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-[#736A5E]">
            We test your actual phone response times and call intake. Delivered in 24–48 hours to{' '}
            <span className="font-mono font-bold text-[#201B17]">ollie.os@aol.com</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
