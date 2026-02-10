import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  LayoutList,
  TrendingUp,
  Zap,
} from "lucide-react";

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  description: string[];
  challenge: string;
  challengeImages?: string[];
  approach: string[];
  outcome: string;
  results: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  nextProject?: { id: string; title: string };
  prevProject?: { id: string; title: string };
}

const projectsData: Record<string, ProjectData> = {
  "digitvant-pay": {
    id: "digitvant-pay",
    title: "Digitvant Pay",
    subtitle: "Mobile & Internet Banking Redesign",
    year: "2025",
    description: [
      "Digitvant Pay is a microfinance digital banking platform offering transfers, bill payments, and smart savings. The features were there, but the experience wasn't working. Screens felt cluttered, flows were inconsistent, and even developers flagged pushbacks because of UI issues. Stakeholders worried that if things stayed the same, adoption would stall.",
    ],
    challenge:
      "The platform had all the necessary features, but the user experience was fragmented. Navigation was confusing, screens lacked visual hierarchy, and the inconsistent design made it difficult for developers to implement changes efficiently.",
    challengeImages: [
      "/Before Dashboard.png",
      "/Before 3.png",
      "/Before 2.png",
      "/Before1.png",
    ],
    approach: [
      "I stepped in to untangle the experience. The first thing I did was a full UX audit — looking at user flows for payments, transfers, and savings. From there, I mapped the main journeys and spotted where users were getting stuck.",
      "The redesign focused on clarity: cleaner layouts, simpler navigation, and a visual identity that felt trustworthy. I kept iterating with quick feedback loops, aligning with both developers and stakeholders as I refined the details.",
      "In the end, the new design cut friction out of everyday tasks and gave developers a system they could actually work with. Stakeholders finally saw a product that reflected their vision, and early adopters shared positive feedback about how simple the experience felt.",
    ],
    outcome:
      "The redesigned platform delivered a cohesive, frictionless experience that users could trust and developers could build on confidently.",
    results:
      "Digitvant Pay crossed 1,000 users during beta and has now grown to over 10,000 active users — proof that a smoother experience drives adoption and retention.",
    images: ["/Project 2.png"],
    tags: ["UX Audit", "Design System", "Mobile Banking", "Web Platform"],
    liveUrl: "https://ibank.digitvant.com/login",
    prevProject: { id: "vital-swap", title: "Vital Swap" },
    nextProject: { id: "motobills", title: "Motobills Admin" },
  },
  "vital-swap": {
    id: "vital-swap",
    title: "Vital Swap",
    subtitle: "Designing a Back Office for Smooth Operations",
    year: "2024",
    description: [
      "Vital Swap needed a back office platform that could handle complex operations across three distinct user types — Super Administrators, Support, and Admin. The existing workflow was fragmented, with tasks scattered across multiple tools.",
      "The goal was simple but ambitious: build an operational backbone that could scale smoothly without confusion.",
    ],
    challenge:
      "The existing workflow was fragmented, with tasks scattered across multiple tools. Operations often slowed down due to unclear permissions, inconsistent design patterns, and missing visibility into daily activities.",
    approach: [
      "I started by mapping how each user type interacted with the system — what they needed to see, approve, or monitor daily. From there, I designed a structure that brought everything together in one consistent, intuitive experience.",
      "I focused on streamlining navigation, defining clear permission levels, creating reusable UI patterns, and designing dashboards that gave instant visibility into critical data and transactions.",
      "I worked closely with developers and stakeholders to ensure every component aligned with real operational needs, not just design goals.",
    ],
    outcome:
      "The new back office became the engine of Vital Swap's daily operations. It allowed different user types to work seamlessly without overlapping responsibilities or confusion.",
    results:
      "Faster onboarding for new staff and agents. Reduced operational errors due to clearer data visibility. Consistent, scalable design system across all user types.",
    images: ["/Project 1.png"],
    tags: ["Back Office", "Admin Dashboard", "Multi-User System", "Operations"],
    liveUrl: "https://vitalswap.com/",
    prevProject: { id: "onedrugstore", title: "One Drug Store" },
    nextProject: { id: "digitvant-pay", title: "Digitvant Pay" },
  },
  motobills: {
    id: "motobills",
    title: "Motobills Admin",
    subtitle: "Bills Inventory & Operations Dashboard",
    year: "2024",
    description: [
      "Motobills is one of Nigeria's most affordable bill payment platforms — offering users cheap airtime, electricity, data, hotel bookings, and flight payments. Behind the scenes, the operations team managed a complex system that often broke their flow.",
      "The Bills Inventory module — responsible for tracking balances, restocking, and managing cashback — lacked visibility, speed, and structure. Managers couldn't easily see provider balances or adjust selling prices without multiple manual steps.",
    ],
    challenge:
      "The Bills Inventory module lacked visibility, speed, and structure. Managers couldn't easily see provider balances or adjust selling prices without multiple manual steps, which slowed down restocking and caused delays across the platform.",
    approach: [
      "I mapped how the operations team interacted with inventory data daily, then redesigned the experience with three goals: clarity, control, and speed.",
      "The new dashboard made balances instantly visible, simplified restocking, and made price and cashback updates effortless.",
      "I validated the changes with operations and business development teams to ensure every workflow felt faster and more reliable.",
    ],
    outcome:
      "The new Bills Inventory module transformed how operations teams managed the platform. Workflows became more transparent, decisions faster, and overall efficiency improved significantly.",
    results:
      "Faster restocking time and improved daily operations. Clear visibility into bill balances and transactions. Positive feedback from operations and business development teams.",
    images: ["/Project 3.png"],
    tags: ["Admin Dashboard", "Inventory Management", "Bill Payments", "Operations"],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.motobills.app&hl=en",
    nextProject: { id: "onedrugstore", title: "One Drug Store" },
    prevProject: { id: "digitvant-pay", title: "Digitvant Pay" },
  },
};

