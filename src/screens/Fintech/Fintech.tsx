import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Search,
  Users,
  Ban,
  PenTool,
  Layers,
  RefreshCw,
  Flag,
  CheckCircle2,
} from "lucide-react";

interface ProjectCard {
  title: string;
  year: string;
  description: string[];
  image: string;
  projectId?: string;
  href?: string;
}

const projects: ProjectCard[] = [
  {
    title: "VITAL SWAP BACK OFFICE",
    year: "2024",
    description: [
      "I designed the Vital Swap back office to support three different user types, ensuring smooth operations and efficient workflows.",
    ],
    image: "/Project 1.png",
    projectId: "vital-swap",
  },
  {
    title: "DIGITVANT PAY MOBILE & INTERNET REDESIGN",
    year: "2025",
    description: [
      "I led the redesign of both the mobile and internet banking platforms, simplifying financial management and creating a cleaner, more intuitive experience.",
    ],
    image: "/Project 2.png",
    projectId: "digitvant-pay",
  },
  {
    title: "MOTOBILLS ADMIN BILLS INVENTORY",
    year: "2024",
    description: [
      "I designed the admin dashboard that empowers operations managers to restock bills faster, set selling prices and cashback percentages, and monitor balances in real time.",
    ],
    image: "/Project 3.png",
    projectId: "motobills",
  },
  {
    title: "ONE DRUG STORE CHECK OUT REDESIGN",
    year: "2025",
    description: [
      "I redesigned the checkout experience, reducing friction so users can place and receive orders seamlessly, ensuring trust and reliability throughout the flow.",
    ],
    image: "/Project 4.png",
  },
  {
    title: "Creative Pay",
    year: "UX Case Study 2023",
    description: [
      "A case study exploring a job matching product for creators, focused on helping talent find opportunities aligned with their skills.",
    ],
    image: "/Project 5.png",
    href: "https://www.behance.net/gallery/173528357/Creative-Pay-UX-Case-Study",
  },
];

const testimonials = [
  {
    quote:
      "I've had the pleasure of working alongside Nifemi, and he's one of the most talented and collaborative designers I've met. His attention to detail, strong UX instincts, and ability to turn complex problems into elegant solutions consistently impressed me.",
    name: "Oluwafemi Oluwatobi",
    title: "Product Designer, Teckholic",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=64&h=64",
    delay: "",
  },
  {
    quote:
      "I had the opportunity to work with Oluwanifemi, and he stood out as a thoughtful and talented product designer. He has a strong sense for clean, user-focused design and consistently brings clarity to complex problems.",
    name: "Timothy Fabiyi",
    title: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64",
    delay: "delay-100",
  },
  {
    quote:
      "Oluwanifemi possesses a unique blend of creativity, technical expertise, and a deep understanding of user-centric design principles. His ability to transform difficult ideas into visually appealing and user-friendly designs is absolutely admirable.",
    name: "Oluseyi Adisa",
    title: "Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=64&h=64",
    delay: "delay-200",
  },
];

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="font-semibold text-lg tracking-tight">Oluwanifemi.</div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
        <a href="#problem" className="hover:text-slate-900 transition-colors">
          The Problem
        </a>
        <a href="#work" className="hover:text-slate-900 transition-colors">
          Work
        </a>
        <a href="#process" className="hover:text-slate-900 transition-colors">
          Process
        </a>
        <a href="#testimonials" className="hover:text-slate-900 transition-colors">
          Testimonials
        </a>
        <a href="#about" className="hover:text-slate-900 transition-colors">
          About
        </a>
      </div>

      <a
        href="#contact"
        className="hidden md:flex items-center gap-2 bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-800 transition-colors hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        Book a Call
      </a>
    </div>
  </nav>
);

const Hero = () => (
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
        action-first control centers — without adding new features or touching
        your backend.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-4 animate-on-scroll delay-200">
        <a
          href="#contact"
          className="bg-slate-900 text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200"
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
);

