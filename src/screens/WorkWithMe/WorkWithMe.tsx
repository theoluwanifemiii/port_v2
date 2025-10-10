import React, { useState } from "react";
import { Navigation } from "../../components/Navigation";
import emailjs from "@emailjs/browser";

const navigationItems = [
  { text: "What have i done", href: "/work", isNative: true },
  { text: "Who am i ?", href: "/about", isNative: true },
  { text: "My explorations", href: "#", isNative: false },
  { text: "Work with me", href: "/work-with-me", isNative: true },
];

export const WorkWithMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_re8uhg5";
    const templateID = "template_eq7d19d";
    const publicKey = "Su42_SzYHjjezO72q";

    emailjs
      .send(
        serviceID,
        templateID,
        {
          title: "Work with me",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.project,
          budget: formData.budget,
          company: formData.company,
          to_email: "theoluwanifemi@gmail.com", // Your email address
        },
        publicKey
      )
      .then((result) => {
        console.log(result.text);
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          project: "",
          budget: "",
        });
      })
      .catch((error) => {
        console.log(error.text);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-6 sm:px-12 lg:px-16" style={{ background: '#5a7fdc' }}>
      <div className="xp-window max-w-7xl w-full mx-auto mt-8 mb-8 min-h-[calc(100vh-4rem)]">
        <div className="xp-title-bar">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              Work With Me - Microsoft Internet Explorer
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

        <main className="flex flex-col w-full max-w-4xl px-6 py-8 mx-auto" style={{ background: 'var(--xp-gray)', minHeight: '60vh' }}>
        <div className="mb-6 p-6 bg-white border-2 border-[#b4b4b4] shadow-sm">
          <h1 className="font-bold text-[#003da8] text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            Let's create something meaningful together
          </h1>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white border-2 border-[#b4b4b4] shadow-sm">
            <p className="font-normal text-gray-800 text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            I partner with startups and SaaS teams to design digital products
            that users love and businesses can build on. Whether you're refining
            an existing experience or starting from scratch, I bring clarity to
            complexity and craft experiences that feel effortless.
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-[#b4b4b4] shadow-sm">
            <h2 className="font-bold text-[#003da8] text-2xl sm:text-3xl mb-6 pb-3 border-b border-gray-300" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              What I do
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-black text-lg mb-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Product Design
                </h3>
                <p className="font-normal text-gray-800 text-base leading-relaxed" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  End-to-end design for web and mobile applications, from
                  research and wireframes to high-fidelity prototypes and
                  developer handoff.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-black text-lg mb-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  UX Audits & Strategy
                </h3>
                <p className="font-normal text-gray-800 text-base leading-relaxed" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Identifying friction points in existing products and mapping
                  strategic improvements that drive adoption and retention.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-black text-lg mb-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Design Systems
                </h3>
                <p className="font-normal text-gray-800 text-base leading-relaxed" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Building cohesive, scalable design systems that keep teams
                  aligned and developers efficient.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-2 border-[#b4b4b4] shadow-sm">
            <h2 className="font-bold text-[#003da8] text-2xl sm:text-3xl mb-6 pb-3 border-b border-gray-300" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              How we can work together
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-black text-lg mb-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Full-time or Contract
                </h3>
                <p className="font-normal text-gray-800 text-base leading-relaxed" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  I'm open to full-time roles and contract engagements. Whether
                  you need someone embedded in your team or focused support for
                  a specific project, let's talk.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-black text-lg mb-2" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Project-based
                </h3>
                <p className="font-normal text-gray-800 text-base leading-relaxed" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Have a defined scope? I work on project basis for redesigns,
                  MVP launches, and design system builds.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-2 border-[#b4b4b4] shadow-sm">
            <h2 className="font-bold text-[#003da8] text-2xl sm:text-3xl mb-6 pb-3 border-b border-gray-300" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              Get in touch
            </h2>
            <p className="font-normal text-gray-800 text-base sm:text-lg leading-relaxed mb-8" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
              I'd love to hear about what you're building. Drop me a message and
              let's explore how I can help bring your vision to life.
            </p>

            {submitStatus === "success" && (
              <div className="p-4 mb-6 border-2 border-[#2d8c2d] bg-[#d4edda]">
                <p className="text-green-900 text-sm font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Thank you for reaching out! I'll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 mb-6 border-2 border-[#d93831] bg-[#f8d7da]">
                <p className="text-red-900 text-sm font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Sorry, something went wrong. Please try again or email me
                  directly.
                </p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm text-gray-900 mb-2 block font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="xp-input w-full text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm text-gray-900 mb-2 block font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="xp-input w-full text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="text-sm text-gray-900 mb-2 block font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
                >
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="xp-input w-full text-base"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label
                  htmlFor="project"
                  className="text-sm text-gray-900 mb-2 block font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
                >
                  Tell me about your project
                </label>
                <textarea
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="xp-input w-full text-base resize-none"
                  placeholder="Share details about your project, timeline, and what you're looking for..."
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="text-sm text-gray-900 mb-2 block font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
                >
                  Budget Range (Optional)
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="xp-input w-full text-base"
                >
                  <option value="">Select a range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-plus">$50,000+</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="xp-button-green text-base px-10 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="pt-6 mt-8 border-t-2 border-gray-300">
              <p className="text-sm text-gray-700 mb-4 font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
                Or reach out directly:
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div>
                  <a
                    href="mailto:hello@olu.design"
                    className="font-medium text-[#0054e3] text-base hover:text-[#003da8] underline"
                    style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
                  >
                    theoluwanifemi@gmail.com
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/oluwanifemiosunsanya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0054e3] text-base hover:text-[#003da8] underline"
                    style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
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
