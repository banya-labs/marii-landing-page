'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Moon, Sun, ArrowRight, Check, MessageSquare, FileText, Zap, BarChart3, Shield, Smartphone } from 'lucide-react';

const RotatingJob = () => {
  const jobs = [
    'mechanics',
    'designers',
    'contractors',
    'plumbers',
    'electricians',
    'photographers',
    'printers',
    'freelancers',
    'consultants',
    'painters',
    'welders',
    'landscapers',
  ];

  const [currentJob, setCurrentJob] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJob((prev) => (prev + 1) % jobs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full align-middle flip-rotate-word"
      style={{
        background: '#6b3550',
        color: '#f7eef0',
        verticalAlign: 'middle',
        minWidth: '100px',
        justifyContent: 'center',
        fontSize: 'inherit',
      }}
    >
      {jobs[currentJob]}
    </span>
  );
};

export default function Home() {
  const { isDark, toggleTheme, mounted } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#f0e8eb] dark:bg-[#1f1a22] text-[#1f1a22] dark:text-[#f0e8eb] font-sans transition-colors duration-300">

      {/* ─────────────────────────────────────────────
          SECTION 1 — BIG HERO CARD
          Outer page is the quartz background.
          Card is white/glass sitting on top of it.
      ───────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div
          className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-[28px] dark:rounded-[28px]"
          style={{
            background: isDark ? 'rgba(42,36,41,0.85)' : 'rgba(255,255,255,0.92)',
            border: isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)',
            boxShadow: '0 2px 8px rgba(31,26,34,0.06), 0 32px 80px -24px rgba(31,26,34,0.12)',
            minHeight: '82vh',
          }}
        >
          {/* ── NAV INSIDE THE HERO CARD ── */}
          <nav className="flex items-center justify-between px-6 sm:px-10 pt-6 pb-2">
            {/* Logo - hidden on desktop, shown on mobile */}
            <div className="flex md:hidden items-center">
              <Image
                src={isDark ? '/marii-logo-white.svg' : '/marii-logo-black.svg'}
                alt="Marii"
                width={100}
                height={34}
                className="h-7 w-auto"
                priority
              />
            </div>

            {/* Center pill nav with logo */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-[#f0e8eb]/70 dark:bg-[#1f1a22]/60 border border-[rgba(31,26,34,0.08)] dark:border-[rgba(211,203,207,0.10)] backdrop-blur-sm">
              {/* Logo inside pill - 50% larger */}
              <Image
                src={isDark ? '/marii-logo-white.svg' : '/marii-logo-black.svg'}
                alt="Marii"
                width={100}
                height={34}
                className="h-10 w-auto"
                priority
              />
              <div className="w-px h-6 bg-[rgba(31,26,34,0.10)] dark:bg-[rgba(211,203,207,0.15)]"></div>
              {[
                { label: 'Features', href: '#features' },
                { label: 'Workflow', href: '#workflow' },
                { label: 'Industries', href: '#industries' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-4 py-1.5 text-sm font-medium text-[#6f6770] hover:text-[#1f1a22] dark:hover:text-[#f0e8eb] transition-colors duration-200 rounded-full hover:bg-white/60 dark:hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex md:hidden items-center">
              <a
                href="#waitlist"
                onClick={(e) => { e.preventDefault(); document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#6f6770] hover:text-[#1f1a22] dark:hover:text-[#f0e8eb] transition-colors duration-200"
              >
                Early Access
              </a>
              <button
                onClick={(e) => { e.preventDefault(); document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: '#6b3550', color: '#f7eef0' }}
              >
                Join Waitlist
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#f0e8eb] dark:hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDark
                  ? <Sun className="w-4 h-4 text-[#6f6770]" />
                  : <Moon className="w-4 h-4 text-[#6f6770]" />
                }
              </button>
            </div>
          </nav>

          {/* ── HERO BODY: headline left, phone mockup right ── */}
          <div className="relative flex flex-col md:flex-row items-end justify-between px-6 sm:px-10 pb-10 pt-8 md:pt-0" style={{ minHeight: '68vh' }}>

            {/* Left: caption + massive headline */}
            <div className="relative z-10 flex flex-col justify-end pb-2 max-w-xl">
              <p className="font-mono text-[11px] tracking-[0.10em] uppercase text-[#6f6770] mb-5">
                AI-Powered Quote Generation
              </p>
              <h1
                className="font-serif font-light leading-[0.95] tracking-[-0.03em] text-[#1f1a22] dark:text-[#f0e8eb]"
                style={{ fontSize: 'clamp(4rem, 9vw, 7.5rem)' }}
              >
                Quote
                <br />
                faster,<br />
                <span style={{ color: '#6b3550' }}>always.</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[#6f6770] max-w-sm">
                Tell Marii what your customer needs. Get a professional, print-ready quote in seconds — no spreadsheets, no guesswork.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={() => document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{ background: '#6b3550', color: '#f7eef0' }}
                >
                  Get Early Access
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-sm font-medium transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(31,26,34,0.10)', color: '#1f1a22' }}
                >
                  See Features
                </button>
              </div>
            </div>

            {/* Right: phone mockup */}
            <div className="absolute right-0 bottom-0 top-0 hidden md:flex items-end justify-end pointer-events-none w-[60%] md:w-[62%] lg:w-[65%] -ml-[10%]">
              {/* Phone frame */}
              <div
                className="relative mr-6 mb-6 md:mr-8 lg:mr-10"
                style={{ width: 280, height: 560 }}
              >
                {/* Phone shell */}
                <div
                  className="absolute inset-0 rounded-[40px] overflow-hidden"
                  style={{
                    background: isDark ? '#2a2429' : '#1f1a22',
                    boxShadow: '0 32px 80px -16px rgba(31,26,34,0.40), 0 4px 16px rgba(31,26,34,0.20)',
                  }}
                >
                  {/* Screen content — Marii app splash */}
                  <div className="absolute inset-[3px] rounded-[38px] overflow-hidden flex flex-col items-center justify-center"
                    style={{ background: isDark ? '#1f1a22' : '#f7eef0' }}
                  >
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 pt-2">
                      <span className="font-mono text-[10px] text-[#6f6770]">9:41</span>
                      <div className="w-20 h-5 rounded-full bg-[#1f1a22] dark:bg-[#2a2429] mx-auto absolute left-1/2 -translate-x-1/2 top-1" />
                      <div className="flex gap-1 items-center">
                        <div className="w-3 h-2 rounded-sm bg-[#6f6770]/40" />
                      </div>
                    </div>

                    {/* Center: Marii logo */}
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Image
                        src={isDark ? '/marii-logo-white.svg' : '/marii-logo-black.svg'}
                        alt="Marii app"
                        width={90}
                        height={30}
                        className="w-24 h-auto opacity-90"
                      />
                      <div
                        className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                        style={{ background: '#6b3550' }}
                      >
                        <Image
                          src="/marii-icon-white.svg"
                          alt=""
                          width={28}
                          height={28}
                          className="w-7 h-7"
                        />
                      </div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#6f6770] mt-1">
                        how much?
                      </p>
                    </div>

                    {/* Bottom bar */}
                    <div className="absolute bottom-6 left-4 right-4 space-y-2">
                      {/* Fake chat bubble */}
                      <div className="rounded-[10px] px-3 py-2 text-[10px] text-[#1f1a22] dark:text-[#f0e8eb]"
                        style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(31,26,34,0.06)' }}>
                        &ldquo;2 brake pads + 1 hour labour&rdquo;
                      </div>
                      <div className="rounded-[10px] px-3 py-2 text-[10px] text-[#f7eef0] ml-6"
                        style={{ background: '#6b3550' }}>
                        Quote ready: R 1,240.00
                      </div>
                    </div>
                  </div>

                  {/* Side button */}
                  <div className="absolute right-0 top-24 w-1 h-10 rounded-l-sm" style={{ background: isDark ? '#3d3841' : '#3a3540' }} />
                  {/* Vol buttons */}
                  <div className="absolute left-0 top-20 w-1 h-8 rounded-r-sm" style={{ background: isDark ? '#3d3841' : '#3a3540' }} />
                  <div className="absolute left-0 top-32 w-1 h-8 rounded-r-sm" style={{ background: isDark ? '#3d3841' : '#3a3540' }} />
                </div>

                {/* Floating stat card */}
                <div
                  className="absolute -left-14 bottom-24 px-4 py-3 rounded-[14px] shadow-lg"
                  style={{
                    background: isDark ? 'rgba(42,36,41,0.9)' : 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(31,26,34,0.08)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#6f6770]">Avg time saved</p>
                  <p className="font-serif text-2xl font-light text-[#1f1a22] dark:text-[#f0e8eb] mt-0.5">12 min</p>
                  <p className="text-[10px] text-[#6f6770]">per quote</p>
                </div>

                {/* Floating type tag */}
                <div
                  className="absolute -right-10 top-20 px-3 py-1.5 rounded-full text-[11px] font-semibold shadow-lg"
                  style={{ background: '#6b3550', color: '#f7eef0' }}
                >
                  PDF Ready
                </div>
              </div>
            </div>

          </div>

          {/* ── Bottom ticker row ── */}
          <div className="border-t px-6 sm:px-10 py-3.5 flex items-center justify-between"
            style={{ borderColor: 'rgba(31,26,34,0.07)' }}>
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#6f6770]">
              Built for Southern African service businesses
            </p>
            <div className="hidden sm:flex items-center gap-4">
              {['Auto shops', 'Designers', 'Contractors', 'Freelancers'].map((t) => (
                <span key={t} className="font-mono text-[11px] tracking-widest uppercase text-[#6f6770]/60">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 2 — PULL QUOTE / EDITORIAL HEADING
          Big Fraunces text with inline business pills
      ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <h2
          className="font-serif font-light leading-[1.15] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb] flex flex-col items-center"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
        >
          <div>The smart way for</div>
          <div style={{ margin: '0.5em 0' }}>
            <RotatingJob />
          </div>
          <div>to send professional PDF quotations.</div>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-[#6f6770] max-w-2xl mx-auto">
          Stop losing time on manual calculations and copy-paste quotes. Marii brings AI precision to every estimate — so you close more jobs and spend less time on admin.
        </p>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 3 — FEATURE SHOWCASE
          Left: dark app mockup card
          Right: numbered features + plum stat card
      ────────────────────────────────���──────────── */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* Left — dark app mockup card */}
          <div
            className="relative rounded-[22px] overflow-hidden"
            style={{
              background: isDark ? '#2a2429' : '#1f1a22',
              minHeight: 480,
              boxShadow: '0 32px 80px -24px rgba(31,26,34,0.40)',
            }}
          >
            {/* Fake app UI inside the card */}
            <div className="p-6">
              {/* App chrome bar */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="flex-1 mx-3 h-6 rounded-md bg-white/5 flex items-center px-3">
                  <span className="font-mono text-[10px] text-white/30">marii.app / quotes</span>
                </div>
              </div>

              {/* Fake quote conversation */}
              <div className="space-y-3">
                <p className="font-mono text-[11px] tracking-widest uppercase text-white/30 mb-4">New Quote Request</p>

                <div className="rounded-[12px] p-3 text-sm text-white/70" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  &ldquo;I need a quote for a full service — oil change, spark plugs, and brake pad replacement front and rear.&rdquo;
                </div>

                <div className="rounded-[12px] p-3 space-y-2" style={{ background: 'rgba(107,53,80,0.25)', border: '1px solid rgba(107,53,80,0.40)' }}>
                  <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#c97ea8' }}>Marii parsed 4 items</p>
                  {['Engine Oil + Filter', 'Spark Plug Set (4)', 'Front Brake Pads', 'Rear Brake Pads'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[13px] text-white/80">{item}</span>
                      <span className="font-mono text-[12px] text-white/50">
                        {['R 320', 'R 480', 'R 560', 'R 560'][i]}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-2 flex justify-between">
                    <span className="text-sm font-semibold text-white/90">Total</span>
                    <span className="font-mono text-sm font-semibold" style={{ color: '#c97ea8' }}>R 1,920.00</span>
                  </div>
                </div>

                {/* PDF preview bar */}
                <div className="flex items-center gap-3 p-3 rounded-[10px]" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-8 h-10 rounded-[6px] flex items-center justify-center" style={{ background: '#6b3550' }}>
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] text-white/80 font-medium">quote_2026-07-07.pdf</p>
                    <p className="font-mono text-[10px] text-white/30">Generated · 2 pages · Branded</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <ArrowRight className="w-3 h-3 text-white/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-sm text-white/50">See the full workflow</p>
              <button
                onClick={() => document.querySelector('#workflow')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-medium text-white/80 transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                Workflow <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right — numbered feature list + stat card */}
          <div className="flex flex-col gap-4">
            {/* Numbered features */}
            <div className="space-y-0 divide-y divide-[rgba(31,26,34,0.07)] dark:divide-[rgba(211,203,207,0.08)]">
              {[
                {
                  num: '01',
                  title: 'Natural Language Input',
                  desc: 'Type or paste any job description — Marii\'s AI parses items, quantities, and specs from plain text.',
                },
                {
                  num: '02',
                  title: 'Smart Catalog Matching',
                  desc: 'Every parsed item is matched against your pricing catalog instantly. Rates stay yours, always accurate.',
                },
                {
                  num: '03',
                  title: 'Professional PDF Output',
                  desc: 'Branded, print-ready PDFs generated in one click. Your logo, your colors, your signature block.',
                },
                {
                  num: '04',
                  title: 'Send via Any Channel',
                  desc: 'WhatsApp, email, download — delivered to your client in seconds. Tracked and logged automatically.',
                },
              ].map((feat) => (
                <div key={feat.num} className="flex gap-5 py-5">
                  <span
                    className="font-mono text-[13px] mt-0.5 flex-shrink-0 w-7"
                    style={{ color: '#6b3550' }}
                  >
                    {feat.num}
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold text-[15px] text-[#1f1a22] dark:text-[#f0e8eb]">{feat.title}</p>
                    <p className="text-sm leading-relaxed text-[#6f6770]">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Plum stat card */}
            <div
              className="rounded-[18px] p-6 mt-2"
              style={{ background: '#6b3550' }}
            >
              <p className="font-serif font-light leading-none tracking-tight text-[#f7eef0]"
                style={{ fontSize: '3.5rem' }}>
                10&times;
              </p>
              <p className="text-[#f7eef0]/70 text-sm mt-2 leading-relaxed">
                Faster than building quotes manually in Word or Excel — and every quote looks like it was made by a design agency.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 4 — CAPABILITIES GRID
      ──────────────────��────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2 className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Everything you need<br />in one place.
          </h2>
          <p className="text-sm text-[#6f6770] max-w-xs">
            No integrations to wire up. No extra subscriptions. Marii is the whole system.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: MessageSquare,
              title: 'Conversational AI',
              desc: 'Powered by Gemini. Understands natural language, context, and even messy customer messages.',
            },
            {
              icon: FileText,
              title: 'PDF Template Designer',
              desc: 'Build your quote layout once. Drag and drop, custom fonts, your logo — pixel-perfect every time.',
            },
            {
              icon: Zap,
              title: 'Pricing Catalog',
              desc: 'One place for all your rates. Update once, apply to every quote automatically.',
            },
            {
              icon: BarChart3,
              title: 'Quote Analytics',
              desc: 'Track acceptance rates, average deal values, and quote volume over time.',
            },
            {
              icon: Smartphone,
              title: 'Mobile + Desktop',
              desc: 'Android, iOS, desktop app and browser — same experience on every screen.',
            },
            {
              icon: Shield,
              title: 'Offline-First Security',
              desc: 'Your data lives locally. Secure auth, no cloud dependency, POPIA-ready.',
            },
          ].map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-[18px] group cursor-default transition-all duration-200"
                style={{
                  background: isDark ? 'rgba(42,36,41,0.60)' : 'rgba(255,255,255,0.70)',
                  border: isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)',
                  boxShadow: '0 1px 2px rgba(31,26,34,0.04), 0 8px 24px -10px rgba(31,26,34,0.04)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4"
                  style={{ background: 'rgba(107,53,80,0.10)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#6b3550' }} />
                </div>
                <p className="font-semibold text-[14px] text-[#1f1a22] dark:text-[#f0e8eb] mb-1.5">{cap.title}</p>
                <p className="text-[13px] leading-relaxed text-[#6f6770]">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 5 — WORKFLOW STEPS
      ───────────────────────────────────────────── */}
      <section id="workflow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 sm:pb-28">
        <h2 className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb] mb-12"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          From request to quote<br />in four steps.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Build your catalog', desc: 'Add services, parts, and rates. Marii stores your pricing logic centrally.' },
            { step: '02', title: 'Chat the job', desc: 'Paste or type the customer\'s request. Marii extracts every item instantly.' },
            { step: '03', title: 'Review & refine', desc: 'Edit quantities, add notes, apply discounts — all on one clean screen.' },
            { step: '04', title: 'Generate & send', desc: 'One tap produces a branded PDF. Send via WhatsApp, email, or download.' },
          ].map((s) => (
            <div key={s.step} className="space-y-3">
              <span
                className="font-serif font-light"
                style={{ fontSize: '3.5rem', lineHeight: 1, color: '#6b3550' }}
              >
                {s.step}
              </span>
              <p className="font-semibold text-[15px] text-[#1f1a22] dark:text-[#f0e8eb]">{s.title}</p>
              <p className="text-[13px] leading-relaxed text-[#6f6770]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 6 — INDUSTRIES
      ───────────────────────────────────────────── */}
      <section id="industries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20 sm:pb-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Works for your industry.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { role: 'Automotive Shops', use: 'Parts + labour with service history tracking' },
            { role: 'Graphic Designers', use: 'Design packages with revision rounds' },
            { role: 'Contractors', use: 'Material lists + labour per project scope' },
            { role: 'Print Shops', use: 'Sizes, finishes, and quantity pricing tiers' },
            { role: 'Freelancers', use: 'Project rates, retainers, milestone pricing' },
            { role: 'Event Planners', use: 'Vendor bundles, venues + VAT all-in' },
            { role: 'Plumbers', use: 'Call-out fees, parts + emergency markups' },
            { role: 'Photographers', use: 'Session packages with print add-ons' },
            { role: 'Consultants', use: 'Hourly, project and retainer rate models' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-[14px] transition-all duration-200"
              style={{
                background: isDark ? 'rgba(42,36,41,0.60)' : 'rgba(255,255,255,0.70)',
                border: isDark ? '1px solid rgba(211,203,207,0.07)' : '1px solid rgba(31,26,34,0.07)',
              }}
            >
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6b3550' }} />
              <div>
                <p className="font-semibold text-[13px] text-[#1f1a22] dark:text-[#f0e8eb]">{item.role}</p>
                <p className="text-[12px] text-[#6f6770] mt-0.5">{item.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 7 — WAITLIST CTA
      ───────────────────────────────────────────── */}
      <section id="waitlist" className="px-4 sm:px-6 lg:px-8 py-4 pb-16">
        <div
          className="max-w-7xl mx-auto rounded-[22px] p-8 sm:p-14"
          style={{
            background: isDark ? 'rgba(42,36,41,0.80)' : 'rgba(255,255,255,0.80)',
            border: isDark ? '1px solid rgba(211,203,207,0.08)' : '1px solid rgba(31,26,34,0.07)',
            boxShadow: '0 2px 8px rgba(31,26,34,0.04), 0 32px 80px -24px rgba(31,26,34,0.10)',
          }}
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.10em] uppercase text-[#6f6770] mb-4">
              Early Access
            </p>
            <h2
              className="font-serif font-light leading-[1.08] tracking-[-0.025em] text-[#1f1a22] dark:text-[#f0e8eb] mb-4"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
            >
              Be first in line.
            </h2>
            <p className="text-base leading-relaxed text-[#6f6770] mb-8 max-w-lg">
              Join the waitlist for early access. First 100 businesses get 3 months free and lifetime early-bird pricing. No credit card needed.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Input
                  type="email"
                  placeholder="your@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-[12px] text-sm"
                  style={{
                    background: isDark ? 'rgba(31,26,34,0.60)' : 'rgba(255,255,255,0.90)',
                    border: '1px solid rgba(31,26,34,0.14)',
                    color: isDark ? '#f0e8eb' : '#1f1a22',
                  }}
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[12px] text-sm font-semibold whitespace-nowrap transition-opacity duration-200 hover:opacity-90"
                  style={{ background: '#6b3550', color: '#f7eef0' }}
                >
                  Join Waitlist
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {submitted && (
                <p className="mt-3 text-sm font-medium" style={{ color: '#6b3550' }}>
                  You&apos;re on the list. We&apos;ll be in touch soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────── */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        style={{ borderTop: '1px solid rgba(31,26,34,0.07)' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <Image
              src={isDark ? '/marii-logo-white.svg' : '/marii-logo-black.svg'}
              alt="Marii"
              width={80}
              height={26}
              className="h-6 w-auto mb-2"
            />
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#6f6770]">
              Built for Southern Africa
            </p>
          </div>
          <nav className="flex gap-6">
            {[
              { label: 'Features', href: '#features' },
              { label: 'Workflow', href: '#workflow' },
              { label: 'Industries', href: '#industries' },
              { label: 'Waitlist', href: '#waitlist' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-[13px] text-[#6f6770] hover:text-[#1f1a22] dark:hover:text-[#f0e8eb] transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="font-mono text-[11px] text-[#6f6770]/60 tracking-wide">
            &copy; 2026 Marii
          </p>
        </div>
      </footer>

    </main>
  );
}
