import React, { useState } from 'react';
import { PhoneCall, FileText, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { CallLogItem, EstimateItem, SystemHealthEvent } from '../types';

export const DashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calls' | 'estimates' | 'health'>('calls');
  const [selectedCallId, setSelectedCallId] = useState<string>('c-1');

  const demoCalls: CallLogItem[] = [
    {
      id: 'c-1',
      timeAgo: '14m ago',
      caller: 'Robert Henderson',
      phone: '(480) 555-0193',
      issue: '50-Gal Bradford White gas water heater leaking from base valve in garage',
      urgency: 'Urgent',
      status: 'Recovered & Routed',
      verifiedBooking: false,
      notes: 'Caller details and photo request captured. Routed to On-Call Tech Dan. Dispatch status: Pending owner review.',
    },
    {
      id: 'c-2',
      timeAgo: '42m ago',
      caller: 'Sarah Montgomery',
      phone: '(480) 555-0284',
      issue: 'Kitchen sink slow drain and gurgling garbage disposal',
      urgency: 'Standard',
      status: 'Follow-up Sent',
      verifiedBooking: true,
      notes: 'Automated recovery SMS sent after missed ring. Customer confirmed appointment window for tomorrow 9 AM.',
    },
    {
      id: 'c-3',
      timeAgo: '2h ago',
      caller: 'Marcus Vance',
      phone: '(480) 555-0711',
      issue: 'Main line sewer backup in basement floor drain',
      urgency: 'Emergency',
      status: 'Recovered & Routed',
      verifiedBooking: true,
      notes: 'Immediate triage protocol triggered. Emergency notification pushed to dispatch supervisor. Assigned to Truck 3.',
    },
  ];

  const demoEstimates: EstimateItem[] = [
    {
      id: 'e-1',
      customer: 'David & Claire Miller',
      service: 'Tankless Navien Water Heater Conversion',
      amount: 4250,
      daysOpen: 4,
      status: 'Customer Replied',
      lastAction: 'Step 2 check-in delivered. Customer asked about financing options.',
    },
    {
      id: 'e-2',
      customer: 'Highland Dental Center',
      service: 'Commercial Backflow Preventer Replacement',
      amount: 2800,
      daysOpen: 6,
      status: 'In Sequence',
      lastAction: 'Step 3 reminder scheduled for Friday 10:00 AM (pending no prior reply).',
    },
    {
      id: 'e-3',
      customer: 'Greg Patterson',
      service: 'Main Sewer Line Hydro-Jetting & Cleanout',
      amount: 1450,
      daysOpen: 2,
      status: 'Verified Booked',
      lastAction: 'Customer confirmed scheduling via reply. Automated sequence halted immediately.',
    },
  ];

  const demoHealthEvents: SystemHealthEvent[] = [
    {
      id: 'h-1',
      timestamp: 'Today, 08:30 AM',
      component: 'Google Business Profile Hours Sync',
      status: 'Healthy',
      detail: 'Monitored 1 location. Holiday hours match dispatch schedule. 0 discrepancies.',
    },
    {
      id: 'h-2',
      timestamp: 'Today, 07:15 AM',
      component: 'Missed Call SMS Carrier Delivery',
      status: 'Flagged Failure',
      detail: 'SMS to (480) 555-0819 returned "Landline Unreachable". Flagged for manual voice callback.',
    },
    {
      id: 'h-3',
      timestamp: 'Yesterday, 06:12 PM',
      component: 'Estimate Follow-up Rule Enforcement',
      status: 'Healthy',
      detail: 'Halted follow-up sequence for Estimate #1084 immediately upon incoming customer text.',
    },
  ];

  const selectedCall = demoCalls.find((c) => c.id === selectedCallId) || demoCalls[0];

  return (
    <section id="dashboard" className="min-h-screen flex flex-col justify-center py-14 sm:py-20 bg-[#F7F5F0] text-[#201B17] border-t border-[#E2DDD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.22em] uppercase font-semibold text-[#201B17] bg-[#EFECE4] px-3.5 py-1 rounded-xs border border-[#E2DDD1] mb-3">
            <span>Managed System Intelligence</span>
            <span className="text-[#736A5E]/40" aria-hidden="true">/</span>
            <span className="text-[#736A5E]">Centralized Oversight</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.12]">
            A command center built for{' '}
            <span className="editorial-highlight text-[#201B17] font-normal inline-block px-2">
              plumbing reality.
            </span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#4A433B] max-w-2xl mx-auto leading-relaxed">
            Centralized visibility across call capture, open estimates, and profile health—engineered to run without pulling technicians away from wrenches.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#736A5E]">
            <span className="font-mono uppercase tracking-wider text-[#201B17] bg-[#F3C363] px-2.5 py-0.5 rounded-xs font-semibold">
              DEMO DATA · SIMULATION
            </span>
            <span>· Live operational telemetry for US plumbing shops</span>
          </div>
        </div>

        {/* Open Top Metric Strip (No Card Boxes) */}
        <div className="border-y border-[#E2DDD1] py-6 mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2DDD1]">
            <div className="p-4 sm:px-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#736A5E] uppercase mb-1">
                <span>Recovered Inquiries</span>
                <PhoneCall className="w-3.5 h-3.5 text-[#E6AF47]" />
              </div>
              <div className="text-3xl sm:text-4xl font-mono tabular-nums font-semibold text-[#201B17]">
                38
              </div>
              <div className="text-xs text-[#736A5E] mt-1">Rough-ins & after-hours</div>
            </div>

            <div className="p-4 sm:px-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#736A5E] uppercase mb-1">
                <span>Monitored Estimates</span>
                <FileText className="w-3.5 h-3.5 text-[#E6AF47]" />
              </div>
              <div className="text-3xl sm:text-4xl font-mono tabular-nums font-semibold text-[#201B17]">
                $38,650
              </div>
              <div className="text-xs text-[#736A5E] mt-1">11 customer responses</div>
            </div>

            <div className="p-4 sm:px-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#736A5E] uppercase mb-1">
                <span>Dispatch Accuracy</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#E6AF47]" />
              </div>
              <div className="text-3xl sm:text-4xl font-mono tabular-nums font-semibold text-[#201B17]">
                100%
              </div>
              <div className="text-xs text-[#736A5E] mt-1">0 unconfirmed rollouts</div>
            </div>

            <div className="p-4 sm:px-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#736A5E] uppercase mb-1">
                <span>Exception Audits</span>
                <Activity className="w-3.5 h-3.5 text-[#D89E34]" />
              </div>
              <div className="text-3xl sm:text-4xl font-mono tabular-nums font-semibold text-[#201B17]">
                1 Flagged
              </div>
              <div className="text-xs text-[#736A5E] mt-1">Landline bounce flagged</div>
            </div>
          </div>
        </div>

        {/* Open Editorial Inquiry Ledger (No Heavy Card Shell) */}
        <div className="border-t border-[#E2DDD1]">
          {/* Minimalist Tab Links directly on canvas */}
          <div className="flex items-center justify-between border-b border-[#E2DDD1] py-3 text-xs sm:text-sm">
            <div className="flex items-center gap-6 font-medium">
              <button
                onClick={() => setActiveTab('calls')}
                className={`pb-2 -mb-3 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'calls'
                    ? 'border-[#201B17] text-[#201B17] font-semibold'
                    : 'border-transparent text-[#736A5E] hover:text-[#201B17]'
                }`}
              >
                Inquiries ({demoCalls.length})
              </button>
              <button
                onClick={() => setActiveTab('estimates')}
                className={`pb-2 -mb-3 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'estimates'
                    ? 'border-[#201B17] text-[#201B17] font-semibold'
                    : 'border-transparent text-[#736A5E] hover:text-[#201B17]'
                }`}
              >
                Estimates ({demoEstimates.length})
              </button>
              <button
                onClick={() => setActiveTab('health')}
                className={`pb-2 -mb-3 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'health'
                    ? 'border-[#201B17] text-[#201B17] font-semibold'
                    : 'border-transparent text-[#736A5E] hover:text-[#201B17]'
                }`}
              >
                Audits ({demoHealthEvents.length})
              </button>
            </div>

            <div className="hidden sm:block text-xs text-[#736A5E] font-mono">
              Phoenix East Valley · Operational Triage
            </div>
          </div>

          {/* Tab 1: Calls & Inquiry Ledger */}
          {activeTab === 'calls' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2DDD1]">
              {/* Left Column: Inquiry Rows */}
              <div className="lg:col-span-7 divide-y divide-[#E2DDD1]">
                {demoCalls.map((call) => {
                  const isSelected = call.id === selectedCallId;
                  return (
                    <div
                      key={call.id}
                      onClick={() => setSelectedCallId(call.id)}
                      className={`py-4 pr-4 transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#EFECE4]/60 -mx-2 px-2' : 'hover:bg-[#EFECE4]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#201B17] text-sm">{call.caller}</span>
                          <span className="text-xs text-[#736A5E] font-mono">{call.phone}</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#736A5E]">{call.timeAgo}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A433B] line-clamp-1 mb-2 font-normal">
                        {call.issue}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#736A5E]">
                        <span className={call.urgency === 'Emergency' ? 'text-[#D89E34] font-semibold' : 'text-[#736A5E]'}>
                          {call.urgency} · {call.status}
                        </span>
                        <span className="text-[#201B17] flex items-center gap-1 font-semibold">
                          {call.verifiedBooking ? 'Booked' : 'Pending Verification'}
                          <ArrowRight className="w-3 h-3 text-[#E6AF47]" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Selected Call Inspection Detail */}
              <div className="lg:col-span-5 p-4 sm:p-6 space-y-4 text-xs">
                <div className="space-y-2 pb-4 border-b border-[#E2DDD1]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#736A5E]">Caller Record</span>
                    <span className="text-[#201B17] font-semibold">{selectedCall.caller} ({selectedCall.phone})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#736A5E]">Urgency Level</span>
                    <span className="text-[#201B17] font-bold font-mono">{selectedCall.urgency}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[#736A5E] uppercase tracking-wider font-mono text-[11px] font-semibold">
                    Plumbing Intake Symptom:
                  </div>
                  <p className="text-sm font-serif italic text-[#201B17] leading-relaxed">
                    &ldquo;{selectedCall.issue}&rdquo;
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="text-[#736A5E] uppercase tracking-wider font-mono text-[11px] font-semibold">
                    System Routing:
                  </div>
                  <p className="text-xs text-[#4A433B] leading-relaxed">
                    {selectedCall.notes}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2DDD1] text-xs text-[#736A5E] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E6AF47]" />
                  <span>Human safety gate: Technicians confirm rollout before dispatch.</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Estimates Ledger */}
          {activeTab === 'estimates' && (
            <div className="divide-y divide-[#E2DDD1] py-2">
              {demoEstimates.map((est) => (
                <div
                  key={est.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-[#201B17] text-sm">{est.customer}</div>
                    <div className="text-[#736A5E] text-xs mt-0.5">{est.service}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="font-mono text-[#201B17] text-sm font-semibold">${est.amount.toLocaleString()}</div>
                    <div className="text-[#736A5E] font-mono text-xs">{est.daysOpen}d open</div>
                    <span className="px-2.5 py-1 text-xs font-semibold bg-[#F7EEDA] text-[#201B17] border border-[#ECCB86] rounded-xs">
                      {est.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Health Events Ledger */}
          {activeTab === 'health' && (
            <div className="divide-y divide-[#E2DDD1] py-2">
              {demoHealthEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-[#201B17] text-sm">{evt.component}</div>
                    <p className="text-[#4A433B] text-xs mt-0.5">{evt.detail}</p>
                  </div>
                  <span className={`font-mono text-xs font-semibold ${evt.status === 'Healthy' ? 'text-[#201B17]' : 'text-[#D89E34]'}`}>
                    {evt.status === 'Healthy' ? 'HEALTHY' : 'FLAGGED EXCEPTION'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
