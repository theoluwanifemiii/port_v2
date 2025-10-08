import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation";

const navigationItems = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "/", isNative: true },
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
        className="w-full rounded-lg mb-6 overflow-hidden transition-transform ease-in-out duration-300 hover:scale-[1.02] relative"
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

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-8">
        <h2 className="[font-family:'Sometype_Mono',Helvetica] font-bold text-black text-xl sm:text-2xl tracking-tight uppercase flex-shrink-0">
          {title}
        </h2>
        <span className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-500 text-base sm:text-lg">
          {year}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {description.map((paragraph, index) => (
          <p
            key={index}
            className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-sm sm:text-base lg:text-lg tracking-tight leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );

  return (
    <div className="w-full max-w-4xl mx-auto mb-16 transition-all duration-300 ease-in-out sm:mb-20 lg:mb-24">
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
    <div className="flex flex-col w-full min-h-screen px-6 bg-white sm:px-12 lg:px-16">
      <header className="w-full mt-12 mb-16 sm:mt-16 lg:mt-20 sm:mb-20">
        <Navigation items={navigationItems} />
      </header>

      <main className="w-full pb-12 sm:pb-16 lg:pb-20">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}

        {/* <div className="mt-8">
          <div className="relative w-full" style={{ paddingBottom: "78.22%" }}>
            <iframe
              src={"https://www.behance.net/embed/project/173528357?ilo0=1"}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
              loading="lazy"
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div> */}
      </main>
    </div>
  );
};
