import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation";
import { ImageSlider } from "../../components/ImageSlider";
import { LottiePlayer } from "../../components/LottiePlayer";
import { ArrowLeft, ExternalLink } from "lucide-react";

const navigationItems = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "/", isNative: true },
  { text: "My explorations", href: "#", isNative: false },
  { text: "Work with me", href: "/work-with-me", isNative: true },
];

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
  outcomeImages?: string[];
  results: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  lottieFile?: string;
  behanceEmbed?: string;
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
      "I stepped in to untangle the experience. The first thing I did was a full UX audit — looking at user flows for payments, transfers, and savings. From there, I mapped the main journeys and spotted where users were getting stuck. I also noticed the design lacked structure, so I built a unified design system to keep mobile and web consistent.",
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
    lottieFile: "/Scene.json",
    behanceEmbed: "https://www.behance.net/embed/project/173528357?ilo0=1",
    prevProject: { id: "vital-swap", title: "Vital Swap" },
    nextProject: { id: "motobills", title: "Motobills Admin" },
  },
  "vital-swap": {
    id: "vital-swap",
    title: "Vital Swap",
    subtitle: "Designing a Back Office for Smooth Operations",
    year: "2024",
    description: [
      "Vital Swap needed a back office platform that could handle complex operations across three distinct user types — administrators, agents, and merchants. The existing workflow was fragmented, with tasks scattered across multiple tools. Operations often slowed down due to unclear permissions, inconsistent design patterns, and missing visibility into daily activities.",
      "The goal was simple but ambitious: build an operational backbone that could scale smoothly without confusion.",
    ],
    challenge:
      "The existing workflow was fragmented, with tasks scattered across multiple tools. Operations often slowed down due to unclear permissions, inconsistent design patterns, and missing visibility into daily activities.",
    approach: [
      "I started by mapping how each user type interacted with the system — what they needed to see, approve, or monitor daily. From there, I designed a structure that brought everything together in one consistent, intuitive experience.",
      "What I focused on: Streamlining navigation to reduce the number of steps per task, defining clear permission levels and access controls, creating reusable UI patterns for consistency and scalability, and designing dashboards that gave instant visibility into critical data and transactions.",
      "Throughout the process, I worked closely with developers and stakeholders to ensure every component aligned with real operational needs, not just design goals.",
    ],
    outcome:
      "The new back office became the engine of Vital Swap's daily operations. It allowed different user types to work seamlessly without overlapping responsibilities or confusion.",
    results:
      "Faster onboarding for new staff and agents. Reduced operational errors due to clearer data visibility. Consistent, scalable design system across all user types. What started as a scattered workflow became a unified, efficient system that helped Vital Swap's operations run smoothly and confidently.",
    images: ["/Project 1.png"],
    tags: ["Back Office", "Admin Dashboard", "Multi-User System", "Operations"],
    liveUrl: "https://vitalswap.com/",
    lottieFile: "/Vitalswap.json",
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
      "The Bills Inventory module — responsible for tracking balances, restocking, and managing cashback — lacked visibility, speed, and structure. Managers couldn't easily see provider balances or adjust selling prices without multiple manual steps, which slowed down restocking and caused delays across the platform.",
    ],
    challenge:
      "The Bills Inventory module lacked visibility, speed, and structure. Managers couldn't easily see provider balances or adjust selling prices without multiple manual steps, which slowed down restocking and caused delays across the platform.",
    approach: [
      "I worked across six key admin modules — from Customer Support to Influencer and Hotel Management Dashboards — but the Bills Inventory became my main focus. I started by mapping out how the operations team interacted with inventory data daily.",
      "From there, I redesigned the experience with three key goals in mind: Clarity - Make bill balances and provider info instantly visible. Control - Simplify how prices and cashback percentages are adjusted. Speed - Reduce time spent restocking or verifying balances.",
      "I designed a streamlined dashboard where managers could view real-time balances across all providers, restock faster with fewer clicks, set and update selling prices and cashback instantly, and track bill history for accountability.",
    ],
    outcome:
      "The new Bills Inventory module transformed how operations teams managed the platform. Workflows became more transparent, decisions faster, and overall efficiency improved significantly.",
    results:
      "Faster restocking time and improved daily operations. Clear visibility into bill balances and transactions. Positive feedback from operations and business dev teams.",
    images: ["/Project 3.png"],
    tags: [
      "Admin Dashboard",
      "Inventory Management",
      "Bill Payments",
      "Operations",
    ],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.motobills.app&hl=en",
    lottieFile: "/motobills.json",
    nextProject: { id: "onedrugstore", title: "One Drug Store" },
    prevProject: { id: "digitvant-pay", title: "Digitvant Pay" },
  },
};

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId] : null;
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 bg-white">
        <h1 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-4xl mb-4">
          Project Not Found
        </h1>
        <Link
          to="/work"
          className="[font-family:'Sometype_Mono',Helvetica] text-gray-600 hover:text-black transition-colors"
        >
          ← Back to Work
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-100">
      <div className="px-6 sm:px-12 lg:px-16">
        <header className="w-full mt-12 sm:mt-16 lg:mt-20">
          <Navigation items={navigationItems} />
        </header>
      </div>

      <main className="flex-1 w-full mt-16 sm:mt-20 lg:mt-24">
        <div className="px-6 mx-auto max-w-7xl sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-8 mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <h1 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] mb-3">
                {project.title}
              </h1>
              <p className="[font-family:'Neue_Montreal',Helvetica] font-bold text-gray-500 text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[0.95]">
                {project.subtitle}
              </p>
            </div>

            <div className="flex flex-col justify-end lg:col-span-4">
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <p className="[font-family:'Sometype_Mono',Helvetica] text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Role
                    </p>
                    <p className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-lg">
                      Product Designer
                    </p>
                  </div>
                  <div>
                    <p className="[font-family:'Sometype_Mono',Helvetica] text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Year
                    </p>
                    <p className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-lg">
                      {project.year}
                    </p>
                  </div>
                </div>

                {project.liveUrl && (
                  <div className="w-full">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 [font-family:'Sometype_Mono',Helvetica] text-sm font-medium bg-black text-white w-full justify-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      View Live Site
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hero Images with Lottie */}
          <div className="mb-16">
            {project.lottieFile ? (
              <div
                className="relative w-full overflow-hidden bg-white rounded-lg shadow-sm aspect-video"
                onMouseEnter={() => setIsHoveringHero(true)}
                onMouseLeave={() => setIsHoveringHero(false)}
              >
                {!isHoveringHero ? (
                  <img
                    src={project.images[0]}
                    alt={`${project.title} - Hero Image`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <LottiePlayer
                    animationPath={project.lottieFile}
                    autoplay={true}
                    loop={true}
                    pauseOnHover={false}
                    className="w-full h-full"
                  />
                )}
              </div>
            ) : (
              project.images.map((image, index) => (
                <div
                  key={index}
                  className="w-full overflow-hidden bg-white rounded-lg shadow-sm aspect-video"
                >
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))
            )}
          </div>

          {/* Overview */}
          <section className="mb-20">
            <h2 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-2xl sm:text-3xl mb-6">
              Overview
            </h2>
            {project.description.map((p, i) => (
              <p
                key={i}
                className="[font-family:'Sometype_Mono',Helvetica] text-gray-700 text-lg leading-relaxed mb-4"
              >
                {p}
              </p>
            ))}
          </section>

          {/* Challenge */}
          <section className="mb-20">
            <h2 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-2xl sm:text-3xl mb-6">
              The Challenge
            </h2>
            <p className="[font-family:'Sometype_Mono',Helvetica] text-gray-700 text-lg leading-relaxed mb-8">
              {project.challenge}
            </p>
            {project.challengeImages && (
              <ImageSlider images={project.challengeImages} />
            )}
          </section>

          {/* Approach */}
          <section className="mb-20">
            <h2 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-2xl sm:text-3xl mb-6">
              My Approach
            </h2>
            {project.approach.map((p, i) => (
              <p
                key={i}
                className="[font-family:'Sometype_Mono',Helvetica] text-gray-700 text-lg leading-relaxed mb-4"
              >
                {p}
              </p>
            ))}
          </section>

          {/* Outcome with Lottie */}
          <section className="mb-20">
            <h2 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-2xl sm:text-3xl mb-6">
              The Outcome
            </h2>
            <p className="[font-family:'Sometype_Mono',Helvetica] text-gray-700 text-lg leading-relaxed mb-6">
              {project.outcome}
            </p>

            <div className="p-8 mb-8 bg-white border-l-4 border-black rounded-lg">
              <p className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-lg leading-relaxed">
                <span className="mr-2 text-2xl">🚀</span>
                {project.results}
              </p>
            </div>

            {project.outcomeImages && project.outcomeImages.length > 0 && (
              <div className="mb-8">
                <ImageSlider
                  images={project.outcomeImages}
                  enableFadeEffect={true}
                />
              </div>
            )}

            {project.lottieFile && (
              <div className="mt-8">
                <LottiePlayer
                  animationPath={project.lottieFile}
                  autoplay={true}
                  loop={true}
                  pauseOnHover={true}
                  className="w-full mx-auto"
                />
              </div>
            )}

            {project.behanceEmbed && (
              <div className="mt-8">
                <div className="relative w-full" style={{ paddingBottom: "78.22%" }}>
                  <iframe
                    src={project.behanceEmbed}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allowFullScreen
                    loading="lazy"
                    frameBorder="0"
                    allow="clipboard-write"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-8 mt-16 border-t border-gray-300">
              {project.prevProject ? (
                <Link
                  to={`/work/${project.prevProject.id}`}
                  className="inline-flex items-center gap-2 [font-family:'Sometype_Mono',Helvetica] text-sm text-gray-600 hover:text-black transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Previous: {project.prevProject.title}</span>
                </Link>
              ) : (
                <div />
              )}

              {project.nextProject && (
                <Link
                  to={`/work/${project.nextProject.id}`}
                  className="inline-flex items-center gap-2 [font-family:'Sometype_Mono',Helvetica] text-sm text-gray-600 hover:text-black transition-colors group"
                >
                  <span>Next: {project.nextProject.title}</span>
                  <ArrowLeft className="w-4 h-4 transition-transform rotate-180 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </section>

          {/* Tags */}
          <div className="pt-12 pb-20 border-t border-gray-300">
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="[font-family:'Sometype_Mono',Helvetica] text-xs uppercase tracking-wider px-4 py-2 bg-white rounded-full text-gray-700 border border-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