const portfolioTestimonial = {
  quote:
    "I've had the pleasure of working alongside Nifemi, and he's one of the most talented and collaborative designers I've met. His attention to detail, strong UX instincts, and ability to turn complex problems into elegant solutions consistently impressed me.",
  name: "Oluwafemi Oluwatobi",
  role: "Product Designer",
  company: "Teckholic",
  avatar:
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=64&h=64",
};

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId] : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("opacity-0", "translate-y-6");
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
        "translate-y-6"
      );
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 bg-white">
        <h1 className="font-bold text-slate-900 text-4xl mb-4">Project Not Found</h1>
        <Link to="/work" className="text-slate-500 hover:text-slate-900">
          ← Back to Work
        </Link>
      </div>
    );
  }

  const heroTags = project.tags.slice(0, 2);
  const resultSentences = project.results
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const resultCards = project.tags.slice(0, 3).map((tag, index) => ({
    value: tag,
    label: index === 0 ? "Key Focus" : index === 1 ? "Design Driver" : "Impact Area",
    description: resultSentences[index] || project.results,
  }));
  const challengeImages =
    project.challengeImages && project.challengeImages.length > 0
      ? project.challengeImages
      : project.images;
  const solutionImage = project.images[0] || challengeImages[0];

  return (
    <div style={{ all: "initial" } as React.CSSProperties}>
      <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-slate-200 selection:text-slate-900 font-sans scroll-smooth">
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/fintech"
            className="font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity"
          >
            Oluwanifemi.
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <Link
              to="/work"
              className="hover:text-slate-900 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>
          </div>
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-slate-800 transition-colors hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            Book a Call
          </a>
        </div>
      </nav>

      <header className="pt-32 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:items-center mb-8 animate-on-scroll">
          {heroTags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-2.5 py-1 rounded-md text-slate-600 text-[11px] uppercase font-semibold tracking-wider"
            >
              {tag}
            </div>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-8 leading-[1.1] animate-on-scroll delay-100">
          {project.subtitle}
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed animate-on-scroll delay-200">
          {project.description[0]}
        </p>
      </header>

      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Project
              </div>
              <div className="font-medium text-slate-900">{project.title}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Year
              </div>
              <div className="font-medium text-slate-900">{project.year}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">
                My Role
              </div>
              <div className="font-medium text-slate-900">Product Designer</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Outcome
              </div>
              <div className="font-medium text-green-600 flex items-center gap-1">
                {resultSentences[0] || "Improved outcomes"}
                <TrendingUp className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-24 space-y-32">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start animate-on-scroll">
          <div className="md:col-span-4 sticky top-24">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">
              The Challenge
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-6">
              {project.challenge}
            </p>
            <ul className="space-y-3 text-sm text-slate-600">
              {project.tags.map((tag) => (
                <li key={tag} className="flex gap-2">
                  <span className="text-red-400">•</span> {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-8">
            <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs font-medium text-red-500 border border-red-100 z-10">
                Before: Pain Points
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challengeImages.slice(0, 4).map((image, index) => (
                  <div
                    key={image}
                    className={`rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} challenge ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4 italic text-center">
                Early exploration surfaces that informed the redesign direction.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start animate-on-scroll">
          <div className="md:col-span-4 sticky top-24">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">
              The Solution
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-6">
              {project.outcome}
            </p>
            <div className="space-y-4">
              {project.approach.slice(0, 2).map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    {index === 0 ? (
                      <LayoutList className="w-3.5 h-3.5" />
                    ) : (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">
                      {project.tags[index] || "Key Focus"}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 relative overflow-hidden shadow-2xl">
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur px-3 py-1 rounded text-xs font-medium text-green-400 border border-white/10 z-10">
                After: Action-Oriented
              </div>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {solutionImage && (
                  <img
                    src={solutionImage}
                    alt={`${project.title} solution`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="animate-on-scroll">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-8">
            The Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resultCards.map((card) => (
              <div
                key={card.value}
                className="p-8 bg-slate-50 border border-slate-200 rounded-2xl"
              >
                <div className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">
                  {card.value}
                </div>
                <div className="text-sm font-medium text-slate-600">
                  {card.label}
                </div>
                <p className="text-xs text-slate-400 mt-2">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-100 pt-16 animate-on-scroll">
          <div className="bg-blue-50/50 rounded-2xl p-8 md:p-12 text-center border border-blue-100">
            <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8 max-w-3xl mx-auto">
              "{portfolioTestimonial.quote}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                <img
                  src={portfolioTestimonial.avatar}
                  alt={portfolioTestimonial.name}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-900">
                  {portfolioTestimonial.name}
                </div>
                <div className="text-xs text-slate-500">
                  {portfolioTestimonial.role}
                  {portfolioTestimonial.company
                    ? `, ${portfolioTestimonial.company}`
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center py-8 border-t border-slate-100">
          {project.prevProject ? (
            <Link
              to={`/work/${project.prevProject.id}`}
              className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Previous Project
            </Link>
          ) : (
            <div />
          )}
          {project.nextProject && (
            <Link to={`/work/${project.nextProject.id}`} className="group text-right">
              <div className="text-xs text-slate-400 mb-1">Next Case Study</div>
              <div className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                {project.nextProject.title}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          )}
        </div>
      </main>

      <footer id="contact" className="bg-slate-900 text-white py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            Is your ops team <br />
            <span className="text-slate-400">fighting their own tools?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            I help fintechs turn messy data into clear action. Book a free 15-minute
            audit of your current dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/work-with-me"
              className="w-full sm:w-auto bg-white text-slate-900 font-medium px-8 py-3.5 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              Book Dashboard Audit
              <Calendar className="w-4 h-4" />
            </Link>
            <a
              href="mailto:works@olusworks.xyz"
              className="w-full sm:w-auto bg-transparent border border-slate-700 text-white font-medium px-8 py-3.5 rounded-full hover:bg-slate-800 transition-colors"
            >
              Email Me
            </a>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>© 2024 Oluwanifemi Design.</div>
            <div className="flex gap-6">
              <a
                href="https://www.behance.net/gallery/173528357/Creative-Pay-UX-Case-Study"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Behance
              </a>
              <a
                href="https://www.linkedin.com/in/oluwanifemiosunsanya/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};
