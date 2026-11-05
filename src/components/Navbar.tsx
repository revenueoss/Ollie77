import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'The System', href: '#system' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'ROI Calculator', href: '#calculator' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E2DDD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Warm display face with ochre amber accent) */}
          <a
            href="#"
            className="flex items-baseline gap-2 text-2xl sm:text-[27px] font-semibold tracking-tight text-[#201B17] whitespace-nowrap shrink-0 font-serif group"
          >
            <span>Ollie</span>
            <span className="w-2 h-2 rounded-full bg-[#E6AF47] inline-block mb-1 group-hover:scale-125 transition-transform" aria-hidden="true" />
            <span className="text-xs font-mono font-normal uppercase text-[#736A5E] tracking-wider ml-1 hidden sm:inline">
              Client Intake
            </span>
          </a>

          {/* Zone 2: Navigation Links (Warm stone taupe, unboxed, subtle hover) */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#736A5E]"
          >
            <a href="#intake" className="text-[#201B17] font-semibold hover:underline">
              Onboarding Intake
            </a>
            <a href="#system" className="hover:text-[#201B17] transition-colors">
              The 5 Stages
            </a>
            <a href="#dashboard" className="hover:text-[#201B17] transition-colors">
              System Dashboard
            </a>
            <a href="#pricing" className="hover:text-[#201B17] transition-colors">
              Pricing ($397/mo)
            </a>
            <a href="#faq" className="hover:text-[#201B17] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Zone 3: Single Primary Action with warm golden sand accent */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide text-[#201B17] bg-[#F3C363] border border-[#231F1C]/15 rounded-xs hover:bg-[#E6AF47] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs hover:shadow"
            >
              <span>Start Shop Onboarding</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#201B17] hover:bg-[#EFECE4] rounded-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#231F1C]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2DDD1] bg-[#F7F5F0] px-5 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            <a
              href="#intake"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#201B17] py-1 border-b border-[#E2DDD1]/60"
            >
              Onboarding Intake
            </a>
            <a
              href="#system"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#201B17] py-1 border-b border-[#E2DDD1]/60"
            >
              The 5 Stages
            </a>
            <a
              href="#dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#201B17] py-1 border-b border-[#E2DDD1]/60"
            >
              System Dashboard
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#201B17] py-1 border-b border-[#E2DDD1]/60"
            >
              Pricing ($397/mo)
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#201B17] py-1 border-b border-[#E2DDD1]/60"
            >
              FAQ
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#201B17] bg-[#F3C363] rounded-xs hover:bg-[#E6AF47] transition-colors"
            >
              <span>Start Shop Onboarding</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
