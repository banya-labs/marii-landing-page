'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  FileText,
  Globe2,
  Layers3,
  MessageSquare,
  Moon,
  Menu,
  PackageSearch,
  Sun,
  Upload,
  X,
  WandSparkles,
} from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import { brandAssets } from '@/lib/brand-assets';

const BRAND = '#6b3550';
const INK = '#1f1a22';
const PAPER = '#f7eef0';
const SURFACE_LIGHT = 'rgba(255,255,255,0.92)';
const SURFACE_DARK = 'rgba(42,36,41,0.85)';

const CURRENCIES = ['ZAR', 'USD', 'BWP', 'NAD', 'EUR'];
const HERO_AUDIENCE_TITLES = [
  'Auto shops',
  'Contractors',
  'Print shops',
  'Designers',
  'Freelancers',
  'Consultants',
  'Workshop owners',
  'Small teams',
];
const WAITLIST_WORKER_URL = process.env.NEXT_PUBLIC_WAITLIST_WORKER_URL ?? '';
const NAV_ITEMS = [
  { label: 'Templates', href: 'templates' },
  { label: 'AI Assistants', href: 'assistants' },
  { label: 'Features', href: 'features' },
  { label: 'Use Cases', href: 'use-cases' },
  { label: 'Testimonials', href: 'testimonials' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'FAQ', href: 'faq' },
] as const;
const SECTION_IDS = NAV_ITEMS.map((item) => item.href);
const TIER_OPTIONS = ['Starter', 'Growth', 'Scale'];
const BILLING_SAVE_RATE = 0.1;
const SOCIAL_PROOF = [
  { label: 'Speed that wins deals', value: 'Quote in minutes, not hours' },
  { label: 'No manual grunt work', value: 'One message, instant PDF' },
  { label: 'Built for how you work', value: 'WhatsApp in, polished quote out' },
  { label: 'All currencies supported', value: 'Generate quotes in any currency' },
];

function formatRand(amount: number) {
  return `R${new Intl.NumberFormat('en-ZA').format(Math.round(amount))}`;
}

const ASSISTANTS = [
  {
    icon: WandSparkles,
    title: 'AI Quote Builder',
    desc: 'Paste a WhatsApp message, email, or voice-note transcript. Marii checks the catalogue, builds the quote, asks clarifying questions when needed, and generates the final PDF for sharing.',
    points: [
      'Reads plain language and extracts products, quantities, and jobs.',
      'Checks the catalogue first so pricing stays accurate.',
      'Flags missing items and asks for clarification before it generates.',
      'One click creates a clean PDF you can send on WhatsApp or email.',
    ],
  },
  {
    icon: Upload,
    title: 'Catalogue Manager',
    desc: 'Use natural language or file upload to add, remove, and edit catalogue items. Marii can extract products from images, PDFs, and spreadsheets, then turn them into structured line items.',
    points: [
      'Accepts images, files, and typed instructions.',
      'Extracts product names, prices, and descriptions automatically.',
      'Makes catalogue updates fast enough for a busy SME team.',
      'Keeps your quote engine aligned with the real price list.',
    ],
  },
];

const FEATURE_GRID = [
  {
    icon: MessageSquare,
    title: 'Natural language quoting',
    desc: 'Turn customer messages into structured quotes without making your team start from a blank form.',
  },
  {
    icon: PackageSearch,
    title: 'Catalogue lookup',
    desc: 'Match items to the right products and services so every quote uses the right pricing logic.',
  },
  {
    icon: FileText,
    title: 'PDF generation',
    desc: 'Create professional PDF quotes instantly and keep the output ready for sharing or printing.',
  },
  {
    icon: Layers3,
    title: 'Template flexibility',
    desc: 'Switch between a simple table quote and a product-led layout without rebuilding the workflow.',
  },
  {
    icon: Globe2,
    title: 'Multi-currency support',
    desc: 'Quote in ZAR first, then switch to USD, BWP, NAD, or EUR when the deal needs it.',
  },
  {
    icon: BarChart3,
    title: 'Pipeline visibility',
    desc: 'See what is getting quoted, what is winning, and what products are driving demand.',
  },
];

const USE_CASES = [
  {
    title: 'Manufacturing & Fabrication',
    desc: 'Custom metal work, electronics, or plastics? Turn RFQs into polished quotes in minutes. Your catalogue manages complex configurations and bulk pricing automatically.',
  },
  {
    title: 'Construction & Contractors',
    desc: 'Site surveys lead to quotes. Marii takes site notes, materials lists, and labour hours—then generates a professional bid while you&apos;re still on the job site.',
  },
  {
    title: 'IT Services & MSPs',
    desc: 'High-volume technical quotes need speed. Define your service packages once. Marii handles setup fees, per-user costs, and support tiers in seconds.',
  },
  {
    title: 'Event & Catering Services',
    desc: 'Venue rental, catering, and AV setup all have different pricing. Marii bundles your service catalogue into clean proposals fast enough to quote while on calls.',
  },
  {
    title: 'Logistics & Transport',
    desc: 'Freight quotes depend on weight, distance, and urgency. Your catalogue stores zone pricing and rates. Marii delivers quotes before your customer hangs up.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'We stopped rebuilding quotes from scratch. Now the team sends a clean PDF in minutes, not hours.',
    name: 'Owner',
    role: 'Durban auto workshop',
  },
  {
    quote:
      'The catalogue manager keeps our pricing sane. It is faster, cleaner, and far less error-prone for the team.',
    name: 'Operations lead',
    role: 'Cape Town print shop',
  },
  {
    quote:
      'Marii feels built for how SMEs actually work in South Africa. WhatsApp in, PDF out, and no admin chaos.',
    name: 'Freelance designer',
    role: 'Gqeberha',
  },
  {
    quote:
      'We can turn a message into a proper quote while the customer is still on the phone. That changed everything for us.',
    name: 'Workshop owner',
    role: 'Pretoria',
  },
  {
    quote:
      'The team likes how simple it is. The whole flow feels fast, clear, and easy to keep up with during busy days.',
    name: 'Sales manager',
    role: 'Johannesburg service business',
  },
  {
    quote:
      'Marii helps us send better quotes without needing a full admin team. That saves real time every week.',
    name: 'Founder',
    role: 'Nelspruit SME',
  },
  {
    quote:
      'The PDF output looks professional enough to send straight away, which is exactly what we needed.',
    name: 'Operations lead',
    role: 'Port Elizabeth contractor',
  },
  {
    quote:
      'We finally have a quoting tool that matches how our team works. It is simple, practical, and quick.',
    name: 'Business owner',
    role: 'Bloemfontein print shop',
  },
];

