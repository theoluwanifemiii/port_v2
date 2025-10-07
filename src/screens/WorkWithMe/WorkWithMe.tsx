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
        <h1 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-8">
          Let's create something meaningful together
        </h1>

        <div className="space-y-8">
          <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed">
            I partner with startups and SaaS teams to design digital products that users love and businesses can build on. Whether you're refining an existing experience or starting from scratch, I bring clarity to complexity and craft experiences that feel effortless.
          </p>

          <div className="pt-8">
            <h2 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-2xl sm:text-3xl tracking-tight mb-6">
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
            <h2 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-2xl sm:text-3xl tracking-tight mb-6">
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
            <h2 className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-2xl sm:text-3xl tracking-tight mb-6">
              Get in touch
            </h2>
            <p className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
              I'd love to hear about what you're building. Drop me a message and let's explore how I can help bring your vision to life.
            </p>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-700 mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 [font-family:'Sometype_Mono',Helvetica] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-700 mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 [font-family:'Sometype_Mono',Helvetica] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-700 mb-2 block">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 [font-family:'Sometype_Mono',Helvetica] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="project" className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-700 mb-2 block">
                  Tell me about your project
                </label>
                <textarea
                  id="project"
                  name="project"
                  required
                  rows={6}
                  className="w-full px-4 py-3 [font-family:'Sometype_Mono',Helvetica] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                  placeholder="Share details about your project, timeline, and what you're looking for..."
                />
              </div>

              <div>
                <label htmlFor="budget" className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-700 mb-2 block">
                  Budget Range (Optional)
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-3 [font-family:'Sometype_Mono',Helvetica] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select a range</option>
                  <option value="under-5k">$500- $1,000</option>
                  <option value="5k-10k">$1,000 - $5,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-plus">$50,000+</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 [font-family:'Sometype_Mono',Helvetica] font-medium text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="[font-family:'Sometype_Mono',Helvetica] text-sm text-gray-500 mb-4">
                Or reach out directly:
              </p>
              <div className="space-y-3">
                <div>
                  <a
                    href="mailto:hello@olu.design"
                    className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-base hover:text-gray-600 transition-colors"
                  >
                    theoluwanifemi@gmail.com
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/oluwanifemiosunsanya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="[font-family:'Sometype_Mono',Helvetica] font-medium text-black text-base hover:text-gray-600 transition-colors"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
