import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation";

const navigationItems = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "/about", isNative: true },
  { text: "My explorations", href: "#", isNative: false },
  { text: "Work with me", href: "/work-with-me", isNative: true },
];

interface ProjectProps {
  title: string;
  year: string;
  description: string[];
  image: string;
  projectId?: string;
  lottieFile: string;
  href?: string;
}

import { LottiePlayer } from "../../components/LottiePlayer";

const Project: React.FC<ProjectProps> = ({
  title,
  year,
  description,
  image,
  projectId,
  lottieFile,
  href,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const content = (
    <>
      <div
        className="w-full mb-6 overflow-hidden border-2 border-[#7f9db9] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={image} alt={title} className="object-cover w-full h-auto" />

        {lottieFile && isHovered && (
          <div className="absolute inset-0 flex">
            <LottiePlayer
              animationPath={lottieFile}
              autoplay={true}
              loop={true}
              pauseOnHover={false}
              className="w-full h-full"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-8 mb-4 pb-3 border-b border-gray-300">
        <h2 className="font-bold text-[#003da8] text-xl sm:text-2xl uppercase flex-shrink-0" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
          {title}
        </h2>
        <span className="font-normal text-gray-600 text-base sm:text-lg" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
          {year}
        </span>
      </div>

      <div className="space-y-3">
        {description.map((paragraph, index) => (
          <p
            key={index}
            className="font-normal text-gray-800 text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12">
      <div className="bg-white border-2 border-[#b4b4b4] shadow-md p-6">
        {projectId ? (
          <Link to={`/work/${projectId}`} className="block cursor-pointer group">
            {content}
          </Link>
        ) : href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer group"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export const Work = () => {
  const projects: ProjectProps[] = [
    {
      title: "VITAL SWAP BACK OFFICE",
      year: "2024",
      description: [
        "I designed the Vital Swap back office to support three different user types, ensuring smooth operations and efficient workflows. The focus was on clarity, usability, and enabling the team to run processes seamlessly.",
      ],
      image: "/Project 1.png",
      projectId: "vital-swap",
      lottieFile: "/Vitalswap.json",
    },
    {
      title: "DIGITVANT PAY MOBILE & INTERNET REDESIGN",
      year: "2025",
      description: [
        "Digitvant Pay is a microfinance digital banking platform offering transfers, bill payments, and savings options.",
        "I led the redesign of both the mobile and internet banking platforms, simplifying financial management and creating a cleaner, more intuitive experience for individuals and businesses.",
      ],
      image: "/Project 2.png",
      projectId: "digitvant-pay",
      lottieFile: "/Scene.json",
    },
    {
      title: "MOTOBILLS ADMIN BILLS INVENTORY",
      year: "2024",
      description: [
        "Motobills is Nigeria's most affordable bill payment platform for airtime, data, electricity, hotels, and flights.",
        "I designed the admin dashboard that empowers operations managers to restock bills faster, set selling prices and cashback percentages, and monitor balances in real time",
      ],
      image: "/Project 3.png",
      projectId: "motobills",
      lottieFile: "/motobills.json",
    },
    {
      title: "ONE DRUG STORE CHECK OUT REDESIGN",
      year: "2025",
      description: [
        "One Drug Store brings pharmacy services online — from prescriptions to everyday wellness essentials. I redesigned the checkout experience, reducing friction so users can place and receive orders seamlessly, ensuring trust and reliability throughout the flow.",
      ],
      lottieFile: "",
      image: "/Project 4.png",
    },
    {
      title: "Creative Pay",
      year: "UX Case Study 2023",
      description: [
        "Creators and innovators are the lifeblood of our society, bringing fresh ideas and perspectives to the table across industries. However, these talented people often struggle to find the perfect job that matches their skills, experience and interests.",
      ],
      lottieFile: "",
      href: "https://www.behance.net/gallery/173528357/Creative-Pay-UX-Case-Study",
      image: "/Project 5.png",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen px-6 sm:px-12 lg:px-16" style={{ background: '#5a7fdc' }}>
      <div className="xp-window max-w-7xl w-full mx-auto mt-8 mb-8 min-h-[calc(100vh-4rem)]">
        <div className="xp-title-bar">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              My Work - Microsoft Internet Explorer
            </span>
          </div>
          <div className="flex gap-1">
            <button className="w-6 h-5 bg-[#2c5fdb] hover:bg-[#2050c0] border border-[#1a4db5] text-white text-xs font-bold">_</button>
            <button className="w-6 h-5 bg-[#2c5fdb] hover:bg-[#2050c0] border border-[#1a4db5] text-white text-xs font-bold">□</button>
            <button className="w-6 h-5 bg-[#d93831] hover:bg-[#c02820] border border-[#b02018] text-white text-xs font-bold">×</button>
          </div>
        </div>

        <header className="w-full px-6 pt-8 pb-4 border-b-2 border-[#b4b4b4]" style={{ background: 'var(--xp-gray)' }}>
          <Navigation items={navigationItems} />
        </header>

        <main className="w-full px-6 py-8" style={{ background: 'var(--xp-gray)', minHeight: '60vh' }}>
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </main>

        <footer className="xp-taskbar px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="xp-start-button flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect width="20" height="20" fill="transparent"/>
                <path d="M3 3 L17 10 L3 17 Z" fill="white"/>
              </svg>
              start
            </button>
          </div>
          <div className="text-white text-xs font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </footer>
      </div>
    </div>
  );
};
