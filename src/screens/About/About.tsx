import React, { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { WindowControls } from "../../components/WindowControls";

const navigationItems = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "/about", isNative: true },
  { text: "My explorations", href: "#", isNative: false },
  { text: "Work with me", href: "/work-with-me", isNative: true },
];

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  text: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, company, text }) => {
  return (
    <div className="mb-4 p-4 bg-white border-2 border-[#b4b4b4] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3 pb-3 border-b border-gray-300">
        <div className="w-8 h-8 bg-gradient-to-br from-[#0054e3] to-[#5a7fdc] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            {name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-black text-sm" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            {name}
          </h4>
          <p className="text-xs text-gray-600" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
            {role} {company && `- ${company}`}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-800 leading-relaxed" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
        {text}
      </p>
    </div>
  );
};


export const About = () => {
  const testimonials: TestimonialProps[] = [
    {
      name: "Oluwafemi Oluwatobi",
      role: "Product Designer",
      company: "Teckholic",
      text: "I've had the pleasure of working alongside Nifemi, and he's one of the most talented and collaborative designers I've met. His attention to detail, strong UX instincts, and ability to turn complex problems into elegant solutions consistently impressed me. Beyond his design skills, Nifemi is a great team player, always open to feedback and generous with his insights. He'd be an asset to any design team."
    },
    {
      name: "Timothy Fabiyi",
      role: "Product Manager",
      company: "",
      text: "I had the opportunity to work with Oluwanifemi, and he stood out as a thoughtful and talented product designer. He has a strong sense for clean, user-focused design and consistently brings clarity to complex problems. His ability to balance user needs with business goals makes him a valuable partner in any product team. Beyond his design skills, he's collaborative, receptive"
    },
    {
      name: "Orji A, mMBA",
      role: "Software Test Engineer",
      company: "Moniepoint",
      text: "I had the pleasure of working closely with Oluwanifemi Osunsanya on the Backoffice project at Motopay. Throughout the project, Oluwanifemi consistently demonstrated exceptional skills as a Product Designer, contributing significantly to both the design and overall user experience of the platform. One of Oluwanifemi's key strengths was his ability to collaborate effectively with cross-functional teams, including myself as a QA Engineer. We worked closely during various stages of the project, and Oluwanifemi showed a keen ability to translate complex user requirements into clean, functional designs. He was always open to feedback, and we had productive discussions on how to resolve design-related QA issues, ensuring that the final product was seamless and intuitive for users."
    },
    {
      name: "Aduragbemi Abiola",
      role: "Product Designer",
      company: "Interswitch",
      text: "It's an absolute joy to witness Oluwanifemi's remarkable growth over the years within the design space. His curiosity, user-centered passion, and collaborative spirit have set him on an extraordinary path. Oluwanifemi's dedication to creating user-centric, delightful experiences and his willingness to learn as well as not internalize feedback is truly commendable. I strongly recommend him for your team(s) and on your project(s)"
    },
    {
      name: "Oluseyi Adisa",
      role: "Frontend Engineer",
      company: "",
      text: "Oluwanifemi possesses a unique blend of creativity, technical expertise, and a deep understanding of user-centric design principles. His ability to transform difficult ideas into visually appealing and user-friendly designs is absolutely admirable. Beyond his technical prowess, Oluwanifemi always looks to stay up to date with the latest design trends and tools is impressive. He continuously seeks opportunities to expand his skill set, which greatly contributes to the innovative and fresh approach he brings to each project. Oluwanifemi is a pleasure to work with on a personal level. His approachable nature, reliability, and strong work ethic create a positive and productive work environment."
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen px-2 sm:px-6 lg:px-12" style={{ background: '#5a7fdc' }}>
      <div className="xp-window max-w-7xl w-full mx-auto mt-2 sm:mt-8 mb-2 sm:mb-8 min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-4rem)]">
        <WindowControls title="About Me - Microsoft Internet Explorer" />

        <header className="w-full px-3 sm:px-6 pt-4 sm:pt-8 pb-3 sm:pb-4 border-b-2 border-[#b4b4b4] hidden sm:block" style={{ background: 'var(--xp-gray)' }}>
          <Navigation items={navigationItems} />
        </header>

        <main className="w-full px-3 sm:px-6 py-4 sm:py-8 overflow-y-auto" style={{ background: 'var(--xp-gray)', maxHeight: 'calc(100vh - 8rem)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 p-6 bg-white border-2 border-[#b4b4b4] shadow-md">
              <h1 className="font-bold text-[#003da8] text-3xl sm:text-4xl mb-4 flex items-center gap-3" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                <span className="text-2xl">💾</span> About Me
              </h1>

              <div className="mb-4 p-3 bg-[#fffacd] border border-[#b4b4b4]">
                <p className="text-sm text-gray-800" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                  🖥️ Initializing profile…
                </p>
              </div>

              <p className="text-base text-gray-800 leading-relaxed mb-4" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                Hi, I'm Oluwanifemi Osunsanya, a Product Designer who believes every pixel should tell a story. I help startups and SaaS teams simplify complexity through thoughtful, human-centered design.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-black text-base mb-2 flex items-center gap-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                    <span>✨</span> System background:
                  </h3>
                  <p className="text-sm text-gray-800 leading-relaxed" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    What started as curiosity has evolved into over 3 years of building purposeful digital experiences across fintech, real estate, and creative tech. From designing fintech dashboards that power thousands of users to reimagining mobile banking experiences, I focus on crafting products that balance clarity, empathy, and business impact.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-2 flex items-center gap-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                    <span>🎨</span> Core memory unlocked:
                  </h3>
                  <p className="text-sm text-gray-800 leading-relaxed" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    I create with feeling — every screen I design aims to make people feel seen, understood, and in control. Because great design isn't just about how it looks; it's about how smoothly it runs.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black text-base mb-2 flex items-center gap-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                    <span>🧩</span> When idle:
                  </h3>
                  <p className="text-sm text-gray-800 leading-relaxed" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    You'll find me vibe-coding experimental interfaces, exploring nostalgic UI ideas, or documenting creative experiments that remind me why I fell in love with design in the first place.You’ll often find me vibe-coding experimental interfaces, exploring nostalgic UI ideas, or designing posters that merge storytelling and aesthetics. 
                    I also love writing about my creative journey, the lessons, pivots, and little sparks that shape how I see design. And when I’m not creating, I’m probably binge-watching one of my favorite series, letting my mind wander through new worlds and ideas.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 p-6 bg-white border-2 border-[#b4b4b4] shadow-md">
              <h2 className="font-bold text-[#003da8] text-2xl sm:text-3xl mb-6 pb-3 border-b border-gray-300 flex items-center gap-3" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                <span className="text-xl">⚙️</span> System Specs
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#e8e8e8] border border-[#b4b4b4]">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-2" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    <span>💡</span> Role:
                  </p>
                  <p className="text-sm text-black font-medium" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    Product Designer (UI/UX, Design Systems & Design Engineer)
                  </p>
                </div>

                <div className="p-4 bg-[#e8e8e8] border border-[#b4b4b4]">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-2" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    <span>🧭</span> Experience:
                  </p>
                  <p className="text-sm text-black font-medium" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    3+ years in fintech, real estate, Healthtech, and SaaS
                  </p>
                </div>

                <div className="p-4 bg-[#e8e8e8] border border-[#b4b4b4]">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-2" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    <span>🛠️</span> Tools:
                  </p>
                  <p className="text-sm text-black font-medium" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    Figma, FigJam, Framer, Notion, Webflow, Framer, Photoshop, Miro
                  </p>
                </div>

                <div className="p-4 bg-[#e8e8e8] border border-[#b4b4b4]">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-2" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    <span>🧠</span> Specialties:
                  </p>
                  <p className="text-sm text-black font-medium" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    Design Systems, Product Thinking, Interaction Design, Software Design 
                  </p>
                </div>

                <div className="p-4 bg-[#e8e8e8] border border-[#b4b4b4] sm:col-span-2">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-2" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    <span>🌍</span> Currently:
                  </p>
                  <p className="text-sm text-black font-medium" style={{ fontFamily: 'Sometype Mono, Courier New, monospace' }}>
                    Designing experiences that make products feel effortless
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 p-6 bg-white border-2 border-[#b4b4b4] shadow-md">
              <h2 className="font-bold text-[#003da8] text-2xl sm:text-3xl mb-6 pb-3 border-b border-gray-300 flex items-center gap-3" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                <span className="text-xl">💬</span> Feedback
              </h2>

              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <Testimonial key={index} {...testimonial} />
                ))}
              </div>
            </div>
          </div>
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
