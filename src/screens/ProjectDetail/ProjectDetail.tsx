
import { useParams, Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation";
import { ImageSlider } from "../../components/ImageSlider";
import { LottieSection } from "../../components/LottieSection";
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
      "I also noticed the design lacked structure, so I built a unified design system to keep mobile and web consistent. The redesign focused on clarity: cleaner layouts, simpler navigation, and a visual identity that felt trustworthy.",
      "In the end, the new design cut friction out of everyday tasks and gave developers a system they could actually work with. Stakeholders finally saw a product that reflected their vision, and early adopters shared positive feedback about how simple the experience felt.",
    ],
    outcome:
      "The redesigned platform delivered a cohesive, frictionless experience that users could trust and developers could build on confidently.",
    results:
      "Digitvant Pay crossed 1,000 users during beta and has now grown to over 10,000 active users — proof that a smoother experience drives adoption and retention.",
    images: ["/Project 2.png"],
    tags: ["UX Audit", "Design System", "Mobile Banking", "Web Platform"],
    liveUrl: "https://ibank.digitvant.com/login",
  },
};

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId] : null;

  if (!project) {
    return (
      <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center px-6">
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
    <div className="bg-neutral-100 w-full min-h-screen flex flex-col">
      <div className="px-6 sm:px-12 lg:px-16">
        <header className="w-full mt-12 sm:mt-16 lg:mt-20">
          <Navigation items={navigationItems} />
        </header>
      </div>

      <main className="w-full flex-1 mt-16 sm:mt-20 lg:mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="mb-8">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 [font-family:'Sometype_Mono',Helvetica] text-sm text-gray-600 hover:text-black transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Work
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
            <div className="lg:col-span-8">
              <h1 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] mb-3">
                {project.title}
              </h1>
              <p className="[font-family:'Neue_Montreal',Helvetica] font-bold text-gray-500 text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[0.95]">
                {project.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="space-y-6">
                <div>
                  <p className="[font-family:'Sometype_Mono',Helvetica] text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Year
                  </p>
                  <p className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-lg">
                    {project.year}
                  </p>
                </div>
                <div>
                  <p className="[font-family:'Sometype_Mono',Helvetica] text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Role
                  </p>
                  <p className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-lg">
                    Product Designer
                  </p>
                </div>
                {project.liveUrl && (
                  <div className="mt-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 [font-family:'Sometype_Mono',Helvetica] text-sm font-medium bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      View Live Site
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hero Images */}
          <div className="mb-16">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="w-full aspect-video rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Overview */}
          <section className="mb-20">
            <h2 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-2xl sm:text-3xl mb-6">
              Overview
            </h2>
            {project.description.map((p, i) => (
              <p key={i} className="[font-family:'Sometype_Mono',Helvetica] text-gray-700 text-lg leading-relaxed mb-4">
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
              <p key={i} className="[font-family:'Sometype_Mono',Helvetica] text-gray-700 text-lg leading-relaxed mb-4">
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

            <div className="bg-white rounded-lg p-8 border-l-4 border-black mb-8">
              <p className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-lg leading-relaxed">
                <span className="text-2xl mr-2">🚀</span>
                {project.results}
              </p>
            </div>

            <LottieSection animationPath="/Scene.json" />
          </section>

          {/* Tags */}
          <div className="border-t border-gray-300 pt-12 pb-20">
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