const ProblemSection = () => (
  <section
    id="problem"
    className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-100"
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
          Your ops dashboard shows everything —
          <span className="text-slate-400">except what matters right now.</span>
        </h2>
        <div className="space-y-6 text-slate-600 text-base leading-relaxed">
          <p>
            Most fintech dashboards were not designed for operations teams. They were
            designed to display data.
          </p>
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
);

const InsightSection = () => (
  <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
    <div className="mb-8 flex justify-center animate-on-scroll">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
        <Lightbulb className="w-6 h-6" />
      </div>
    </div>

    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-8">
      The problem is not a lack of data. It is a lack of
      <span className="text-blue-600"> clarity</span>.
    </h2>

    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
      When everything is urgent, nothing is. Good ops dashboards do not show
      more. They show what matters now, what needs attention next, and what can
      wait.
    </p>
  </section>
);

const SolutionSection = () => (
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
            to be action-first.
          </h2>
        </div>
        <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
          In 14 days, I take your most critical fintech ops dashboard and
          transform it without backend changes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group animate-on-scroll delay-100">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
            <ListFilter className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Clarify Hierarchy</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Restructuring information so the most critical data points naturally
            catch the eye first.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group animate-on-scroll delay-200">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Surface Priorities</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Highlighting actionable items instantly so operators know exactly
            what to tackle next.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group animate-on-scroll delay-300">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Reduce Load</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Cutting visual noise to make daily decisions faster, safer, and
            significantly less stressful.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const SelectedWork = () => (
  <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="mb-12 animate-on-scroll">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
        Selected Work
      </h2>
      <p className="text-slate-500 text-lg">
        Dashboards simplified for high-stakes environments.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {projects.map((project) => {
        const CardWrapper = project.projectId
          ? ({ children }: { children: React.ReactNode }) => (
              <Link
                to={`/work/${project.projectId}`}
                className="group border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-all hover:shadow-lg bg-white animate-on-scroll cursor-pointer"
              >
                {children}
              </Link>
            )
          : project.href
          ? ({ children }: { children: React.ReactNode }) => (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-all hover:shadow-lg bg-white animate-on-scroll cursor-pointer"
              >
                {children}
              </a>
            )
          : ({ children }: { children: React.ReactNode }) => (
              <div className="group border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-all hover:shadow-lg bg-white animate-on-scroll">
                {children}
              </div>
            );

        return (
          <CardWrapper key={project.title}>
            <div className="h-48 bg-slate-50 rounded-xl mb-8 flex items-center justify-center border border-slate-100 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-600 text-[10px] font-semibold uppercase tracking-wide border border-slate-100">
                    {project.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold uppercase tracking-wide border border-blue-100">
                    Portfolio
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {project.description[0]}
                </p>
                <span className="text-sm font-medium text-slate-900 flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Case Study
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </CardWrapper>
        );
      })}
    </div>
  </section>
);

const ProcessSection = () => (
  <section
    id="process"
    className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-slate-50 border-y border-slate-100"
  >
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
        How It Works
      </h2>
      <p className="text-slate-500">A focused, low-risk engagement.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-10" />

      <div className="bg-slate-50 p-6 md:p-0 animate-on-scroll">
        <div className="w-16 h-16 bg-white border border-slate-200 text-slate-900 rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-sm animate-on-scroll delay-100">
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

      <div className="bg-slate-50 p-6 md:p-0 animate-on-scroll delay-200">
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
            Create action-first layout
          </li>
          <li className="flex gap-2">
            <RefreshCw className="w-4 h-4 shrink-0 mt-0.5" />
            Iterate with team
          </li>
        </ul>
      </div>

      <div className="bg-slate-50 p-6 md:p-0">
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
);

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-12 text-center">
      Trusted by modern ops teams
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.name}
          className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm animate-on-scroll ${testimonial.delay}`}
        >
          <div className="flex items-center gap-1 mb-4 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            ))}
          </div>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">"{testimonial.quote}"</p>
          <div className="flex items-center gap-3">
            <img
              src={testimonial.avatar}
              className="w-10 h-10 rounded-full border border-slate-100"
              alt={testimonial.name}
            />
            <div>
              <div className="text-sm font-semibold text-slate-900">{testimonial.name}</div>
              <div className="text-xs text-slate-500">{testimonial.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

interface ContactSectionProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    website: string;
    challenge: string;
  };
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ContactSection = ({
  formData,
  isSubmitting,
  submitStatus,
  onChange,
  onSubmit,
}: ContactSectionProps) => (
  <section id="contact" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-16 relative shadow-2xl animate-on-scroll">
        <div className="flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 border border-slate-700 bg-slate-800/50 px-3 py-1 rounded-full text-slate-300 text-xs font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              2 spots left for November
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Stop drowning in data.
              <br />
              <span className="text-slate-400">Start managing it.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
              I offer a free 15-minute dashboard audit. We'll look at your current setup,
              identify the biggest bottlenecks, and I'll tell you exactly how to fix them.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 backdrop-blur-sm mt-8 lg:mt-0">
            <div className="flex gap-1 mb-3 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-medium italic text-slate-300">
              "The audit call alone was worth more than the consultancy fees we paid our last
              agency. Oluwanifemi spotted the bottleneck in 5 minutes."
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 text-slate-900">
          {submitStatus === "success" && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              Thanks! Your request is in. I will reach out shortly.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Something went wrong. Please try again or email works@olusworks.xyz.
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="first-name"
                  className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm"
                  placeholder="Jane"
                  required
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="last-name"
                  className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
              >
                Work Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm"
                placeholder="jane@company.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="website"
                className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
              >
                Company Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={onChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm"
                placeholder="https://"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="challenge"
                className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
              >
                Biggest Challenge
              </label>
              <select
                id="challenge"
                name="challenge"
                value={formData.challenge}
                onChange={onChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-slate-600"
              >
                <option>Dashboard is too cluttered</option>
                <option>Team is missing critical alerts</option>
                <option>Onboarding takes too long</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-4 hover:shadow-lg active:scale-95 duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Book Free Audit"}
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              No commitment required. 100% confidential.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="about" className="bg-white border-t border-slate-100 py-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col md:items-start items-center">
        <div className="font-semibold text-lg tracking-tight mb-2">Oluwanifemi.</div>
        <p className="text-slate-500 text-sm">Designing clarity for fintech operations.</p>
      </div>

      <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
        <a
          href="https://www.behance.net/gallery/173528357/Creative-Pay-UX-Case-Study"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-900 transition-colors"
        >
          Behance
        </a>
        <a
          href="https://www.linkedin.com/in/oluwanifemiosunsanya/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-900 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="mailto:works@olusworks.xyz"
          className="hover:text-slate-900 transition-colors"
        >
          Email
        </a>
      </div>

      <div className="text-xs text-slate-400">© 2024 Oluwanifemi Design. All rights reserved.</div>
    </div>
  </footer>
);

export const Fintech = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    challenge: "Dashboard is too cluttered",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        company: formData.website,
        project: formData.challenge,
        budget: "Fintech audit request",
      };

      const response = await fetch(
        "https://uwcrhwvsogxdyzxyuhtr.supabase.co/functions/v1/send-contact-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data);
        throw new Error(data?.error || "Failed to send email");
      }

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        website: "",
        challenge: "Dashboard is too cluttered",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ all: "initial" } as React.CSSProperties}>
      <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-slate-200 selection:text-slate-900 font-sans">
        <style>{`
          select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
            background-position: right 0.75rem center;
            background-repeat: no-repeat;
            background-size: 1.25em 1.25em;
          }
        `}</style>

        <Navbar />
        <Hero />
        <ProblemSection />
        <InsightSection />
        <SolutionSection />
        <SelectedWork />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection
          formData={formData}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Footer />
      </div>
    </div>
  );
};