const PRICING = [
  {
    name: 'Starter',
    label: 'Just Started',
    monthlyPrice: 249,
    quotes: '100 quotes per month',
    fit: 'For freelancers and solo operators getting started. Test the system, build your process, prove the ROI before scaling.',
    analyticsTitle: 'Basic Pipeline Visibility',
    analytics: [
      'Total pipeline value: see the total monetary value of all quotes generated.',
      'Win / loss count: simple counters for accepted vs rejected quotes.',
      'Client leaderboard: top 5 clients by total quoted value.',
    ],
    why: 'Perfect entry point to eliminate manual quoting and prove the time you&apos;ll save.',
  },
  {
    name: 'Growth',
    label: 'Growing Fast',
    monthlyPrice: 599,
    quotes: '400 quotes per month',
    fit: 'For teams that found product-market fit. Handle daily quote volume without the admin headache. This is where most SMEs thrive.',
    analyticsTitle: 'Conversion and Product Dynamics',
    analytics: [
      'Everything in Starter.',
      'Quote-to-deal conversion rate: track how many quotes become closed deals.',
      'Product and service interest index: see what gets asked about most and least.',
      'Loss analysis: track why quotes fail, such as price or timing.',
    ],
    why: 'Get the analytics you need to scale faster and smarter without hiring extra admin.',
    popular: true,
  },
  {
    name: 'Scale',
    label: 'Enterprise Ready',
    monthlyPrice: 1199,
    quotes: '1,000 quotes per month',
    fit: 'For high-volume operations that need speed at scale. Unlimited quotes, advanced analytics, priority support. Built for revenue teams that can&apos;t afford downtime.',
    analyticsTitle: 'Advanced Temporal and Predictive Insights',
    analytics: [
      'Everything in Growth.',
      'Temporal demand patterns: busiest days and weeks for quote requests.',
      'Quote velocity and age: time spent pending before a client decides.',
      'Team performance metrics: highest-value quotes and best conversion rates.',
    ],
    why: 'Maximize revenue at volume. Every hour saved at scale compounds into real business growth.',
  },
];

const FAQS = [
  {
    question: 'Why Marii instead of a standard invoicing or accounting app?',
    answer:
      'Accounting systems track money you have already made. Marii is built to help you make the money by focusing on quoting, follow-up, conversion, and the product demand patterns that matter to SMEs.',
  },
  {
    question: 'What happens if I go over my monthly quote limit?',
    answer:
      'You get a gentle warning at 90 percent. At 100 percent, you can upgrade or buy a top-up pack to keep the workflow moving without cutting off the sale.',
  },
  {
    question: 'Do top-up quotes expire at the end of the month?',
    answer:
      'No. Top-up quotes carry over month to month and are only consumed after your main monthly allowance resets and is fully used up.',
  },
  {
    question: 'Can I quote in multiple currencies and use different templates?',
    answer:
      'Yes. Marii supports multiple currencies and lets you choose between a standard table template and an image-focused template depending on the deal.',
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function CurrencyTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % CURRENCIES.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span
      aria-hidden="true"
      className="inline-grid min-w-[92px] place-items-center rounded-full bg-[#6b3550] px-4 py-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-[#f7eef0]"
    >
      <span className="col-start-1 row-start-1 select-none opacity-0">CURRENCY</span>
      <span className="col-start-1 row-start-1">{CURRENCIES[index]}</span>
    </span>
  );
}

