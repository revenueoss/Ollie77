import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle, FileSearch, ShieldCheck, Send, RefreshCw, ChevronDown } from 'lucide-react';
import { AuditFormData } from '../types';

interface RevenueAuditSectionProps {
  id?: string;
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY'
];

export const RevenueAuditSection: React.FC<RevenueAuditSectionProps> = ({ id = 'audit' }) => {
  const [formData, setFormData] = useState<AuditFormData>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    truckCount: '2-4 Vans',
    state: 'TX',
    biggestChallenge: 'Missed calls while technicians are on jobs or under sinks',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AuditFormData, string>>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const targetEmail = 'ollie.os@aol.com';

  const validate = (): boolean => {
    const errs: Partial<Record<keyof AuditFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your name';
    }

    if (!formData.businessName.trim()) {
      errs.businessName = 'Please enter your plumbing company name';
    }

    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Direct phone is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number';
    }

    if (!formData.state.trim()) {
      errs.state = 'State is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getMailtoUrl = (data: AuditFormData) => {
    const subject = encodeURIComponent(`Free Plumbing Revenue Audit Request: ${data.businessName} (${data.fullName})`);
    const bodyText = [
      `PLUMBING REVENUE AUDIT INTAKE BRIEF`,
      `==================================================`,
      `Target Recipient: ${targetEmail}`,
      `Request Date:     ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
      ``,
      `1. CONTACT & ENTERPRISE`,
      `   Contact Name:    ${data.fullName}`,
      `   Plumbing Firm:   ${data.businessName}`,
      `   Work Email:      ${data.email}`,
      `   Direct Phone:    ${data.phone}`,
      `   Primary State:   ${data.state}`,
      ``,
      `2. OPERATIONAL CAPACITY`,
      `   Fleet Size:      ${data.truckCount}`,
      ``,
      `3. IDENTIFIED BOTTLENECK`,
      `   Core Challenge:  ${data.biggestChallenge}`,
      data.notes ? `   Current Software / Notes: ${data.notes}` : '',
      ``,
      `==================================================`,
      `Please deliver the 48-hour diagnostic report to ${data.email}.`,
    ].filter(Boolean).join('\n');

    return `mailto:${targetEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger user's mail client directly to ollie.os@aol.com
      const mailtoLink = getMailtoUrl(formData);
      window.location.href = mailtoLink;
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      truckCount: '2-4 Vans',
      state: 'TX',
      biggestChallenge: 'Missed calls while technicians are on jobs or under sinks',
      notes: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id={id} className="py-14 sm:py-20 bg-[#F7F5F0] border-t border-[#E2DDD1]">
      {/* Reduced Width Container (Fits cleanly on screen, max-w-xl) */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        {/* Centered Section Header */}
        <div className="text-center mb-7">
          <div className="inline-flex flex-col items-center justify-center mb-3">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#201B17] leading-none">01</span>
            <span className="font-mono text-xs text-[#736A5E] mt-1.5 tracking-wider uppercase font-semibold">24–48 Hours</span>
          </div>
          <div className="inline-flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#201B17] font-semibold mb-2">
            <FileSearch className="w-3.5 h-3.5 text-[#E6AF47]" />
            <span>Complimentary Operational Review</span>
          </div>
          <h2 className="text-3xl sm:text-[38px] font-serif font-normal text-[#201B17] tracking-tight leading-[1.15]">
            Get your free plumbing{' '}
            <span className="editorial-highlight text-[#201B17] font-normal inline-block px-2">
              revenue audit.
            </span>
          </h2>
          <p className="mt-2.5 text-sm text-[#4A433B] leading-relaxed">
            Fill in your business details below. Your diagnostic request routes directly to{' '}
            <span className="font-mono text-xs font-bold text-[#201B17] bg-[#F7EEDA] px-1.5 py-0.5 border border-[#ECCB86]">
              {targetEmail}
            </span>.
          </p>
        </div>

        {/* Real Form Layout with Clear Form Fields — NO Card Container */}
        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-2">
            {/* Row 1: Name and Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-[#201B17] mb-1.5">
                  Your Full Name <span className="text-red-700">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Mike Callahan"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  className={`w-full bg-[#FAF8F5] border rounded-xs px-3 py-2.5 text-sm text-[#201B17] placeholder:text-[#9B9285] focus:bg-white focus:outline-hidden focus:border-[#201B17] focus:ring-1 focus:ring-[#201B17] transition-colors ${
                    errors.fullName ? 'border-red-600 bg-red-50/20' : 'border-[#D4CEBF]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="businessName" className="block text-xs font-semibold text-[#201B17] mb-1.5">
                  Plumbing Business Name <span className="text-red-700">*</span>
                </label>
                <input
                  id="businessName"
                  type="text"
                  placeholder="Callahan Plumbing & Drain"
                  value={formData.businessName}
                  onChange={(e) => {
                    setFormData({ ...formData, businessName: e.target.value });
                    if (errors.businessName) setErrors({ ...errors, businessName: undefined });
                  }}
                  className={`w-full bg-[#FAF8F5] border rounded-xs px-3 py-2.5 text-sm text-[#201B17] placeholder:text-[#9B9285] focus:bg-white focus:outline-hidden focus:border-[#201B17] focus:ring-1 focus:ring-[#201B17] transition-colors ${
                    errors.businessName ? 'border-red-600 bg-red-50/20' : 'border-[#D4CEBF]'
                  }`}
                />
                {errors.businessName && <p className="text-[11px] text-red-600 mt-1">{errors.businessName}</p>}
              </div>
            </div>

            {/* Row 2: Work Email and Direct Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#201B17] mb-1.5">
                  Work Email (For Audit Delivery) <span className="text-red-700">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mike@callahanplumbing.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full bg-[#FAF8F5] border rounded-xs px-3 py-2.5 text-sm text-[#201B17] placeholder:text-[#9B9285] focus:bg-white focus:outline-hidden focus:border-[#201B17] focus:ring-1 focus:ring-[#201B17] transition-colors ${
                    errors.email ? 'border-red-600 bg-red-50/20' : 'border-[#D4CEBF]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-[#201B17] mb-1.5">
                  Direct Phone (For Test Call) <span className="text-red-700">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 012-3456"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  className={`w-full bg-[#FAF8F5] border rounded-xs px-3 py-2.5 text-sm text-[#201B17] placeholder:text-[#9B9285] focus:bg-white focus:outline-hidden focus:border-[#201B17] focus:ring-1 focus:ring-[#201B17] transition-colors ${
                    errors.phone ? 'border-red-600 bg-red-50/20' : 'border-[#D4CEBF]'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Row 3: Fleet Size and Operating State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="truckCount" className="block text-xs font-semibold text-[#201B17] mb-1.5">
                  Active Service Vans
                </label>
                <div className="relative">
                  <select
                    id="truckCount"
                    value={formData.truckCount}
                    onChange={(e) => setFormData({ ...formData, truckCount: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D4CEBF] rounded-xs px-3 py-2.5 pr-8 text-sm text-[#201B17] focus:bg-white focus:outline-hidden focus:border-[#201B17] focus:ring-1 focus:ring-[#201B17] transition-colors cursor-pointer appearance-none"
                  >
                    <option value="1 Van (Solo Master)">1 Van (Solo Master Plumber)</option>
                    <option value="2-4 Vans">2–4 Service Vans</option>
                    <option value="5-9 Vans">5–9 Service Vans</option>
                    <option value="10+ Vans">10+ Service Vans</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#736A5E] absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-xs font-semibold text-[#201B17] mb-1.5">
                  Operating State <span className="text-red-700">*</span>
                </label>
                <div className="relative">
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D4CEBF] rounded-xs px-3 py-2.5 pr-8 text-sm text-[#201B17] focus:bg-white focus:outline-hidden focus:border-[#201B17] focus:ring-1 focus:ring-[#201B17] transition-colors cursor-pointer appearance-none"
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#736A5E] absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 4: Primary Bottleneck */}
            <div>
              <label htmlFor="biggestChallenge" className="block text-xs font-semibold text-[#201B17] mb-1.5">
                Primary Revenue Bottleneck
              </label>
              <div className="relative">
                <select
                  id="biggestChallenge"
                  value={formData.biggestChallenge}
                  onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D4CEBF] rounded-xs px-3 py-2.5 pr-8 text-sm text-[#201B17] focus:bg-white focus:outline-hidden focus:border-[#201B17] focus:ring-1 focus:ring-[#201B17] transition-colors cursor-pointer appearance-none"
                >
                  <option value="Missed calls while technicians are on jobs or under sinks">
                    Missed calls while technicians are on jobs or under sinks
                  </option>
                  <option value="High-value open quotes (water heaters, repipes) going cold">
                    High-value open quotes (water heaters, repipes) going cold
                  </option>
                  <option value="After-hours emergency triage bottlenecks and dispatch delays">
                    After-hours emergency triage bottlenecks and dispatch delays
                  </option>
                  <option value="Google Business Profile drift, review gaps, and map-pack lag">
                    Google Business Profile drift, review gaps, and map-pack lag
                  </option>
                  <option value="All of the above — Full operational diagnostic">
                    All of the above — Full operational diagnostic
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#736A5E] absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Row 5: Software / Optional Notes */}
            <div>
              <label htmlFor="notes" className="block text-xs font-semibold text-[#201B17] mb-1.5 flex items-center justify-between">
                <span>Current Software / Notes</span>
                <span className="text-[11px] font-normal text-[#736A5E]">Optional</span>
              </label>
              <input
                id="notes"
                type="text"
                placeholder="e.g. ServiceTitan, Housecall Pro, Jobber, or QuickBooks"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D4CEBF] rounded-xs px-3 py-2 text-sm text-[#201B17] placeholder:text-[#9B9285] focus:bg-white focus:outline-hidden focus:border-[#201B17] focus:ring-1 focus:ring-[#201B17] transition-colors"
              />
            </div>

            {/* Guarantee Note */}
            <div className="pt-3 pb-2 text-center border-t border-[#E2DDD1]">
              <div className="inline-flex flex-col items-center justify-center">
                <span className="font-mono text-xl font-bold text-[#201B17] leading-none">01</span>
                <span className="font-mono text-xs text-[#736A5E] mt-1 font-semibold uppercase tracking-wider">24–48 Hours</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#736A5E] mt-2">
                <ShieldCheck className="w-4 h-4 text-[#E6AF47] shrink-0" />
                <span>
                  Delivered directly to <strong className="text-[#201B17] font-mono">{targetEmail}</strong>
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-[#201B17] bg-[#F3C363] border border-[#201B17]/20 rounded-xs hover:bg-[#E6AF47] active:scale-[0.99] transition-all cursor-pointer shadow-xs hover:shadow disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Routing Audit Intake...' : 'Submit Request for Free Revenue Audit'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Success Confirmation (Directly on canvas, no card wrapper) */
          <div className="pt-4 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 bg-[#F3C363] text-[#201B17] flex items-center justify-center font-bold shrink-0 mt-0.5 border border-[#201B17]/20 rounded-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#736A5E] font-semibold block">
                  Intake Dispatched
                </span>
                <h3 className="text-2xl font-serif text-[#201B17] font-normal">
                  Audit Brief Routed to {targetEmail}
                </h3>
                <p className="text-xs text-[#4A433B] mt-1">
                  We have prepared the operational diagnostic brief for <strong>{formData.businessName || 'Your Company'}</strong>.
                </p>
              </div>
            </div>

            {/* Summary Details */}
            <div className="border-y border-[#E2DDD1] py-3.5 space-y-2 text-xs font-mono">
              <div className="font-sans font-bold text-[#201B17] uppercase tracking-wider text-[11px] mb-1">
                Submitted Specifications:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[#736A5E]">
                <div>Contact: <span className="text-[#201B17] font-sans font-semibold">{formData.fullName}</span></div>
                <div>Recipient: <span className="text-[#201B17] font-bold">{targetEmail}</span></div>
                <div>Company: <span className="text-[#201B17] font-sans font-semibold">{formData.businessName}</span></div>
                <div>State: <span className="text-[#201B17]">{formData.state}</span></div>
                <div>Email: <span className="text-[#201B17]">{formData.email}</span></div>
                <div>Fleet Size: <span className="text-[#201B17]">{formData.truckCount}</span></div>
                <div>Phone: <span className="text-[#201B17]">{formData.phone}</span></div>
              </div>
            </div>

            {/* Email Launcher Notice */}
            <div className="text-xs text-[#736A5E] flex items-start gap-2 bg-[#FAF8F5] p-3 border border-[#E2DDD1] rounded-xs">
              <AlertCircle className="w-4 h-4 text-[#E6AF47] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Your email client was opened with these exact specifications addressed to{' '}
                <a href={`mailto:${targetEmail}`} className="text-[#201B17] font-mono font-bold underline">
                  {targetEmail}
                </a>
                . You can re-open your email client or submit another inquiry below.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-[#201B17] hover:underline cursor-pointer font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Edit details or submit another audit</span>
              </button>

              <a
                href={getMailtoUrl(formData)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#F3C363] text-[#201B17] font-semibold border border-[#201B17]/20 rounded-xs hover:bg-[#E6AF47] transition-colors shadow-xs"
              >
                <span>Re-open Email to {targetEmail}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
