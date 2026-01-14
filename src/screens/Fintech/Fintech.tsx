import React, { useEffect } from "react";
import {
  LayoutDashboard,
  ArrowRight,
  AlertCircle,
  X,
  TrendingDown,
  Lightbulb,
  ListFilter,
  Target,
  Zap,
  Check,
  Search,
  Users,
  Ban,
  PenTool,
  Layers,
  RefreshCw,
  Flag,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckSquare,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export const Fintech = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    const els = Array.from(document.querySelectorAll(".animate-on-scroll"));
    els.forEach((el) => {
      el.classList.add(
        "transition-all",
        "duration-700",
        "opacity-0",
        "translate-y-8"
      );
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ all: "initial" } as React.CSSProperties}>
      <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-slate-200 selection:text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-lg tracking-tight">Oluwanifemi.</div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#problem" className="hover:text-slate-900 transition-colors">
              The Problem
            </a>
            <a href="#solution" className="hover:text-slate-900 transition-colors">
              Solution
            </a>
            <a href="#process" className="hover:text-slate-900 transition-colors">
              Process
            </a>
            <a href="#about" className="hover:text-slate-900 transition-colors">
              About
            </a>
          </div>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="absolute inset-x-0 top-0 -z-10 h-full pointer-events-none">
          <div className="mx-auto max-w-7xl h-full">
            <div className="h-full w-full bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.10)_0%,transparent_50%)]" />
          </div>
        </div>

        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-1 rounded-full text-slate-600 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for projects
          </div>

          <h1 className="md:text-7xl leading-[1.1] text-5xl font-semibold text-slate-900 tracking-tight mb-8 animate-on-scroll">
            Fintech Ops Dashboards Are
            <br className="hidden md:block" />
            <span className="text-slate-400">Slowing Your Team Down.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-slate-500 max-w-2xl mb-10 font-medium animate-on-scroll delay-100">
            I help fintech operations teams turn overloaded dashboards into clear,
            action-first control centers without adding new features or touching
            your backend.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 animate-on-scroll delay-200">
            <a
              href="#contact"
              className="bg-slate-900 text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4" />
              Fix My Ops Dashboard
            </a>

            <a
              href="#process"
              className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              See How It Works
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-8 border-t border-slate-100 animate-on-scroll delay-300">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-4">
              Trusted by teams across payments and banking
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User"
                />
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User"
                />
              </div>
              <span className="ml-2">Designed for 1,000+ daily active ops users.</span>
            </div>
          </div>
        </div>
      </header>

      {/* Problem */}
      <section
        id="problem"
        className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-100"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
              Your ops dashboard shows everything{" "}
              <span className="text-slate-400">except what matters right now.</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-base leading-relaxed">
              <p>Most fintech dashboards were not designed for operations teams. They were designed to display data.</p>
              <p>Ops teams need to spot issues fast, prioritize correctly, and act without second guessing.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-on-scroll delay-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              The Current Reality
            </h3>

            <ul className="space-y-4">
              {[
                "Too many metrics competing for attention",
                "Overwhelming volume of unprioritized alerts",
                "No clear visual hierarchy or flow",
                'No indication of "what should I do first?"',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Result: Slower response, missed issues, burnout.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insight */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div className="mb-8 flex justify-center animate-on-scroll">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Lightbulb className="w-6 h-6" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-8">
          The problem is not a lack of data. It is a lack of{" "}
          <span className="text-blue-600">clarity</span>.
        </h2>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          When everything is urgent, nothing is. Good ops dashboards do not show more.
          They show what matters now, what needs attention next, and what can wait.
        </p>
      </section>

      {/* Solution */}
      <section
        id="solution"
        className="py-24 px-6 md:px-12 bg-slate-900 text-white rounded-t-[2.5rem] md:rounded-t-[4rem]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-on-scroll">
            <div>
              <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">
                The Solution
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                I redesign your dashboard
                <br />
                to be action first.
              </h2>
            </div>

            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              In 14 days, I take your most critical fintech ops dashboard and transform it
              without backend changes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group animate-on-scroll delay-100">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <ListFilter className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Clarify Hierarchy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Restructuring information so the most critical data points naturally catch the eye first.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group animate-on-scroll delay-200">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Surface Priorities</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Highlighting actionable items instantly so operators know exactly what to tackle next.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group animate-on-scroll delay-300">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Reduce Load</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Cutting visual noise to make daily decisions faster, safer, and less stressful.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-center items-center text-xs text-slate-500 border-t border-white/10 pt-8">
            {["No new features", "No backend changes", "No months long redesigns"].map((t, i) => (
              <React.Fragment key={t}>
                <span className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-blue-500" />
                  {t}
                </span>
                {i !== 2 && <span className="w-1 h-1 bg-slate-700 rounded-full" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-500">A focused, low risk engagement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100 -z-10" />

          <div className="bg-white p-6 md:p-0 animate-on-scroll">
            <div className="w-16 h-16 bg-white border border-slate-200 text-slate-900 rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-sm">
              1
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Week 1: Audit</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex gap-2">
                <Search className="w-4 h-4 shrink-0 mt-0.5" />
                Audit existing dashboard
              </li>
              <li className="flex gap-2">
                <Users className="w-4 h-4 shrink-0 mt-0.5" />
                Understand workflows
              </li>
              <li className="flex gap-2">
                <Ban className="w-4 h-4 shrink-0 mt-0.5" />
                Identify blockers
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 md:p-0 animate-on-scroll delay-200">
            <div className="w-16 h-16 bg-white border border-slate-200 text-slate-900 rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-sm">
              2
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Week 2: Redesign</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex gap-2">
                <PenTool className="w-4 h-4 shrink-0 mt-0.5" />
                Redesign with defaults
              </li>
              <li className="flex gap-2">
                <Layers className="w-4 h-4 shrink-0 mt-0.5" />
                Create action first layout
              </li>
              <li className="flex gap-2">
                <RefreshCw className="w-4 h-4 shrink-0 mt-0.5" />
                Iterate with team
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 md:p-0 animate-on-scroll delay-300">
            <div className="w-16 h-16 bg-green-50 border border-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-sm">
              <Flag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">End Result</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-500" />
                A dashboard teams trust
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-500" />
                Faster decisions
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-500" />
                Fewer mistakes
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Is / Is Not */}
      <section className="py-24 bg-slate-50 px-6 md:px-12 border-y border-slate-100">
        <div className="max-w-5xl mx-auto animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-slate-400" />
                This is for you if:
              </h3>
              <ul className="space-y-4">
                {[
                  "Your ops team relies on dashboards daily.",
                  "Decisions feel slower than they should.",
                  "Errors come from missed signals, not lack of data.",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
                  >
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <ThumbsDown className="w-5 h-5 text-slate-400" />
                This is NOT:
              </h3>
              <ul className="space-y-4">
                {["A full product redesign", "A branding exercise", "A UI facelift for aesthetics"].map(
                  (t) => (
                    <li key={t} className="flex items-start gap-3 p-4 opacity-75">
                      <X className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-slate-500 text-sm">{t}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes & About */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-8">
              Outcomes
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Faster incident response</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Teams spot critical errors in seconds, not minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Clearer daily priorities</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Operational friction reduced by removing cognitive load.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">More confidence</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    This is not about beauty. It is about control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 md:p-10 animate-on-scroll delay-200">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100"
                className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                alt="Oluwanifemi"
              />
              <div>
                <div className="font-semibold text-slate-900">Oluwanifemi</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                  Product Designer
                </div>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              I specialize in simplifying complex fintech systems. I have worked on payment
              platforms, internal tools, and ops dashboards where clarity directly impacts speed,
              trust, and revenue.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              My focus is making things work better under pressure.
            </p>

            <div className="mt-8">
              <img
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
                className="h-8 opacity-40 grayscale"
                alt="Signature"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer
        id="contact"
        className="bg-slate-900 text-white py-24 px-6 md:px-12 rounded-t-[2.5rem] md:rounded-t-[4rem] relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Let&apos;s fix the dashboard your ops team{" "}
            <span className="text-blue-400">depends on most.</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            If your fintech ops dashboard feels overwhelming, cluttered, or hard to trust, let&apos;s talk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:works@olusworks.xyz"
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5" />
              Fix My Ops Dashboard
            </a>

            <a
              href="https://calendly.com/your-link"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-slate-800 text-white hover:bg-slate-700 font-medium px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
              <Calendar className="w-5 h-5" />
              Book 15 min Call
            </a>
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <div>© 2025 Oluwanifemi. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="mailto:works@olusworks.xyz" className="hover:text-white transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};