function AudienceTicker() {
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max flex-nowrap items-center gap-3"
        style={{ animation: 'news-ticker-scroll 28s linear infinite', willChange: 'transform' }}
        aria-hidden="true"
      >
        {[...HERO_AUDIENCE_TITLES, ...HERO_AUDIENCE_TITLES].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-[rgba(31,26,34,0.08)] bg-white/72 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6f6770] dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function NavChrome({
  floating,
  isDark,
  toggleTheme,
  mobileMenuOpen,
  toggleMobileMenu,
  onNavigate,
  onOpenWaitlist,
  activeSection,
}: {
  floating?: boolean;
  isDark: boolean;
  toggleTheme: () => void;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  onNavigate: (href: string) => void;
  onOpenWaitlist: () => void;
  activeSection: string;
}) {
  const wrapperClassName = floating
    ? `pointer-events-auto mx-auto w-full max-w-7xl ${mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'} border border-[rgba(31,26,34,0.08)] bg-[#f7eef0]/92 px-3 py-2 shadow-[0_18px_44px_-26px_rgba(31,26,34,0.28)] backdrop-blur-md dark:border-[rgba(211,203,207,0.10)] dark:bg-[#241f27]/88`
    : 'mx-auto w-full max-w-7xl';
  const rowClassName = floating
    ? 'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3'
    : 'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3';
  const navPillClassName =
    'flex w-fit items-center justify-center gap-1 rounded-full border border-[rgba(107,53,80,0.12)] bg-[rgba(107,53,80,0.10)] px-2 py-1.5 shadow-[0_10px_22px_-18px_rgba(107,53,80,0.22)] dark:border-[rgba(211,203,207,0.08)] dark:bg-[rgba(255,255,255,0.05)]';
  const actionButtonClassName =
    'inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-opacity duration-200 hover:opacity-95 sm:h-12 sm:px-6';
  const iconButtonClassName =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(31,26,34,0.08)] bg-white/70 text-[#1f1a22] transition-colors duration-200 hover:bg-white dark:border-[rgba(211,203,207,0.10)] dark:bg-white/5 dark:text-[#f0e8eb]';

  return (
    <div className={wrapperClassName}>
      <div className={rowClassName}>
        <Image
          src={isDark ? brandAssets.logoDark : brandAssets.logoLight}
          alt="Marii"
          width={138}
          height={45}
          className="h-[36px] w-auto justify-self-start sm:h-[41px]"
          priority={!floating}
        />

        <div className="hidden min-w-0 justify-self-center md:flex">
          <div className={navPillClassName}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.href);
                }}
                aria-current={activeSection === item.href ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href
                    ? 'bg-[#6b3550] text-[#f7eef0] shadow-[0_10px_20px_-12px_rgba(107,53,80,0.45)]'
                    : 'text-[#4b313a] hover:bg-[rgba(107,53,80,0.16)] hover:text-[#1f1a22] dark:text-[#e8dfe2] dark:hover:bg-white/10 dark:hover:text-[#f0e8eb]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-self-end gap-2">
          <button
            type="button"
            onClick={onOpenWaitlist}
            className={`hidden md:inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-opacity duration-200 hover:opacity-95`}
            style={{ background: BRAND, color: PAPER }}
          >
            Join waitlist
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className={iconButtonClassName}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-[#6f6770]" /> : <Moon className="h-4 w-4 text-[#6f6770]" />}
          </button>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className={`${iconButtonClassName} md:hidden`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${
          mobileMenuOpen ? 'mt-3 grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'
        } transition-[grid-template-rows] duration-300 ease-out`}
      >
        <div className="overflow-hidden">
          <div
            className={`rounded-[22px] border border-[rgba(31,26,34,0.07)] ${
              floating ? 'bg-white/75' : 'bg-white/80'
            } p-3 dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5`}
          >
            <div className="grid gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.href);
                  }}
                  aria-current={activeSection === item.href ? 'page' : undefined}
                  className={`rounded-full px-4 py-3 text-sm font-medium transition-colors ${
                    activeSection === item.href
                      ? 'bg-[#6b3550] text-[#f7eef0] shadow-[0_10px_20px_-12px_rgba(107,53,80,0.45)]'
                      : 'text-[#1f1a22] hover:bg-[rgba(107,53,80,0.12)] dark:text-[#f0e8eb] dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={onOpenWaitlist}
                className="mt-1 inline-flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold text-[#f7eef0]"
                style={{ background: BRAND }}
              >
                Join waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].href);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialShellHeight, setTestimonialShellHeight] = useState(420);
  const testimonialCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    desiredTier: '',
    emailMarketing: true,
    whatsappMarketing: false,
  });
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const shellBackground = isDark ? SURFACE_DARK : SURFACE_LIGHT;
  const shellBorder = isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)';
  const softBorder = isDark ? 'rgba(211,203,207,0.08)' : 'rgba(31,26,34,0.07)';

  function updateField<K extends keyof typeof formState>(field: K, value: (typeof formState)[K]) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function openWaitlist(desiredTier = '') {
    setFormState((current) => ({ ...current, desiredTier }));
    setMobileMenuOpen(false);
    scrollToSection('footer-cta');
  }

  function handleNavJump(href: string) {
    setMobileMenuOpen(false);
    scrollToSection(href);
  }

  function setTestimonialAt(index: number) {
    const normalized = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    setTestimonialIndex(normalized);
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
        (section): section is HTMLElement => Boolean(section),
      );

      if (!sections.length) {
        return;
      }

      const scrollMarker = window.scrollY + 160;
      let currentSection = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= scrollMarker) {
          currentSection = section.id;
          continue;
        }

        break;
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useLayoutEffect(() => {
    const updateHeight = () => {
      const heights = testimonialCardRefs.current
        .map((node) => node?.offsetHeight ?? 0)
        .filter((height) => height > 0);

      if (!heights.length) {
        return;
      }

      setTestimonialShellHeight(Math.max(...heights) + 40);
    };

    const frame = window.requestAnimationFrame(updateHeight);
    window.addEventListener('resize', updateHeight);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateHeight);
    };
  }, [testimonialIndex]);

  async function handleWaitlistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!WAITLIST_WORKER_URL) {
      setSubmitState('error');
      setSubmitMessage('Waitlist endpoint is not configured yet.');
      return;
    }

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch(WAITLIST_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          source: 'marii-landing-page',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit waitlist form.');
      }

      setSubmitState('success');
      setSubmitMessage('You are on the list. We will be in touch soon.');
      setFormState({
        name: '',
        email: '',
        phone: '',
        desiredTier: '',
        emailMarketing: true,
        whatsappMarketing: false,
      });
    } catch {
      setSubmitState('error');
      setSubmitMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <main className="min-h-screen bg-[#f0e8eb] text-[#1f1a22] transition-colors duration-300 dark:bg-[#1f1a22] dark:text-[#f0e8eb]">
      <section className="px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div
          className="relative mx-auto min-h-[82vh] w-full max-w-7xl overflow-hidden rounded-[28px]"
          style={{
            background: shellBackground,
            border: shellBorder,
            boxShadow: '0 2px 8px rgba(31,26,34,0.06), 0 32px 80px -24px rgba(31,26,34,0.12)',
          }}
        >
          <div className="relative z-20 px-4 pt-4 sm:px-6 md:px-10">
            <NavChrome
              isDark={isDark}
              toggleTheme={toggleTheme}
              mobileMenuOpen={mobileMenuOpen}
              toggleMobileMenu={() => setMobileMenuOpen((current) => !current)}
              onNavigate={handleNavJump}
              onOpenWaitlist={() => openWaitlist()}
              activeSection={activeSection}
            />
          </div>

          {isScrolled ? (
            <div className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-6 md:px-10">
              <NavChrome
                floating
                isDark={isDark}
                toggleTheme={toggleTheme}
                mobileMenuOpen={mobileMenuOpen}
                toggleMobileMenu={() => setMobileMenuOpen((current) => !current)}
                onNavigate={handleNavJump}
                onOpenWaitlist={() => openWaitlist()}
                activeSection={activeSection}
              />
            </div>
          ) : null}

          <div className="grid gap-8 px-4 pb-8 pt-8 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center lg:gap-6 lg:pb-12 lg:pt-10">
            <div className="relative z-10 flex max-w-[40rem] flex-col justify-end pb-2 lg:max-w-[36rem]">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6f6770] sm:mb-5 sm:text-[11px]">
                AI QUOTE SOFTWARE FOR SOUTHERN AFRICAN SMEs
              </p>
              <h1
                className="max-w-[14ch] font-serif font-light leading-[0.92] tracking-[-0.04em] text-[#1f1a22] dark:text-[#f0e8eb]"
                style={{ fontSize: 'clamp(3.2rem, 14vw, 7.5rem)' }}
              >
                Stop wasting
                <br />
                time on manual
                <br />
                <span style={{ color: BRAND }}>quotes.</span>
              </h1>
              <p className="mt-4 max-w-[33rem] font-serif text-[1.35rem] leading-tight text-[#1f1a22] dark:text-[#f0e8eb] sm:mt-5 sm:text-[1.65rem]">
                Describe what you need. Our AI searches your catalogue, fills in details, and creates a professional PDF quote.
              </p>
              <p className="mt-5 max-w-[33rem] text-sm leading-relaxed text-[#6f6770] sm:mt-6 sm:text-base">
                Send a WhatsApp message, email, or voice note. Marii&apos;s AI generates a complete quote instantly. Your team saves hours. Your customers get instant responses.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => openWaitlist()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] px-6 py-3 text-sm font-semibold transition-opacity duration-200 hover:opacity-90 sm:w-auto"
                  style={{ background: BRAND, color: PAPER }}
                >
                  Join wait list
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('assistants')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] px-6 py-3 text-sm font-medium transition-colors duration-200 sm:w-auto"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(31,26,34,0.10)',
                    color: INK,
                  }}
                >
                  See the AI assistants
                </button>
              </div>
            </div>

            <div className="pointer-events-none relative mx-auto w-[220px] self-center sm:w-[250px] lg:mx-auto lg:w-[300px] xl:w-[320px]">
              <div className="relative aspect-[280/560] w-full">
                <div
                  className="absolute inset-0 overflow-hidden rounded-[40px]"
                  style={{
                    background: isDark ? '#2a2429' : INK,
                    boxShadow: '0 32px 80px -16px rgba(31,26,34,0.40), 0 4px 16px rgba(31,26,34,0.20)',
                  }}
                >
                  <div
                    className="absolute inset-[3px] flex flex-col items-center justify-center overflow-hidden rounded-[38px]"
                    style={{ background: isDark ? INK : '#f7eef0' }}
                  >
                    <div className="absolute left-0 right-0 top-0 flex h-10 items-center justify-between px-6 pt-2">
                      <span className="font-mono text-[10px] text-[#6f6770]">9:41</span>
                      <div className="absolute left-1/2 top-1 mx-auto h-5 w-20 -translate-x-1/2 rounded-full bg-[#1f1a22] dark:bg-[#2a2429]" />
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-3 rounded-sm bg-[#6f6770]/40" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                      <Image
                        src={isDark ? brandAssets.logoDark : brandAssets.logoLight}
                        alt="Marii app"
                        width={90}
                        height={30}
                        className="h-auto w-24 opacity-90"
                      />
                      <div className="flex h-12 w-12 items-center justify-center rounded-[14px]" style={{ background: BRAND }}>
                        <Image src={brandAssets.iconDark} alt="" width={28} height={28} className="h-7 w-7" />
                      </div>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#6f6770]">
                        AI quote builder
                      </p>
                    </div>

                    <div className="absolute bottom-6 left-4 right-4 space-y-2">
                      <div
                        className="rounded-[10px] px-3 py-2 text-[10px] text-[#1f1a22] dark:text-[#f0e8eb]"
                        style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(31,26,34,0.06)' }}
                      >
                        Need a quote for brake pads, oil, labour, and a service check?
                      </div>
                      <div className="rounded-[10px] px-3 py-2 text-[10px] text-[#f7eef0]" style={{ background: BRAND }}>
                        Marii: Do you want OEM or aftermarket parts?
                      </div>
                      <div className="rounded-[10px] px-3 py-2 text-[10px] text-[#f7eef0]" style={{ background: 'rgba(107,53,80,0.82)' }}>
                        Quote ready: R 1,240.00
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute right-0 top-24 h-10 w-1 rounded-l-sm"
                    style={{ background: isDark ? '#3d3841' : '#3a3540' }}
                  />
                  <div
                    className="absolute left-0 top-20 h-8 w-1 rounded-r-sm"
                    style={{ background: isDark ? '#3d3841' : '#3a3540' }}
                  />
                  <div
                    className="absolute left-0 top-32 h-8 w-1 rounded-r-sm"
                    style={{ background: isDark ? '#3d3841' : '#3a3540' }}
                  />
                </div>

                <div
                  className="absolute -left-8 bottom-20 hidden rounded-[14px] px-4 py-3 shadow-lg sm:block lg:-left-10 lg:bottom-24"
                  style={{
                    background: isDark ? 'rgba(42,36,41,0.9)' : 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(31,26,34,0.08)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#6f6770]">Avg time saved</p>
                  <p className="mt-0.5 font-serif text-2xl font-light text-[#1f1a22] dark:text-[#f0e8eb]">12 min</p>
                  <p className="text-[10px] text-[#6f6770]">per quote</p>
                </div>

                <div
                  className="absolute -right-1 top-16 rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-lg sm:-right-6 sm:top-20"
                  style={{ background: BRAND, color: PAPER }}
                >
                  conversion up 18%
                </div>
              </div>
            </div>
          </div>

          <div className="border-t px-6 py-4 sm:px-10" style={{ borderColor: softBorder }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6770]">Built for</p>
            <div className="mt-3">
              <AudienceTicker />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14 sm:px-16 lg:px-24">
        <div className="grid gap-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_PROOF.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col justify-start py-6 ${
                index < SOCIAL_PROOF.length - 1 ? 'md:border-r' : ''
              } ${
                index % 2 === 1 && index < SOCIAL_PROOF.length - 1 ? 'md:border-r-0 lg:border-r' : ''
              } border-[rgba(107,53,80,0.12)] dark:border-[rgba(211,203,207,0.08)]`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#a8a5ac] dark:text-[#8d8691]">
                {item.label}
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed text-[#1f1a22] dark:text-[#f0e8eb]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6770]">PDF quote templates</p>
          <h2
            className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
          >
            See the quote before you send it.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#6f6770]">
            Choose between a simple table-based quote and a visual product-led quote. Both are made for SMEs that
            want to send clean PDF quotes fast.
          </p>
        </div>

        <div className="mx-auto mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div
            className="rounded-[22px] p-4 sm:p-6"
            style={{
              background: isDark ? 'rgba(42,36,41,0.72)' : 'rgba(255,255,255,0.72)',
              border: isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)',
            }}
          >
            <div className="rounded-[18px] border border-[rgba(31,26,34,0.08)] bg-[#fbf6f7] p-5 shadow-[0_18px_45px_-28px_rgba(31,26,34,0.22)] dark:border-[rgba(211,203,207,0.08)] dark:bg-[#231d26] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6f6770]">Standard template</p>
                  <h3 className="mt-2 font-serif text-[1.5rem] font-light text-[#1f1a22] dark:text-[#f0e8eb]">
                    Table-based PDF quote
                  </h3>
                </div>
                <span className="rounded-full border border-[rgba(107,53,80,0.18)] bg-[#f7eef0] px-3 py-1 text-[11px] font-semibold text-[#6b3550] dark:bg-[#2f2731]">
                  Easy to send
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Client details', 'Line items', 'Brand terms', 'Totals + VAT'].map((item) => (
                  <div
                    key={item}
                    className="rounded-[14px] border border-[rgba(31,26,34,0.08)] bg-white px-4 py-4 text-sm text-[#1f1a22] shadow-[0_10px_24px_-18px_rgba(31,26,34,0.18)] dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5 dark:text-[#f0e8eb]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[18px] bg-[#6b3550] p-5 text-[#f7eef0]">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#f7eef0]/65">Total on quote</p>
                    <p className="mt-1 font-serif text-[2rem] font-light leading-none">R 1,240.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#f7eef0]/65">Best for</p>
                    <p className="mt-1 text-sm font-semibold">Fast service quotes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[22px] p-6 sm:p-8" style={{ background: 'rgba(107,53,80,0.08)' }}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b3550]">Why the templates matter</p>
              <ul className="mt-5 space-y-4">
                {[
                  'Easy to read on screen and on paper.',
                  'Keeps product details, pricing, and totals clear.',
                  'Lets your team move from message to quote without extra admin.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#1f1a22] dark:text-[#f0e8eb]">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#6b3550]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-[18px] border border-[rgba(31,26,34,0.08)] bg-white p-5 dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6f6770]">Multiple currencies</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CurrencyTicker />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#6f6770]">
                ZAR, USD, BWP, NAD, and EUR are all supported, so the same quote can work across different deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="assistants" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 sm:py-8">
        <div className="mb-12 max-w-3xl">
          <h2
            className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            AI assistants that help you quote
            <br />
            and keep your catalogue ready.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6f6770]">
            Marii uses two AI assistants to handle the everyday quoting work: one turns messages into PDF quotes, and
            the other keeps your catalogue clean, current, and ready for the next enquiry.
          </p>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {ASSISTANTS.map((assistant, index) => {
            const Icon = assistant.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={assistant.title}
                className={`flex flex-col gap-8 sm:gap-10 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:items-start lg:gap-16`}
              >
                {/* Left side - Title, Description, and Icon */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start gap-4 mb-6">
                    <div 
                      className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl" 
                      style={{ background: 'rgba(107,53,80,0.12)' }}
                    >
                      <Icon className="h-8 w-8" style={{ color: BRAND }} />
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.14em] font-semibold text-[#a8a5ac] dark:text-[#8d8691]">Assistant {index + 1}</p>
                      <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#1f1a22] dark:text-[#f0e8eb]">{assistant.title}</h3>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-[#6f6770] dark:text-[#b8adb5] max-w-md">{assistant.desc}</p>
                </div>

                {/* Right side - Feature Points */}
                <div className="flex-1 grid gap-3 sm:grid-cols-2">
                  {assistant.points.map((point, pointIndex) => (
                    <div
                      key={point}
                      className="group relative rounded-[18px] p-4 overflow-hidden transition-all hover:shadow-md"
                      style={{
                        background: isDark ? 'rgba(42,36,41,0.60)' : 'rgba(255,255,255,0.60)',
                        border: isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)',
                      }}
                    >
                      {/* Accent dot on top left */}
                      <div className="absolute top-0 left-0 w-1 h-1 rounded-full mt-3 ml-3" style={{ background: BRAND }}/>
                      
                      <div className="flex gap-3">
                        <div 
                          className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded text-xs font-bold" 
                          style={{ background: 'rgba(107,53,80,0.15)', color: BRAND }}
                        >
                          {pointIndex + 1}
                        </div>
                        <p className="text-sm leading-relaxed text-[#1f1a22] dark:text-[#f0e8eb]">{point}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 sm:py-28">
        <div className="mb-12 max-w-3xl">
          <h2
            className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            What Marii helps your team do.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6f6770]">
            Marii cuts admin, keeps quotes accurate, and helps SMEs move from customer request to sent PDF without
            unnecessary back and forth.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr">
          {FEATURE_GRID.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative rounded-[22px] p-6 overflow-hidden transition-all hover:shadow-lg"
                style={{
                  background: isDark ? 'rgba(42,36,41,0.60)' : 'rgba(255,255,255,0.75)',
                  border: isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)',
                }}
              >
                {/* Accent line */}
                <div 
                  className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300" 
                  style={{ background: BRAND }}
                />
                
                <div className="relative h-full flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div 
                        className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg" 
                        style={{ background: 'rgba(107,53,80,0.12)' }}
                      >
                        <Icon className="h-5 w-5" style={{ color: BRAND }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#a8a5ac] dark:text-[#8d8691]">
                          Feature {index + 1}
                        </p>
                        <p className="mt-1 text-base font-semibold text-[#1f1a22] dark:text-[#f0e8eb]">
                          {feature.title}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-[#6f6770] dark:text-[#b8adb5]">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="use-cases" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 sm:py-28">
        <div className="mb-12 max-w-3xl">
          <h2
            className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Built for South African SMEs.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6f6770]">
            The language, workflow, and pricing all stay practical for teams that quote often and need to move fast
            without losing control of the work.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {USE_CASES.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <button
                key={item.title}
                onClick={() => openWaitlist()}
                className={`flex flex-col gap-6 sm:gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:items-center text-left bg-transparent border-0 cursor-pointer w-full group`}
              >
                <div className="flex-1 relative">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start gap-4">
                      <div 
                        className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl group-hover:shadow-lg transition-all" 
                        style={{ background: 'rgba(107,53,80,0.12)' }}
                      >
                        <span className="text-lg font-semibold" style={{ color: BRAND }}>{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-[13px] uppercase tracking-[0.1em] font-semibold text-[#a8a5ac] dark:text-[#8d8691]">Segment {index + 1}</p>
                        <p className="mt-2 text-lg font-semibold text-[#1f1a22] dark:text-[#f0e8eb]">{item.title}</p>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-[#6f6770] dark:text-[#b8adb5]">{item.desc}</p>
                    <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-semibold text-[#6b3550] dark:text-[#d4a5bf] flex items-center gap-2">
                        Get started
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative h-64 lg:h-80 rounded-2xl overflow-hidden group-hover:shadow-lg transition-all" style={{ 
                  background: isDark ? 'rgba(42,36,41,0.40)' : 'rgba(107,53,80,0.06)',
                  border: isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(107,53,80,0.10)'
                }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-[#a8a5ac] dark:text-[#8d8691]">
                      <span className="text-6xl font-semibold opacity-20" style={{ color: BRAND }}>{index + 1}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 sm:py-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6770]">Social proof</p>
          <h2
            className="mx-auto mt-4 max-w-3xl font-serif font-light leading-[1.05] tracking-[-0.03em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
          >
            What SMEs say
            <br />
            after switching to Marii.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6f6770] sm:text-base">
            Real feedback from teams that want faster quotes, cleaner PDFs, and less admin.
          </p>
        </div>

        <div className="relative mx-auto mt-12 overflow-hidden rounded-[36px] border border-[rgba(31,26,34,0.07)] bg-[rgba(255,255,255,0.48)] px-4 py-8 shadow-[0_24px_80px_-56px_rgba(31,26,34,0.35)] dark:border-[rgba(211,203,207,0.08)] dark:bg-[rgba(255,255,255,0.03)] sm:px-8 sm:py-12">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setTestimonialAt(testimonialIndex - 1)}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[rgba(31,26,34,0.08)] bg-white p-2.5 text-[#1f1a22] shadow-[0_14px_30px_-24px_rgba(31,26,34,0.3)] transition-transform hover:scale-105 dark:border-[rgba(211,203,207,0.08)] dark:bg-[#241f27] dark:text-[#f0e8eb]"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setTestimonialAt(testimonialIndex + 1)}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[rgba(31,26,34,0.08)] bg-white p-2.5 text-[#1f1a22] shadow-[0_14px_30px_-24px_rgba(31,26,34,0.3)] transition-transform hover:scale-105 dark:border-[rgba(211,203,207,0.08)] dark:bg-[#241f27] dark:text-[#f0e8eb]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="relative mx-auto max-w-6xl" style={{ height: testimonialShellHeight }}>
            {[-1, 0, 1].map((offset) => {
              const testimonial = TESTIMONIALS[(testimonialIndex + offset + TESTIMONIALS.length) % TESTIMONIALS.length];
              const isCenter = offset === 0;
              const isLeft = offset < 0;
              const cardWidth = isCenter ? 'min(88vw, 38rem)' : 'min(74vw, 28rem)';
              const translateX = isCenter ? '-50%' : isLeft ? '-86%' : '-14%';

              return (
                <article
                  key={`${testimonial.name}-${offset}`}
                  ref={(node) => {
                    testimonialCardRefs.current[offset + 1] = node;
                  }}
                  className="absolute top-1/2 transition-all duration-500 ease-out"
                  style={{
                    left: isCenter ? '50%' : isLeft ? '24%' : '76%',
                    width: cardWidth,
                    transform: `translateX(${translateX}) translateY(-50%) scale(${isCenter ? 1 : 0.9})`,
                    opacity: isCenter ? 1 : 0.32,
                    zIndex: isCenter ? 3 : 1,
                    filter: isCenter ? 'none' : 'saturate(0.75)',
                  }}
                >
                  <div
                    className={`rounded-[28px] border bg-white p-6 shadow-[0_22px_50px_-36px_rgba(31,26,34,0.30)] transition-all duration-500 dark:bg-[#241f27] ${
                      isCenter
                        ? 'border-[rgba(31,26,34,0.07)] dark:border-[rgba(211,203,207,0.08)]'
                        : 'border-[rgba(31,26,34,0.04)] dark:border-[rgba(211,203,207,0.05)]'
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-[#1f1a22] dark:text-[#f0e8eb]">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7eef0] text-sm font-semibold text-[#6b3550] dark:bg-white/10 dark:text-[#f0e8eb]">
                        {testimonial.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#1f1a22] dark:text-[#f0e8eb]">{testimonial.name}</p>
                        <p className="text-[12px] text-[#6f6770]">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={`${testimonial.name}-${testimonial.role}`}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => setTestimonialAt(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === testimonialIndex
                    ? 'w-8 bg-[#6b3550]'
                    : 'w-2.5 bg-[rgba(107,53,80,0.24)] hover:bg-[rgba(107,53,80,0.42)]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 sm:py-28">
        <div className="mb-12 max-w-3xl">
          <h2
            className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Simple pricing for South African SMEs.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6f6770]">
            Pick a plan based on how many quotes you send each month. Upgrade when your team grows or top up when a
            busy month runs hot.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-[22px] border border-[rgba(31,26,34,0.07)] bg-white/72 p-4 shadow-[0_12px_30px_-24px_rgba(31,26,34,0.14)] dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6770]">Billing</p>
              <p className="mt-1 text-sm leading-relaxed text-[#6f6770]">
                Switch to yearly billing and save 10% on the price of every plan.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="currency-select" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6770]">Currency:</label>
              <select
                id="currency-select"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="rounded-full border border-[rgba(107,53,80,0.14)] bg-white px-3 py-2 text-sm font-semibold text-[#1f1a22] dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5 dark:text-[#f0e8eb]"
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="inline-flex w-full rounded-full border border-[rgba(107,53,80,0.14)] bg-[#f7eef0] p-1 dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5 sm:w-auto">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:flex-none ${
                billingCycle === 'monthly'
                  ? 'bg-[#6b3550] text-[#f7eef0] shadow-[0_10px_20px_-14px_rgba(107,53,80,0.45)]'
                  : 'text-[#6f6770] hover:text-[#1f1a22] dark:text-[#cfc7cb] dark:hover:text-[#f0e8eb]'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:flex-none ${
                billingCycle === 'yearly'
                  ? 'bg-[#6b3550] text-[#f7eef0] shadow-[0_10px_20px_-14px_rgba(107,53,80,0.45)]'
                  : 'text-[#6f6770] hover:text-[#1f1a22] dark:text-[#cfc7cb] dark:hover:text-[#f0e8eb]'
              }`}
            >
              Year
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-[22px] p-6"
              style={{
                background: plan.popular ? 'rgba(107,53,80,0.10)' : isDark ? 'rgba(42,36,41,0.60)' : 'rgba(255,255,255,0.72)',
                border: plan.popular ? '1px solid rgba(107,53,80,0.25)' : isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)',
                boxShadow: plan.popular ? '0 20px 50px -28px rgba(107,53,80,0.40)' : '0 1px 2px rgba(31,26,34,0.04), 0 8px 24px -10px rgba(31,26,34,0.04)',
              }}
            >
              {plan.popular ? (
                <span className="absolute right-4 top-4 rounded-full bg-[#6b3550] px-3 py-1 text-[11px] font-semibold text-[#f7eef0]">
                  Most popular
                </span>
              ) : null}
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6770]">{plan.name}</p>
              <h3 className="mt-4 font-serif text-[1.7rem] font-light leading-tight text-[#1f1a22] dark:text-[#f0e8eb]">
                {plan.label}
              </h3>
              <p className="mt-3 text-[2rem] font-light leading-none text-[#6b3550]">
                {billingCycle === 'monthly'
                  ? `${formatRand(plan.monthlyPrice)} / mo`
                  : `${formatRand(plan.monthlyPrice * (1 - BILLING_SAVE_RATE))} / mo`}
              </p>
              {billingCycle === 'yearly' ? (
                <p className="mt-1 text-[13px] leading-relaxed text-[#6f6770]">
                  {formatRand(plan.monthlyPrice * 12 * (1 - BILLING_SAVE_RATE))} / yr billed yearly
                </p>
              ) : null}
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#6f6770]">{plan.quotes}</p>
              {billingCycle === 'yearly' ? (
                <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-[#6b3550]">
                  Yearly billing saves 10%
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-[#6f6770]">{plan.fit}</p>

              <div className="mt-5 rounded-[16px] border border-[rgba(31,26,34,0.07)] bg-white p-4 dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6b3550]">
                  {plan.analyticsTitle}
                </p>
                <ul className="mt-3 space-y-2">
                  {plan.analytics.map((item) => (
                    <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-[#1f1a22] dark:text-[#f0e8eb]">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#6b3550]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-[#6f6770]">{plan.why}</p>

              <button
                type="button"
                onClick={() => openWaitlist(plan.name)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[rgba(31,26,34,0.08)] bg-white px-4 py-3 text-sm font-semibold text-[#1f1a22] transition-opacity hover:opacity-90 dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5 dark:text-[#f0e8eb]"
              >
                Join wait list
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[20px] border border-[rgba(107,53,80,0.18)] bg-[#6b3550] px-6 py-5 text-[#f7eef0]">
          <p className="text-sm font-semibold uppercase tracking-[0.12em]">Busy month? Keep the pipeline moving.</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#f7eef0]/80">
            On-Demand Quote Packs are sold at a fixed rate of R2 per quote, with a minimum buy of 10 quotes. When a team
            reaches 90 percent of its allowance, Marii gives a gentle warning. At 100 percent, it prompts an upgrade
            or top-up so the workflow does not stop mid-sale.
          </p>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 sm:pb-28">
        <div className="mb-10 max-w-3xl">
          <h2
            className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Common questions about Marii.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.question}
              className="group rounded-[18px] border border-[rgba(31,26,34,0.07)] bg-white/75 p-5 open:bg-white dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="text-[15px] font-semibold text-[#1f1a22] dark:text-[#f0e8eb]">{item.question}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0e8eb] text-[#6b3550] transition-transform group-open:rotate-45 dark:bg-white/10">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#6f6770]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="footer-cta" className="px-4 pb-16 sm:px-6 lg:px-8 py-4">
        <div
          className="mx-auto max-w-7xl rounded-[22px] px-6 py-10 sm:px-10 sm:py-14 lg:px-14"
          style={{
            background: isDark ? 'rgba(42,36,41,0.80)' : 'rgba(255,255,255,0.82)',
            border: isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)',
            boxShadow: '0 2px 8px rgba(31,26,34,0.04), 0 32px 80px -24px rgba(31,26,34,0.10)',
          }}
        >
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-[#6f6770]">
              Join the wait list
            </p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
              <div>
                <Image
                  src={isDark ? brandAssets.logoDark : brandAssets.logoLight}
                  alt="Marii"
                  width={600}
                  height={195}
                  className="h-[156px] w-auto"
                  priority
                />
                <h2
                  className="mt-5 max-w-2xl font-serif font-light leading-[1.04] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
                >
                  Join the wait list and get one month extra free with 500 quotes.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6f6770] sm:text-base">
                  When Marii launches, wait list members get an extra month on top of the trial, with 500 quotes
                  included. Add your details and we will keep you updated.
                </p>
                <div className="mt-6 rounded-[18px] border border-[rgba(31,26,34,0.07)] bg-[#f7eef0] p-4 text-sm leading-relaxed text-[#1f1a22] dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5 dark:text-[#f0e8eb]">
                  Use this if you want a simple way to test Marii before you commit. We will only use your details to
                  contact you about the launch and product updates.
                </div>
              </div>

              <form className="rounded-[22px] border border-[rgba(31,26,34,0.07)] bg-white/75 p-5 shadow-[0_12px_30px_-24px_rgba(31,26,34,0.18)] dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5 sm:p-6" onSubmit={handleWaitlistSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6770]">
                      Name
                    </span>
                    <input
                      value={formState.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      required
                      className="w-full rounded-[14px] border border-[rgba(31,26,34,0.10)] bg-white px-4 py-3 text-sm text-[#1f1a22] outline-none transition-colors placeholder:text-[#a8a5ac] focus:border-[#6b3550] dark:border-[rgba(211,203,207,0.10)] dark:bg-[#1f1a22] dark:text-[#f0e8eb]"
                      placeholder="Your name"
                    />
                  </label>
              <label className="block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6770]">
                  Email
                </span>
                <input
                      type="email"
                      value={formState.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      required
                      className="w-full rounded-[14px] border border-[rgba(31,26,34,0.10)] bg-white px-4 py-3 text-sm text-[#1f1a22] outline-none transition-colors placeholder:text-[#a8a5ac] focus:border-[#6b3550] dark:border-[rgba(211,203,207,0.10)] dark:bg-[#1f1a22] dark:text-[#f0e8eb]"
                      placeholder="you@company.co.za"
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6770]">
                      Phone number
                    </span>
                    <input
                      value={formState.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      required
                      className="w-full rounded-[14px] border border-[rgba(31,26,34,0.10)] bg-white px-4 py-3 text-sm text-[#1f1a22] outline-none transition-colors placeholder:text-[#a8a5ac] focus:border-[#6b3550] dark:border-[rgba(211,203,207,0.10)] dark:bg-[#1f1a22] dark:text-[#f0e8eb]"
                      placeholder="+27 ..."
                    />
                </label>
              </div>

                <div className="mt-4">
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6770]">
                      Desired tier
                    </span>
                    <select
                      value={formState.desiredTier}
                      onChange={(event) => updateField('desiredTier', event.target.value)}
                      className="w-full rounded-[14px] border border-[rgba(31,26,34,0.10)] bg-white px-4 py-3 text-sm text-[#1f1a22] outline-none transition-colors focus:border-[#6b3550] dark:border-[rgba(211,203,207,0.10)] dark:bg-[#1f1a22] dark:text-[#f0e8eb]"
                    >
                      <option value="">No preference</option>
                      {TIER_OPTIONS.map((tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-5 space-y-3 rounded-[18px] border border-[rgba(31,26,34,0.07)] bg-[#f7eef0] p-4 dark:border-[rgba(211,203,207,0.08)] dark:bg-white/5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6770]">
                    Marketing consent
                  </p>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#1f1a22] dark:text-[#f0e8eb]">
                    <input
                      type="checkbox"
                      checked={formState.emailMarketing}
                      onChange={(event) => updateField('emailMarketing', event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[rgba(31,26,34,0.18)] text-[#6b3550] focus:ring-[#6b3550]"
                    />
                    <span>I agree to be contacted by email about launch updates and product news.</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#1f1a22] dark:text-[#f0e8eb]">
                    <input
                      type="checkbox"
                      checked={formState.whatsappMarketing}
                      onChange={(event) => updateField('whatsappMarketing', event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[rgba(31,26,34,0.18)] text-[#6b3550] focus:ring-[#6b3550]"
                    />
                    <span>I agree to be contacted by WhatsApp about launch updates and product news.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ background: BRAND, color: PAPER }}
                >
                  {submitState === 'submitting' ? 'Sending...' : 'Join wait list'}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="mt-3 text-sm text-[#6f6770]">
                  Wait list members get one extra month and 500 quotes when we launch. Desired tier is optional.
                </p>
                {submitMessage ? (
                  <p
                    className={`mt-3 rounded-[14px] px-4 py-3 text-sm ${
                      submitState === 'success'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        : 'bg-[#6b3550]/10 text-[#6b3550] dark:text-[#f0e8eb]'
                    }`}
                  >
                    {submitMessage}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" style={{ borderTop: `1px solid ${softBorder}` }}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Image
              src={isDark ? brandAssets.logoDark : brandAssets.logoLight}
              alt="Marii"
              width={80}
              height={26}
              className="mb-2 h-6 w-auto"
            />
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#6f6770]">
              Built for Southern Africa
            </p>
          </div>

          <nav className="flex gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-[13px] text-[#6f6770] transition-colors duration-200 hover:text-[#1f1a22] dark:hover:text-[#f0e8eb]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p className="font-mono text-[11px] tracking-wide text-[#6f6770]/60">&copy; 2026 Marii</p>
        </div>
      </footer>
    </main>
  );
}
