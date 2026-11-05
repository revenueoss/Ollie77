import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'Call Handling',
      question: 'How does AI call answering handle technical plumbing diagnostics?',
      answer:
        'Ollie does not attempt to diagnose complex plumbing issues or quote prices over the phone. Instead, it gathers crucial operational intake: caller address, water flow severity, fixture details (e.g. 50-gal water heater, sewer cleanout), and main shutoff status. Details are immediately routed to your designated on-call technician according to your pre-approved rules.',
    },
    {
      category: 'Compliance',
      question: 'Will Ollie guarantee that my plumbing business ranks #1 on Google Maps?',
      answer:
        'No. Any agency promising guaranteed rankings or lead volumes violates Google guidelines or is being dishonest. Ollie optimizes and maintains your Google Business Profile with accurate categories, verified emergency hours, and compliant review workflows for maximum organic relevance without risk of algorithmic suspension.',
    },
    {
      category: 'Call Handling',
      question: 'What happens during a severe local freeze or storm surge?',
      answer:
        'During catastrophic freezes when call volume spikes 10x, Ollie answers simultaneous incoming calls without busy signals, captures all caller locations and emergencies, and logs them into a prioritized triage queue. If your company reaches capacity, an approved emergency greeting informs homeowners of current backlog wait times.',
    },
    {
      category: 'System',
      question: 'How do estimate follow-ups stop if a customer replies or books elsewhere?',
      answer:
        'Strict safety gates halt automated sequences immediately upon receiving any reply, email, opt-out (STOP), or when you mark the estimate as closed/declined in your queue. There are zero awkward duplicate messages to homeowners who have already made a decision.',
    },
    {
      category: 'Compliance',
      question: 'Can you filter out negative reviews before they reach Google or Yelp?',
      answer:
        'No. FTC regulations and Google strictly ban review gating, filtering, or incentivizing 5-star reviews. Attempting to gate reviews risks federal fines and profile suspension. Ollie sends clean review links to all completed customers, helping your satisfied majority build a robust, authentic reputation.',
    },
    {
      category: 'System',
      question: 'Does this website or software automatically turn on AI answering?',
      answer:
        'No. This website is an informational presentation. Ollie is a managed service requiring an onboarding audit, custom configuration of your triage rules, and live test calls verified by your team before phone numbers are forwarded.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F7F5F0] border-t border-[#E2DDD1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#201B17] bg-[#EFECE4] px-3.5 py-1 rounded-xs border border-[#E2DDD1] mb-3 shadow-2xs">
            Operational FAQs
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#201B17] tracking-tight leading-[1.12]">
            Straight answers on{' '}
            <span className="editorial-highlight text-[#201B17] font-normal inline-block px-2">
              rules and boundaries.
            </span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#4A433B] leading-relaxed">
            Plumbing contractors respect clear boundaries. Here is exactly how Ollie functions and where we draw the line.
          </p>
        </div>

        {/* Clean Open Accordions directly on travertine canvas (No Card Container) */}
        <div className="divide-y divide-[#E2DDD1] border-y border-[#E2DDD1]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#736A5E] shrink-0 font-bold">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-lg sm:text-xl font-serif font-normal text-[#201B17] group-hover:text-[#E6AF47] transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#736A5E] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#201B17]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-3 pl-8 sm:pl-9 text-sm text-[#4A433B] leading-relaxed animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#736A5E]">
                      <HelpCircle className="w-3.5 h-3.5 text-[#E6AF47]" />
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
