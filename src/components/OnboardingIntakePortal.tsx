import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Send,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import { OnboardingIntakeData, CallIntakeMode, FollowUpCadence } from '../types';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY'
];

const BOTTLENECKS = [
  { id: 'daytime', label: 'Unanswered daytime rings while technicians are on jobs, under sinks, or driving' },
  { id: 'after_hours', label: 'After-hours & weekend emergency callers hanging up and dialing the next plumber on Google' },
  { id: 'stalled_quotes', label: 'High-ticket quotes ($1,500+ water heaters, repipes, sewer lines) going cold with zero follow-up' },
  { id: 'reviews', label: 'Competitors outranking us on Google Maps due to higher review velocity and fresher check-ins' },
  { id: 'triage', label: 'Lack of structured triage to separate emergency flood calls from general price shoppers' },
];

interface OnboardingIntakePortalProps {
  onOpenSpecs?: () => void;
  middleSections?: React.ReactNode;
}

export const OnboardingIntakePortal: React.FC<OnboardingIntakePortalProps> = ({ onOpenSpecs, middleSections }) => {
  const targetEmail = 'ollie.os@aol.com';

  const [formData, setFormData] = useState<OnboardingIntakeData>({
    businessName: '',
    fullName: '',
    email: '',
    phone: '',
    state: 'TX',
    truckCount: '2–4 Service Vans',
    currentSoftware: 'ServiceTitan',
    missedCalls: 25,
    avgTicket: 850,
    selectedChallenges: [
      'Unanswered daytime rings while technicians are on jobs, under sinks, or driving',
      'After-hours & weekend emergency callers hanging up and dialing the next plumber on Google',
      'High-ticket quotes ($1,500+ water heaters, repipes, sewer lines) going cold with zero follow-up',
    ],
    callIntakeMode: '24_7_ai_intake',
    followUpCadence: 'standard',
    enableReviews: true,
    enableGmbSync: true,
    emergencyDispatchPhone: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [dossierId, setDossierId] = useState<string>('');
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);

  // Live dynamic calculations
  const safeCalls = Math.max(0, Number(formData.missedCalls) || 0);
  const safeTicket = Math.max(0, Number(formData.avgTicket) || 0);
  const lostPipeline = Math.round(safeCalls * safeTicket);
  const recoveredJobs = Math.round((safeCalls * 0.25) * 10) / 10;
  const recoveredRevenue = Math.round(recoveredJobs * safeTicket);
  const grossProfit = Math.round(recoveredRevenue * 0.55);
  const netSurplus = Math.max(0, grossProfit - 397);
  const breakEvenJobs = (397 / Math.max(1, safeTicket * 0.55)).toFixed(1);

  const toggleChallenge = (label: string) => {
    const exists = formData.selectedChallenges.includes(label);
    const updated = exists
      ? formData.selectedChallenges.filter((c) => c !== label)
      : [...formData.selectedChallenges, label];
    setFormData({ ...formData, selectedChallenges: updated });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      errs.businessName = 'Plumbing firm name is required';
    }
    if (!formData.fullName.trim()) {
      errs.fullName = 'Owner or master plumber name is required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Valid work email is required';
    }
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Valid 10-digit direct phone is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateBriefText = (idCode: string) => {
    return [
      `=============================================================`,
      `OLLIE MANAGED PLUMBING REVENUE SYSTEM — 5-STAGE CLIENT INTAKE`,
      `Dossier ID:     ${idCode}`,
      `Routing Target: ${targetEmail}`,
      `Timestamp:      ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
      `=============================================================`,
      ``,
      `STAGE 01: SHOP QUALIFICATION & CONTACT`,
      `   Plumbing Firm:   ${formData.businessName || 'Callahan Plumbing'}`,
      `   Master / Owner:  ${formData.fullName || 'Mike Callahan'}`,
      `   Direct Phone:    ${formData.phone || 'Pending'} (Test call recipient)`,
      `   Work Email:      ${formData.email || 'Pending'}`,
      `   Operating State: ${formData.state}`,
      `   Fleet Size:      ${formData.truckCount}`,
      `   Field Software:  ${formData.currentSoftware}`,
      ``,
      `STAGE 02: INQUIRY CAPTURE & DISPATCH PROTOCOL`,
      `   Intake Protocol: ${
        formData.callIntakeMode === '24_7_ai_intake'
          ? '24/7 Full Voice Intake & Live Emergency Triage'
          : formData.callIntakeMode === 'after_hours_overflow'
          ? 'After-Hours & Weekend Overflow Answering'
          : 'Instant Missed-Call SMS Auto-Responder'
      }`,
      `   Dispatch Phone:  ${formData.emergencyDispatchPhone || formData.phone || 'Primary'}`,
      ``,
      `STAGE 03: OPERATIONAL LEAKAGE & REVENUE RECOVERY`,
      `   Missed Calls:    ${formData.missedCalls} calls / month`,
      `   Average Ticket:  $${formData.avgTicket} per completed job`,
      `   Pipeline Leaked: -$${lostPipeline.toLocaleString()} / month currently lost`,
      `   Ollie Capture:   +$${recoveredRevenue.toLocaleString()} / month (~${recoveredJobs} jobs)`,
      `   Net Cash Gain:   +$${netSurplus.toLocaleString()} / mo (After $397 flat retainer)`,
      `   Identified Leaks:`,
      ...formData.selectedChallenges.map((c) => `     - ${c}`),
      `   Follow-Up Cadence:${
        formData.followUpCadence === 'aggressive'
          ? 'Priority Cadence (24h, 72h, 7d)'
          : 'Standard Friendly Cadence (48h, 5d, 10d)'
      }`,
      ``,
      `STAGE 04: GOOGLE REVIEWS & LOCAL PROFILE CARE`,
      `   Google Reviews:  ${formData.enableReviews ? 'Enabled' : 'Disabled'}`,
      `   Map Profile Care:${formData.enableGmbSync ? 'Enabled' : 'Disabled'}`,
      formData.notes ? `   Special Setup:   ${formData.notes}` : '',
      ``,
      `STAGE 05: SUBSCRIPTION & CONTINUOUS MONITORING`,
      `   Subscription:    Ollie Complete ($397 / month flat)`,
      `   Terms:           Month-to-month, cancel anytime with 14 days notice`,
      `   Safeguards:      Zero lead buying. 100% human-verified dispatch. Data owned by shop.`,
      `=============================================================`,
      `Action: Please initiate 24-48 hour diagnostic & schedule verification test call.`,
    ].filter(Boolean).join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstErr = document.querySelector('[data-has-error="true"]');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    const newId = `OL-${Math.floor(10000 + Math.random() * 90000)}`;
    setDossierId(newId);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const brief = generateBriefText(newId);
      const subject = encodeURIComponent(`Client Onboarding & Intake: ${formData.businessName} [${newId}]`);
      const body = encodeURIComponent(brief);
      const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      try {
        window.location.href = mailtoUrl;
      } catch (err) {
        console.warn('Mail client launcher triggered', err);
      }
    }, 400);
  };

  const copyToClipboard = () => {
    const text = generateBriefText(dossierId || 'OL-DRAFT');
    navigator.clipboard.writeText(text);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {!isSubmitted ? (
        <div className="space-y-24 sm:space-y-32">

          {/* ========================================================= */}
          {/* SECTION 1 (70% WEIGHT): THE REAL PROBLEMS WE SOLVE        */}
          {/* Unfiltered, clear reality of where plumbing shops bleed   */}
          {/* ========================================================= */}
          <section id="problems-we-solve" className="space-y-12 sm:space-y-16">
            {/* Centered Editorial Header */}
            <div className="space-y-4 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#A25A3C] font-semibold mx-auto">
                <span className="w-2 h-2 rounded-full bg-[#A25A3C]" />
                <span>The Diagnostic Reality // 70% Problems We Solve</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.08]">
                Plumbing work is brutal.{' '}
                <span className="italic font-normal text-[#4A433B] block sm:inline">
                  Losing $15,000 to $30,000 every month in missed calls shouldn&apos;t be.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#736A5E] font-serif leading-relaxed max-w-2xl mx-auto">
                When technicians are under sinks, soldering copper, or running main snakes, phones keep ringing. Here is the exact breakdown of how independent shops bleed revenue:
              </p>
            </div>

            {/* Clean 4-Problem Breakdown */}
            <div className="divide-y divide-[#E2DDD1] border-y border-[#201B17]">
              {/* Problem 01 */}
              <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-baseline">
                <div className="md:col-span-4 space-y-1">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A25A3C] font-bold block">
                    Problem 01 · Daytime Leakage
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-[#201B17]">
                    62% of Callers
                  </div>
                  <div className="text-xs font-mono text-[#736A5E]">
                    Hang up on voicemail & call competitor #2
                  </div>
                </div>
                <div className="md:col-span-8 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#201B17]">
                    The technician is on a job; the $1,800 water heater inquiry goes to voicemail.
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A433B] leading-relaxed">
                    Homeowners with active leaks or cold water never leave messages. They hang up in 4 seconds and dial the next plumber on Google Maps. If nobody answers within 2 rings with authority, the job slips away forever.
                  </p>
                </div>
              </div>

              {/* Problem 02 */}
              <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-baseline">
                <div className="md:col-span-4 space-y-1">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A25A3C] font-bold block">
                    Problem 02 · After-Hours Void
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-[#201B17]">
                    7:15 PM Floods
                  </div>
                  <div className="text-xs font-mono text-[#736A5E]">
                    Answering services take messages that arrive 8h late
                  </div>
                </div>
                <div className="md:col-span-8 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#201B17]">
                    Generic answering services charge $3.50/min and have zero plumbing triage knowledge.
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A433B] leading-relaxed">
                    Emergency pipe bursts happen on evenings and weekends. Generic call centers tell panicked homeowners &ldquo;someone will call you tomorrow morning,&rdquo; causing them to dial private-equity emergency franchises instead.
                  </p>
                </div>
              </div>

              {/* Problem 03 */}
              <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-baseline">
                <div className="md:col-span-4 space-y-1">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A25A3C] font-bold block">
                    Problem 03 · Cold Estimates
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-[#201B17]">
                    $45,000+ Sent
                  </div>
                  <div className="text-xs font-mono text-[#736A5E]">
                    Zero structured follow-up after the PDF is emailed
                  </div>
                </div>
                <div className="md:col-span-8 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#201B17]">
                    High-ticket quotes ($1,500 to $9,000) stall because technicians have zero time to make sales calls.
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A433B] leading-relaxed">
                    You inspected the water line, wrote up the estimate in ServiceTitan or Jobber, and emailed it. The customer gets busy. Without polite check-in texts at 48 hours and 5 days, 20%+ of your quotes die from sheer silence.
                  </p>
                </div>
              </div>

              {/* Problem 04 */}
              <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-baseline">
                <div className="md:col-span-4 space-y-1">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A25A3C] font-bold block">
                    Problem 04 · Google Map Decay
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-[#201B17]">
                    Outranked
                  </div>
                  <div className="text-xs font-mono text-[#736A5E]">
                    By franchise shops with fresher reviews
                  </div>
                </div>
                <div className="md:col-span-8 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#201B17]">
                    Delivering 5-star master craftsmanship, but forgetting to ask for the review before driving off.
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A433B] leading-relaxed">
                    Happy homeowners promise to leave a Google review, but once hot water is restored, life moves on. Without a clean, 1-tap SMS link sent immediately upon job completion, your Google Map ranking stagnates.
                  </p>
                </div>
              </div>
            </div>

            {/* Clear Bridge */}
            <div className="flex flex-col sm:flex-row items-baseline justify-between pt-2 gap-4 border-b border-[#D4CEBF] pb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#201B17] font-bold block">
                  The Conservative Net Loss
                </span>
                <p className="text-sm text-[#736A5E]">
                  A typical 2–4 van shop loses <strong className="text-[#201B17] font-mono">$21,250/mo</strong> in unrecovered calls and un-followed quotes.
                </p>
              </div>
              <a
                href="#the-solution"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#201B17] hover:underline"
              >
                <span>Read the Managed Solution (20%)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </section>


          {/* ========================================================= */}
          {/* SECTION 2 (20% WEIGHT): THE MANAGED SOLUTION               */}
          {/* How Ollie plugs every leak with zero tech burden for you   */}
          {/* ========================================================= */}
          <section id="the-solution" className="pt-16 sm:pt-20 space-y-12">
            {/* Solution Header (Centered) */}
            <div className="space-y-3 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#736A5E] font-semibold mx-auto">
                <span className="w-2 h-2 rounded-full bg-[#E6AF47]" />
                <span>The Engineered Remedy // 20% Solution</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.12]">
                One fully managed revenue system.{' '}
                <span className="italic font-normal text-[#4A433B] block sm:inline">
                  No software to learn. No staff to hire.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#736A5E] font-serif leading-relaxed max-w-2xl mx-auto">
                Ollie sits on top of your existing phone number and dispatch tool (ServiceTitan, Housecall Pro, Jobber, QuickBooks). We do not sell leads. We capture the high-intent calls you are already paying for.
              </p>
            </div>

            {/* 3 Pillars of the Ollie Solution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="border-t-2 border-[#201B17] pt-5 space-y-3 text-center sm:text-left">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#736A5E]">
                  Pillar 01 · 2-Ring Voice Intake
                </div>
                <h4 className="text-xl font-serif font-medium text-[#201B17]">
                  Instant Answering & Emergency Flood Triage
                </h4>
                <p className="text-sm text-[#4A433B] leading-relaxed">
                  Every call answered in under 2 rings with custom plumbing knowledge: symptoms, address, shutoff status, and instant dispatch notifications.
                </p>
              </div>

              <div className="border-t-2 border-[#201B17] pt-5 space-y-3 text-center sm:text-left">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#736A5E]">
                  Pillar 02 · Estimate Recapture
                </div>
                <h4 className="text-xl font-serif font-medium text-[#201B17]">
                  Polite, Automated Quote Follow-Ups
                </h4>
                <p className="text-sm text-[#4A433B] leading-relaxed">
                  Respectful 48h and 5d check-in texts for open quotes ($1,500+). Halts the exact split-second the customer replies or confirms.
                </p>
              </div>

              <div className="border-t-2 border-[#201B17] pt-5 space-y-3 text-center sm:text-left">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#736A5E]">
                  Pillar 03 · Reputation Velocity
                </div>
                <h4 className="text-xl font-serif font-medium text-[#201B17]">
                  Post-Job Google 3-Pack Protection
                </h4>
                <p className="text-sm text-[#4A433B] leading-relaxed">
                  One-tap SMS review requests sent within 15 minutes of job completion, keeping your Google Map ranking impenetrable without review gating.
                </p>
              </div>
            </div>

            {/* Smooth transition strip down to Pricing, FAQ, and Onboarding */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-b border-[#D4CEBF] py-5 gap-4">
              <div className="font-mono text-xs text-[#201B17]">
                <span className="font-bold uppercase tracking-wider block">Turnkey Managed Retainer</span>
                <span className="text-[#736A5E]">$397/mo flat · Month-to-month · Zero setup fees · Cancel anytime</span>
              </div>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#201B17] bg-[#F3C363] hover:bg-[#E6AF47] rounded-xs shadow-2xs transition-colors"
              >
                <span>Review Pricing & Inclusions Below</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* RENDER INLINE PRICING & FAQ SECTIONS HERE BEFORE THE ONBOARDING INTAKE FORM */}
          {middleSections}

          {/* ========================================================= */}
          {/* SECTION 3 (10% WEIGHT): ONBOARDING / INTAKE FORM          */}
          {/* Direct, clean 5-stage setup for your plumbing business    */}
          {/* ========================================================= */}
          <div id="onboarding-intake-form" className="pt-16 sm:pt-20 border-t border-[#201B17] space-y-12">
            {/* Intake Intro & Control Architecture */}
            <div className="space-y-6 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#201B17] font-bold mx-auto border border-[#201B17]/20 px-3 py-1 rounded-xs bg-[#EFECE4]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6AF47]" />
                <span>Shop Intake // 10% Activation Step</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.12] mx-auto">
                Direct Shop Onboarding & Diagnostic Intake
              </h2>
              <p className="text-base sm:text-lg text-[#736A5E] font-serif italic leading-relaxed max-w-2xl mx-auto">
                Complete your shop&apos;s baseline in the 5 stages below. All specifications route directly to <strong className="text-[#201B17] font-mono not-italic">{targetEmail}</strong> for 24–48 hour diagnostic turnaround.
              </p>

              {/* 5-Stage Fast-Navigation Pipeline Strip */}
              <div className="pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-y border-[#D4CEBF] py-3 text-xs font-mono">
                  <div className="space-y-0.5 text-center">
                    <span className="text-[#A25A3C] font-bold block">01 · Baseline</span>
                    <span className="text-[11px] text-[#736A5E]">Qualification</span>
                  </div>
                  <div className="space-y-0.5 text-center border-l border-[#E2DDD1]">
                    <span className="text-[#201B17] font-bold block">02 · Triage</span>
                    <span className="text-[11px] text-[#736A5E]">Voice Protocol</span>
                  </div>
                  <div className="space-y-0.5 text-center border-l border-[#E2DDD1]">
                    <span className="text-[#201B17] font-bold block">03 · Recapture</span>
                    <span className="text-[11px] text-[#736A5E]">Quote Follow-Up</span>
                  </div>
                  <div className="space-y-0.5 text-center border-l border-[#E2DDD1]">
                    <span className="text-[#201B17] font-bold block">04 · Reputation</span>
                    <span className="text-[11px] text-[#736A5E]">Google 3-Pack</span>
                  </div>
                  <div className="space-y-0.5 text-center border-l border-[#E2DDD1] col-span-2 sm:col-span-1">
                    <span className="text-[#201B17] font-bold block">05 · Dispatch</span>
                    <span className="text-[11px] text-[#736A5E]">$397/mo & Launch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* THE 5-STAGE UNIFIED INTAKE FORM */}
            <form onSubmit={handleSubmit} noValidate className="space-y-16 sm:space-y-24 pt-2">

              {/* ========================================================= */}
              {/* STAGE 01: SHOP QUALIFICATION & DIAGNOSTIC                */}
              {/* ========================================================= */}
              <section className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
                  {/* LEFT SIDE: Stage & Timeline */}
                  <div className="md:col-span-3 lg:col-span-3 md:sticky md:top-28 space-y-2">
                    <div className="space-y-1">
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#736A5E] font-medium">
                        Stage 01
                      </div>
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#201B17]">
                        24–48 Hours
                      </div>
                    </div>
                    <div className="hidden md:block w-10 h-[1px] bg-[#D4CEBF] mt-4" />
                    <div className="text-[11px] font-mono text-[#736A5E] hidden md:block pt-2 leading-relaxed">
                      Audit dispatched to <span className="text-[#201B17] font-semibold">{targetEmail}</span>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Redesigned Body */}
                  <div className="md:col-span-9 lg:col-span-9 space-y-10">
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#201B17] font-bold">
                        Shop Qualification & Diagnostic
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.15]">
                        Free Revenue Audit & Client Intake
                      </h3>
                      <p className="text-sm sm:text-base text-[#4A433B] font-serif italic">
                        We inspect your current intake and local footprint.
                      </p>
                      <p className="text-xs sm:text-sm text-[#736A5E] max-w-2xl leading-relaxed pt-1">
                        Independent plumbing shops lose thousands each month to unanswered calls and cold quotes. Type your shop&apos;s baseline directly below to claim your diagnostic.
                      </p>
                    </div>

                    {/* Step 1.A: Primary Identity Fields */}
                    <div className="space-y-6">
                      <div className="border-b border-[#D4CEBF] pb-2 flex items-baseline justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#201B17] font-bold">
                          Primary Shop & Owner Verification
                        </span>
                        <span className="text-[11px] font-mono text-[#736A5E]">Required for 24h turnaround</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
                        <div data-has-error={!!errors.businessName} className="space-y-1.5">
                          <label htmlFor="businessName" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                            Plumbing Business Name <span className="text-[#A25A3C]">*</span>
                          </label>
                          <input
                            id="businessName"
                            type="text"
                            placeholder="Callahan Plumbing & Drain"
                            value={formData.businessName}
                            onChange={(e) => {
                              setFormData({ ...formData, businessName: e.target.value });
                              if (errors.businessName) setErrors({ ...errors, businessName: '' });
                            }}
                            className={`w-full bg-transparent border-0 border-b pb-2 text-xl font-serif text-[#201B17] placeholder:text-[#C5BDB0] placeholder:font-sans focus:outline-none transition-colors ${
                              errors.businessName ? 'border-[#A25A3C]' : 'border-[#D4CEBF] focus:border-[#201B17]'
                            }`}
                          />
                          {errors.businessName && <p className="text-[11px] font-mono text-[#A25A3C]">{errors.businessName}</p>}
                        </div>

                        <div data-has-error={!!errors.fullName} className="space-y-1.5">
                          <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                            Master Plumber / Owner Name <span className="text-[#A25A3C]">*</span>
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            placeholder="Mike Callahan"
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData({ ...formData, fullName: e.target.value });
                              if (errors.fullName) setErrors({ ...errors, fullName: '' });
                            }}
                            className={`w-full bg-transparent border-0 border-b pb-2 text-xl font-serif text-[#201B17] placeholder:text-[#C5BDB0] placeholder:font-sans focus:outline-none transition-colors ${
                              errors.fullName ? 'border-[#A25A3C]' : 'border-[#D4CEBF] focus:border-[#201B17]'
                            }`}
                          />
                          {errors.fullName && <p className="text-[11px] font-mono text-[#A25A3C]">{errors.fullName}</p>}
                        </div>

                        <div data-has-error={!!errors.email} className="space-y-1.5">
                          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                            Work Email (For Audit Delivery) <span className="text-[#A25A3C]">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="mike@callahanplumbing.com"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            className={`w-full bg-transparent border-0 border-b pb-2 text-base sm:text-lg font-mono text-[#201B17] placeholder:text-[#C5BDB0] placeholder:font-sans focus:outline-none transition-colors ${
                              errors.email ? 'border-[#A25A3C]' : 'border-[#D4CEBF] focus:border-[#201B17]'
                            }`}
                          />
                          {errors.email && <p className="text-[11px] font-mono text-[#A25A3C]">{errors.email}</p>}
                        </div>

                        <div data-has-error={!!errors.phone} className="space-y-1.5">
                          <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                            Direct Mobile (For Verification Test Call) <span className="text-[#A25A3C]">*</span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="(555) 234-5678"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full bg-transparent border-0 border-b pb-2 text-base sm:text-lg font-mono text-[#201B17] placeholder:text-[#C5BDB0] placeholder:font-sans focus:outline-none transition-colors ${
                              errors.phone ? 'border-[#A25A3C]' : 'border-[#D4CEBF] focus:border-[#201B17]'
                            }`}
                          />
                          {errors.phone && <p className="text-[11px] font-mono text-[#A25A3C]">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Step 1.B: Operational Baseline & Software */}
                    <div className="space-y-6 pt-2">
                      <div className="border-b border-[#D4CEBF] pb-2 flex items-baseline justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#201B17] font-bold">
                          Operations & Software Footprint
                        </span>
                        <span className="text-[11px] font-mono text-[#736A5E]">Invoicing & dispatch</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                        <div className="space-y-1.5">
                          <label htmlFor="state" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                            Operating State <span className="text-[#A25A3C]">*</span>
                          </label>
                          <div className="relative">
                            <select
                              id="state"
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              className="w-full bg-transparent border-0 border-b border-[#D4CEBF] focus:border-[#201B17] pb-2 text-base font-serif text-[#201B17] cursor-pointer appearance-none focus:outline-none"
                            >
                              {US_STATES.map((st) => (
                                <option key={st} value={st}>
                                  {st} — United States
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-[#736A5E] absolute right-0 top-1 pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="truckCount" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                            Active Service Fleet
                          </label>
                          <div className="relative">
                            <select
                              id="truckCount"
                              value={formData.truckCount}
                              onChange={(e) => setFormData({ ...formData, truckCount: e.target.value })}
                              className="w-full bg-transparent border-0 border-b border-[#D4CEBF] focus:border-[#201B17] pb-2 text-base font-serif text-[#201B17] cursor-pointer appearance-none focus:outline-none"
                            >
                              <option value="1 Van (Solo Master)">1 Van (Solo Master)</option>
                              <option value="2–4 Service Vans">2–4 Service Vans</option>
                              <option value="5–9 Service Vans">5–9 Service Vans</option>
                              <option value="10+ Commercial Fleet">10+ Commercial Fleet</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-[#736A5E] absolute right-0 top-1 pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="software" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                            Dispatch / Invoicing Tool
                          </label>
                          <div className="relative">
                            <select
                              id="software"
                              value={formData.currentSoftware}
                              onChange={(e) => setFormData({ ...formData, currentSoftware: e.target.value })}
                              className="w-full bg-transparent border-0 border-b border-[#D4CEBF] focus:border-[#201B17] pb-2 text-base font-serif text-[#201B17] cursor-pointer appearance-none focus:outline-none"
                            >
                              <option value="ServiceTitan">ServiceTitan</option>
                              <option value="Housecall Pro">Housecall Pro</option>
                              <option value="Jobber">Jobber</option>
                              <option value="FieldEdge">FieldEdge</option>
                              <option value="QuickBooks / Paper">QuickBooks / Paper</option>
                              <option value="Other / Proprietary">Other / Custom</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-[#736A5E] absolute right-0 top-1 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================= */}
              {/* STAGE 02: CAPTURE THE INQUIRY & TRIAGE CALLS             */}
              {/* ========================================================= */}
              <section className="pt-16 sm:pt-20 border-t border-[#E2DDD1]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
                  {/* LEFT SIDE: Stage & Timeline */}
                  <div className="md:col-span-3 lg:col-span-3 md:sticky md:top-28 space-y-2">
                    <div className="space-y-1">
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#736A5E] font-medium">
                        Stage 02
                      </div>
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#201B17]">
                        Under 2 Rings
                      </div>
                    </div>
                    <div className="hidden md:block w-10 h-[1px] bg-[#D4CEBF] mt-4" />
                  </div>

                  {/* RIGHT SIDE: Unified Body */}
                  <div className="md:col-span-9 lg:col-span-9 space-y-8">
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#201B17] font-bold">
                        Voice Intake & Live Triage Protocol
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.15]">
                        Capture The Inquiry & Triage Calls
                      </h3>
                      <p className="text-sm sm:text-base text-[#4A433B] font-serif italic">
                        Configured AI call answering & immediate missed-call recovery with strict dispatch rules.
                      </p>
                      <p className="text-xs sm:text-sm text-[#736A5E] max-w-2xl leading-relaxed pt-1">
                        Calls during agreed coverage are answered in 2 rings, capturing caller address, plumbing symptoms, and water shutoff status.
                      </p>
                    </div>

                    {/* Stage 2 Call Protocol Options (Unboxed Radio List) */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium block">
                        Select Primary Phone Intake Protocol:
                      </span>
                      <div className="divide-y divide-[#EAE5D9] border-y border-[#D4CEBF]">
                        {[
                          {
                            mode: '24_7_ai_intake' as CallIntakeMode,
                            title: '24/7 Full Voice Intake & Live Emergency Triage',
                            badge: 'Recommended',
                            desc: 'Answers every call within 2 rings, captures caller symptoms and emergency shutoffs, and routes alerts directly.',
                          },
                          {
                            mode: 'after_hours_overflow' as CallIntakeMode,
                            title: 'After-Hours & Weekend Overflow Only',
                            badge: '5:00 PM – 8:00 AM',
                            desc: 'Your office takes daytime calls; Ollie automatically takes over evenings and full weekends.',
                          },
                          {
                            mode: 'instant_sms_auto' as CallIntakeMode,
                            title: 'Instant Missed-Call SMS Auto-Responder',
                            badge: 'Text-Only Fallback',
                            desc: 'Immediate text check-in whenever a call goes unanswered before the customer dials a competitor.',
                          },
                        ].map((opt) => {
                          const isSelected = formData.callIntakeMode === opt.mode;
                          return (
                            <div
                              key={opt.mode}
                              onClick={() => setFormData({ ...formData, callIntakeMode: opt.mode })}
                              className="py-4 flex items-start gap-4 cursor-pointer group select-none hover:text-[#201B17] transition-colors"
                            >
                              <span className="font-mono text-base font-bold text-[#201B17] shrink-0 mt-0.5">
                                {isSelected ? '( • )' : '(   )'}
                              </span>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className={`text-base font-serif ${
                                    isSelected ? 'text-[#201B17] font-bold' : 'text-[#4A433B]'
                                  }`}>
                                    {opt.title}
                                  </span>
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#736A5E] border-b border-[#D4CEBF]">
                                    {opt.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-[#736A5E] leading-relaxed">{opt.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Emergency Dispatch Phone */}
                    <div className="space-y-1.5 pt-2">
                      <label htmlFor="dispatchPhone" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                        On-Call Tech Dispatch Mobile (For Urgent Alerts)
                      </label>
                      <input
                        id="dispatchPhone"
                        type="tel"
                        placeholder={formData.phone || '(555) 000-0000'}
                        value={formData.emergencyDispatchPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyDispatchPhone: e.target.value })}
                        className="w-full bg-transparent border-0 border-b border-[#D4CEBF] focus:border-[#201B17] pb-2 text-base font-mono text-[#201B17] placeholder:text-[#C5BDB0] focus:outline-none"
                      />
                      <p className="text-[11px] text-[#736A5E]">
                        Where Ollie forwards emergency flood and water shutoff calls. Defaults to your primary phone.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================= */}
              {/* STAGE 03: ESTIMATE RECOVERY & LEAKAGE CALCULATOR         */}
              {/* ========================================================= */}
              <section className="pt-16 sm:pt-20 border-t border-[#E2DDD1]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
                  {/* LEFT SIDE: Stage & Timeline */}
                  <div className="md:col-span-3 lg:col-span-3 md:sticky md:top-28 space-y-2">
                    <div className="space-y-1">
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#736A5E] font-medium">
                        Stage 03
                      </div>
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#201B17]">
                        Estimate Recovery
                      </div>
                    </div>
                    <div className="hidden md:block w-10 h-[1px] bg-[#D4CEBF] mt-4" />
                  </div>

                  {/* RIGHT SIDE: Unified Body */}
                  <div className="md:col-span-9 lg:col-span-9 space-y-10">
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#201B17] font-bold">
                        Pipeline Leakage & Follow-Up Automation
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.15]">
                        Move Opportunities Forward & Stop Leakage
                      </h3>
                      <p className="text-sm sm:text-base text-[#4A433B] font-serif italic">
                        Centralized inquiry triage and respectful open-estimate follow-ups.
                      </p>
                      <p className="text-xs sm:text-sm text-[#736A5E] max-w-2xl leading-relaxed pt-1">
                        Every inquiry enters a centralized queue. Open quotes receive polite follow-ups that halt immediately upon any customer response.
                      </p>
                    </div>

                    {/* Streamlined Numeric Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between text-xs font-mono uppercase tracking-wider text-[#736A5E]">
                          <span>Estimated Monthly Missed Calls</span>
                          <span>calls / mo</span>
                        </div>
                        <div className="flex items-baseline border-b border-[#201B17] pb-2">
                          <input
                            id="calc-calls"
                            type="number"
                            min="0"
                            max="1000"
                            step="1"
                            value={formData.missedCalls}
                            onChange={(e) => setFormData({ ...formData, missedCalls: Number(e.target.value) || 0 })}
                            className="w-full bg-transparent border-0 text-3xl sm:text-4xl font-mono font-bold text-[#201B17] focus:outline-none"
                          />
                          <span className="text-xs font-mono text-[#736A5E] shrink-0 pl-2">unanswered rings</span>
                        </div>
                        <p className="text-xs text-[#736A5E]">
                          Calls while technicians are on jobs or after hours that slip to competitors.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between text-xs font-mono uppercase tracking-wider text-[#736A5E]">
                          <span>Average Completed Job Value</span>
                          <span>USD ($) / ticket</span>
                        </div>
                        <div className="flex items-baseline border-b border-[#201B17] pb-2">
                          <span className="text-2xl font-mono text-[#736A5E] mr-1">$</span>
                          <input
                            id="calc-ticket"
                            type="number"
                            min="50"
                            step="50"
                            value={formData.avgTicket}
                            onChange={(e) => setFormData({ ...formData, avgTicket: Number(e.target.value) || 0 })}
                            className="w-full bg-transparent border-0 text-3xl sm:text-4xl font-mono font-bold text-[#201B17] focus:outline-none"
                          />
                          <span className="text-xs font-mono text-[#736A5E] shrink-0 pl-2">per completed ticket</span>
                        </div>
                        <p className="text-xs text-[#736A5E]">
                          Blended average across routine service, drain cleanouts, and water heater installs.
                        </p>
                      </div>
                    </div>

                    {/* Elegant, Uncluttered Ledger Summary */}
                    <div className="border-t border-b border-[#D4CEBF] py-5">
                      <div className="flex items-center justify-between pb-3 text-xs font-mono uppercase tracking-wider text-[#736A5E]">
                        <span>Real-Time Mathematical Output</span>
                        <span>Conservative 25% Capture</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
                        <div className="space-y-1">
                          <div className="text-[11px] font-mono text-[#736A5E] uppercase tracking-wider">
                            Pipeline Currently Leaking
                          </div>
                          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#A25A3C]">
                            -${lostPipeline.toLocaleString()}
                          </div>
                          <div className="text-xs text-[#736A5E] font-mono">
                            {safeCalls} missed calls × ${safeTicket} ticket
                          </div>
                        </div>

                        <div className="space-y-1 sm:border-l sm:border-[#E2DDD1] sm:pl-6">
                          <div className="text-[11px] font-mono text-[#736A5E] uppercase tracking-wider">
                            Monthly Ollie Recapture
                          </div>
                          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#201B17]">
                            +${recoveredRevenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-[#201B17] font-mono font-medium">
                            ≈ ~{recoveredJobs} additional booked jobs / mo
                          </div>
                        </div>

                        <div className="space-y-1 sm:border-l sm:border-[#E2DDD1] sm:pl-6">
                          <div className="text-[11px] font-mono text-[#736A5E] uppercase tracking-wider">
                            Net Surplus to Your Shop
                          </div>
                          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#201B17]">
                            +${netSurplus.toLocaleString()}
                          </div>
                          <div className="text-xs text-[#736A5E] font-mono">
                            After $397 Ollie fee (Break-even: {breakEvenJobs} jobs)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Identified Bottlenecks Checklist - Clean & Editorial */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-baseline justify-between border-b border-[#D4CEBF] pb-2">
                        <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#201B17] font-semibold">
                          Select Your Shop's Identified Bottlenecks
                        </span>
                        <span className="text-[11px] font-mono text-[#736A5E]">
                          Select all that apply
                        </span>
                      </div>

                      <div className="divide-y divide-[#EAE5D9]">
                        {BOTTLENECKS.map((b) => {
                          const isChecked = formData.selectedChallenges.includes(b.label);
                          return (
                            <div
                              key={b.id}
                              onClick={() => toggleChallenge(b.label)}
                              className="py-3 flex items-start gap-3 cursor-pointer hover:text-[#201B17] transition-colors group select-none"
                            >
                              <span className={`font-mono text-sm font-bold shrink-0 mt-0.5 ${
                                isChecked ? 'text-[#201B17]' : 'text-[#A0988A]'
                              }`}>
                                [ {isChecked ? '✓' : ' '} ]
                              </span>
                              <p className={`text-sm leading-relaxed ${
                                isChecked ? 'text-[#201B17] font-medium' : 'text-[#635B50]'
                              }`}>
                                {b.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Estimate Follow-Up Cadence - Simple & Breathable */}
                    <div className="space-y-3 pt-2">
                      <div className="border-b border-[#D4CEBF] pb-2">
                        <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#201B17] font-semibold">
                          High-Value Estimate Follow-Up Cadence ($1,500+ Quotes)
                        </span>
                      </div>

                      <div className="divide-y divide-[#EAE5D9]">
                        {[
                          {
                            cadence: 'standard' as FollowUpCadence,
                            title: 'Standard Respectful Cadence (48h, 5d, 10d)',
                            desc: '3 automated check-ins. Immediately stops the instant the customer replies or requests no further contact.',
                          },
                          {
                            cadence: 'aggressive' as FollowUpCadence,
                            title: 'Priority Urgency Cadence (24h, 72h, 7d)',
                            desc: 'Faster touchpoints designed for emergency water heaters and time-sensitive sewer line jobs.',
                          },
                        ].map((opt) => {
                          const isSelected = formData.followUpCadence === opt.cadence;
                          return (
                            <div
                              key={opt.cadence}
                              onClick={() => setFormData({ ...formData, followUpCadence: opt.cadence })}
                              className="py-3 flex items-start gap-3 cursor-pointer hover:text-[#201B17] transition-colors group select-none"
                            >
                              <span className="font-mono text-sm font-bold text-[#201B17] shrink-0 mt-0.5">
                                {isSelected ? '( • )' : '(   )'}
                              </span>
                              <div className="flex-1 space-y-0.5">
                                <span className={`text-sm sm:text-base font-serif block ${
                                  isSelected ? 'text-[#201B17] font-bold' : 'text-[#4A433B]'
                                }`}>
                                  {opt.title}
                                </span>
                                <p className="text-xs text-[#736A5E] leading-relaxed">{opt.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================= */}
              {/* STAGE 04: BUILD TRUST & REPEAT BUSINESS                  */}
              {/* ========================================================= */}
              <section className="pt-16 sm:pt-20 border-t border-[#E2DDD1]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
                  {/* LEFT SIDE: Stage & Timeline */}
                  <div className="md:col-span-3 lg:col-span-3 md:sticky md:top-28 space-y-2">
                    <div className="space-y-1">
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#736A5E] font-medium">
                        Stage 04
                      </div>
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#201B17]">
                        Trust & Reviews
                      </div>
                    </div>
                    <div className="hidden md:block w-10 h-[1px] bg-[#D4CEBF] mt-4" />
                  </div>

                  {/* RIGHT SIDE: Unified Body */}
                  <div className="md:col-span-9 lg:col-span-9 space-y-8">
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#201B17] font-bold">
                        Google Profile & Local Reputation
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.15]">
                        Build Trust & Local Google Presence
                      </h3>
                      <p className="text-sm sm:text-base text-[#4A433B] font-serif italic">
                        Ethical, compliant post-job reviews and consented customer care touchpoints.
                      </p>
                      <p className="text-xs sm:text-sm text-[#736A5E] max-w-2xl leading-relaxed pt-1">
                        Post-completion SMS delivers a clean Google review link for honest feedback. Protects your Google 3-Pack rank without gating.
                      </p>
                    </div>

                    {/* Stage 4 Toggles */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                        Google Map & Reputation Care Workflows:
                      </label>

                      <div className="divide-y divide-[#EAE5D9] border-y border-[#D4CEBF]">
                        <div
                          onClick={() => setFormData({ ...formData, enableReviews: !formData.enableReviews })}
                          className="py-3.5 flex items-start gap-4 cursor-pointer text-xs text-[#201B17] hover:text-black transition-colors select-none"
                        >
                          <span className="font-mono text-sm font-bold shrink-0 mt-0.5">[ {formData.enableReviews ? '✓' : ' '} ]</span>
                          <div>
                            <span className="font-medium text-sm text-[#201B17] block">Send ethical post-job Google review links via SMS</span>
                            <span className="text-xs text-[#736A5E] block mt-0.5">Compliant with FTC and Google guidelines—no review gating or filtering.</span>
                          </div>
                        </div>

                        <div
                          onClick={() => setFormData({ ...formData, enableGmbSync: !formData.enableGmbSync })}
                          className="py-3.5 flex items-start gap-4 cursor-pointer text-xs text-[#201B17] hover:text-black transition-colors select-none"
                        >
                          <span className="font-mono text-sm font-bold shrink-0 mt-0.5">[ {formData.enableGmbSync ? '✓' : ' '} ]</span>
                          <div>
                            <span className="font-medium text-sm text-[#201B17] block">Sync Google Profile holiday hours and plumbing categories</span>
                            <span className="text-xs text-[#736A5E] block mt-0.5">Keeps emergency hours accurate so local homeowners find you first.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-1.5 pt-2">
                      <label htmlFor="notes" className="block text-xs font-mono uppercase tracking-wider text-[#736A5E] font-medium">
                        Special Dispatch Notes / Primary Service Zip Codes (Optional)
                      </label>
                      <input
                        id="notes"
                        type="text"
                        placeholder="e.g. Route water heater calls to Dave. We serve North Austin."
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-transparent border-0 border-b border-[#D4CEBF] focus:border-[#201B17] pb-2 text-sm font-sans text-[#201B17] placeholder:text-[#C5BDB0] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================= */}
              {/* STAGE 05: CONTINUOUS OVERSIGHT & ACTIVATION               */}
              {/* ========================================================= */}
              <section className="pt-16 sm:pt-20 border-t border-[#E2DDD1]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
                  {/* LEFT SIDE: Stage & Timeline */}
                  <div className="md:col-span-3 lg:col-span-3 md:sticky md:top-28 space-y-2">
                    <div className="space-y-1">
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#736A5E] font-medium">
                        Stage 05
                      </div>
                      <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#201B17]">
                        Continuous Oversight
                      </div>
                    </div>
                    <div className="hidden md:block w-10 h-[1px] bg-[#D4CEBF] mt-4" />
                  </div>

                  {/* RIGHT SIDE: Unified Body */}
                  <div className="md:col-span-9 lg:col-span-9 space-y-8">
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#201B17] font-bold">
                        System Oversight & Client Onboarding
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.15]">
                        Monitor The Whole System & Activate
                      </h3>
                      <p className="text-sm sm:text-base text-[#4A433B] font-serif italic">
                        Transparent, unvarnished reporting that flags exceptions instead of faking success.
                      </p>
                      <p className="text-xs sm:text-sm text-[#736A5E] max-w-2xl leading-relaxed pt-1">
                        Unified reporting showing call answers, delivery receipts, customer reply rates, and exceptions. Complete your submission below to route to Ollie.
                      </p>
                    </div>

                    {/* Terms Strip */}
                    <div className="flex flex-col sm:flex-row items-baseline justify-between border-t border-b border-[#201B17] py-5 gap-2">
                      <div>
                        <span className="text-base sm:text-lg font-serif font-bold text-[#201B17] block">
                          Ollie Complete Managed Subscription
                        </span>
                        <span className="text-xs text-[#736A5E]">
                          $397 / month flat · Month-to-month agreement · Cancel anytime with 14 days notice
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 font-mono">
                        <span className="text-3xl sm:text-4xl font-bold text-[#201B17]">$397</span>
                        <span className="text-xs text-[#736A5E]">USD / mo</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#736A5E]">
                      <ShieldCheck className="w-4 h-4 text-[#E6AF47] shrink-0" />
                      <span>
                        Your 5-stage intake brief routes directly to <strong className="text-[#201B17] font-mono">{targetEmail}</strong>. Diagnostic delivered within 24–48 hours.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-base sm:text-lg font-semibold tracking-wide text-[#201B17] bg-[#F3C363] border border-[#201B17]/20 rounded-xs hover:bg-[#E6AF47] active:scale-[0.99] cursor-pointer shadow-xs hover:shadow transition-all disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                      <span>{isSubmitting ? 'Routing 5-Stage Onboarding...' : 'Submit 5-Stage Intake & Claim Free Diagnostic'}</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </section>
        </form>
      </div>
    </div>
  ) : (
        /* CONFIRMED ONBOARDING DOSSIER DISPLAY */
        <div className="space-y-12 animate-in fade-in duration-300">
          <div className="border-b border-[#201B17] pb-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D89E34] font-bold">
                5-Stage Intake Dispatched & Registered
              </span>
              <span className="text-xs font-mono text-[#201B17] font-bold">
                [ ID: {dossierId} ]
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#201B17] font-normal tracking-tight">
              Welcome, {formData.businessName || 'Partner'}
            </h2>
            <p className="text-sm text-[#4A433B] leading-relaxed">
              Your 5-stage intake dossier has been generated and dispatched to{' '}
              <strong className="text-[#201B17] font-mono">{targetEmail}</strong>.
            </p>
          </div>

          {/* 3-Stage Next Steps */}
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[#201B17] font-bold block">
              Deployment Timeline (Next 24–48 Hours):
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#4A433B]">
              <div className="space-y-1.5 border-t border-[#201B17] pt-3">
                <div className="font-mono text-[#201B17] font-bold uppercase text-[11px]">
                  Step 1 // Diagnostic Audit (24–48h)
                </div>
                <p className="leading-relaxed">
                  We inspect your current intake response times and audit your Google profile footprint.
                </p>
              </div>

              <div className="space-y-1.5 border-t border-[#E6AF47] pt-3">
                <div className="font-mono text-[#201B17] font-bold uppercase text-[11px]">
                  Step 2 // Verification Test Call
                </div>
                <p className="leading-relaxed">
                  We dial <strong className="font-mono text-[#201B17]">{formData.phone || 'your phone'}</strong> to test live triage response and emergency leak alerts.
                </p>
              </div>

              <div className="space-y-1.5 border-t border-[#D4CEBF] pt-3">
                <div className="font-mono text-[#201B17] font-bold uppercase text-[11px]">
                  Step 3 // Live Activation
                </div>
                <p className="leading-relaxed">
                  Ollie Complete goes live across your shop&apos;s preferred coverage hours.
                </p>
              </div>
            </div>
          </div>

          {/* Generated Dossier Preview */}
          <div className="space-y-3 pt-4 border-t border-[#E2DDD1]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#736A5E] font-semibold">Your Registered 5-Stage Client Brief:</span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 text-[#201B17] font-bold hover:underline cursor-pointer"
              >
                {copiedBrief ? <Check className="w-3.5 h-3.5 text-[#201B17]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBrief ? 'Copied to Clipboard!' : 'Copy Dossier to Clipboard'}</span>
              </button>
            </div>

            <pre className="font-mono text-xs text-[#4A433B] whitespace-pre-wrap border-y border-[#E2DDD1] py-4 bg-transparent max-h-72 overflow-y-auto">
              {generateBriefText(dossierId)}
            </pre>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center gap-1.5 text-xs text-[#736A5E] hover:text-[#201B17] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify responses or submit another shop</span>
            </button>

            <a
              href={`mailto:${targetEmail}?subject=${encodeURIComponent(`Client Onboarding: ${formData.businessName || 'Plumbing Shop'} [${dossierId}]`)}&body=${encodeURIComponent(generateBriefText(dossierId))}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-[#201B17] bg-[#F3C363] border border-[#201B17]/20 rounded-xs hover:bg-[#E6AF47] shadow-xs"
            >
              <span>Re-launch Mail to {targetEmail}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
