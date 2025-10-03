import React from "react";
import { Navigation } from "../../components/Navigation";

const navigationItems = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "/", isNative: true },
  { text: "My explorations", href: "#", isNative: false },
  { text: "Work with me", href: "/work-with-me", isNative: true },
];

export const WorkWithMe = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col px-6 sm:px-12 lg:px-16">
      <header className="w-full mt-12 sm:mt-16 lg:mt-20">
        <Navigation items={navigationItems} />
      </header>

      <main className="flex flex-col w-full max-w-4xl mx-auto mt-16 sm:mt-20 lg:mt-24 pb-12 sm:pb-16 lg:pb-20">
        <h1 className="[font-family:'Linked',Helvetica] font-black text-black text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-8">
          Let's create something meaningful together
        </h1>

        <div className="space-y-8">
          <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed">
            I partner with startups and SaaS teams to design digital products that users love and businesses can build on. Whether you're refining an existing experience or starting from scratch, I bring clarity to complexity and craft experiences that feel effortless.
          </p>

          <div className="pt-8">
            <h2 className="[font-family:'Linked',Helvetica] font-black text-black text-2xl sm:text-3xl tracking-tight mb-6">
              What I do
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="[font-family:'Sometype_Mono',Helvetica] font-bold text-black text-lg mb-2">
                  Product Design
                </h3>
                <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base leading-relaxed">
                  End-to-end design for web and mobile applications, from research and wireframes to high-fidelity prototypes and developer handoff.
                </p>
              </div>

              <div>
                <h3 className="[font-family:'Sometype_Mono',Helvetica] font-bold text-black text-lg mb-2">
                  UX Audits & Strategy
                </h3>
                <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base leading-relaxed">
                  Identifying friction points in existing products and mapping strategic improvements that drive adoption and retention.
                </p>
              </div>

              <div>
                <h3 className="[font-family:'Sometype_Mono',Helvetica] font-bold text-black text-lg mb-2">
                  Design Systems
                </h3>
                <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base leading-relaxed">
                  Building cohesive, scalable design systems that keep teams aligned and developers efficient.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h2 className="[font-family:'Linked',Helvetica] font-black text-black text-2xl sm:text-3xl tracking-tight mb-6">
              How we can work together
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="[font-family:'Sometype_Mono',Helvetica] font-bold text-black text-lg mb-2">
                  Full-time or Contract
                </h3>
                <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base leading-relaxed">
                  I'm open to full-time roles and contract engagements. Whether you need someone embedded in your team or focused support for a specific project, let's talk.
                </p>
              </div>

              <div>
                <h3 className="[font-family:'Sometype_Mono',Helvetica] font-bold text-black text-lg mb-2">
                  Project-based
                </h3>
                <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base leading-relaxed">
                  Have a defined scope? I work on project basis for redesigns, MVP launches, and design system builds.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-200">
            <h2 className="[font-family:'Linked',Helvetica] font-black text-black text-2xl sm:text-3xl tracking-tight mb-6">
              Get in touch
            </h2>
            <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              I'd love to hear about what you're building. Drop me a message and let's explore how I can help bring your vision to life.
            </p>
            <div className="space-y-4">
              <div>
                <p className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-500 mb-1">
                  Email
                </p>
                <a
                  href="mailto:hello@olu.design"
                  className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-lg hover:text-gray-600 transition-colors"
                >
                  hello@olu.design
                </a>
              </div>
              <div>
                <p className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-500 mb-1">
                  LinkedIn
                </p>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-lg hover:text-gray-600 transition-colors"
                >
                  Connect with me
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
