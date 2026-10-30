export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  tags: string[];
  projectId?: string;
  href?: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  summary: string;
  pullQuote?: string;
  context: string;
  costOfProblem?: string;
  challenge: string;
  beforeAfter?: { before: string[]; after: string[] };
  approach: string[];
  timeline?: string[];
  outcome: string;
  outcomeParagraphs?: string[];
  results: string[];
  keyTakeaway?: string;
  solutionLabel?: string;
  statCards?: { value: string; label: string }[];
  modules?: { iconName: string; name: string; description: string }[];
  architectureDiagram?: { root: string; branches: string[] };
  architectureImage?: string;
  portalArchitecture?: {
    name: string;
    color: string;
    description: string;
    modules: { name: string; viewOnly?: boolean; items: string[] }[];
  }[];
  image: string;
  heroImage?: string;
  /** Show the cover and gallery screenshots whole, as framed windows on the beach backdrop (Moto Ride only). */
  backdrop?: boolean;
  heroImages?: string[];
  challengeImages?: string[];
  galleryImages?: string[];
  tags: string[];
  client: string;
  role?: string;
  roleDescription?: string;
  responsibilities?: string[];
  website?: string;
  nextProjectId?: string;
  previousProjectId?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "moto-ride",
    title: "Moto Ride",
    subtitle: "One rider network and dispatch engine for MotoBites, Plenti and Mr Meat.",
    year: "2026",
    image: "/case/moto-ride/overview.webp",
    tags: ["Logistics", "Dispatch", "Design System"],
    projectId: "moto-ride",
  },
  {
    id: "digitvant-pay",
    title: "Digitvant Pay",
    subtitle: "Redesigning a digital banking experience by reducing onboarding friction and building a scalable design foundation.",
    year: "2025",
    image: "/Project 2.png",
    tags: ["Fintech", "UX Audit", "Design System"],
    projectId: "digitvant-pay",
  },
  {
    id: "plenti",
    title: "Plenti",
    subtitle: "Building the operational platform behind a fast-growing FMCG business.",
    year: "2026",
    image: "/Plenti/Plenti Cover.png",
    tags: ["FMCG", "Operations", "Design System"],
    projectId: "plenti",
  },
  {
    id: "vital-swap",
    title: "Vital Swap",
    subtitle: "Back-office platform for admins, agents, and merchants.",
    year: "2025",
    image: "/Project 1.png",
    tags: ["Operations", "Dashboard", "Multi-role"],
    projectId: "vital-swap",
  },
  {
    id: "momentos",
    title: "MomentOS",
    subtitle: "A celebration platform for teams, churches and families, designed and built end to end.",
    year: "2026",
    image: "/case/momentos/dashboard.webp",
    tags: ["SaaS", "Product Strategy", "Design and Engineering"],
    projectId: "momentos",
  },
  {
    id: "fig2md",
    title: "Fig2MD",
    subtitle: "Turns a Figma design system into Markdown that developers and coding agents can use.",
    year: "2026",
    image: "/case/fig2md/cover.webp",
    tags: ["Developer Tools", "Design Systems", "Figma Plugin"],
    projectId: "fig2md",
  },
  {
    id: "one-drug-store",
    title: "One Drug Store Checkout",
    subtitle: "Checkout redesign to reduce friction and improve trust at payment.",
    year: "2025",
    image: "/Project 4.png",
    tags: ["Checkout", "E-commerce", "Conversion"],
  },
  {
    id: "creative-pay",
    title: "Creative Pay",
    subtitle: "UX concept for matching creators with meaningful opportunities.",
    year: "2023",
    image: "/Project 5.png",
    tags: ["Concept", "Case Study", "Product Thinking"],
    href: "https://www.behance.net/gallery/173528357/Creative-Pay-UX-Case-Study",
  },
];

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  "digitvant-pay": {
    id: "digitvant-pay",
    title: "Digitvant Pay",
    subtitle: "Mobile Banking · Internet Banking · Internal Operations",
    year: "2025",
    summary:
      "Redesigned the mobile and internet banking experience for Digitvant Pay supporting growth from 1,000 beta users to over 10,000 active users by reducing onboarding friction and building a scalable design foundation.",
    pullQuote:
      "Users didn't need to be fully verified to receive value. They only needed to be fully verified to move money.",
    context:
      "Digitvant Pay was preparing to launch its digital banking platform, but the customer experience created friction long before users could experience any value. The onboarding flow required users to complete BVN and NIN verification before receiving a bank account. While this satisfied compliance requirements, it introduced unnecessary friction at the very first interaction with the product. Beyond onboarding, the banking experience itself had become difficult to navigate. Core activities such as transfers, bill payments, savings, and account management competed equally for attention, making the interface feel crowded and overwhelming. The platform also lacked a unified design language. Components were inconsistent across web and mobile, increasing engineering effort and making the product harder to scale.",
    costOfProblem:
      "Every additional verification step delayed activation and increased the likelihood that potential customers abandoned onboarding before experiencing any value from the product. For a growing digital bank, lower activation meant slower customer acquisition and reduced lifetime value. The inconsistent interface added engineering overhead that would compound as the team scaled — threatening the product's ability to grow without accumulating technical and design debt.",
    challenge:
      "How can users experience the value of Digitvant Pay before completing full identity verification while remaining compliant with financial regulations?",
    beforeAfter: {
      before: [
        "Full KYC required before account creation",
        "No bank account issued until verification complete",
        "Users abandoned before experiencing any product value",
      ],
      after: [
        "Instant account creation with email and phone number",
        "Bank account number issued immediately after registration",
        "Transactions restricted until BVN and NIN verified — with clear progress messaging",
      ],
    },
    approach: [
      "Audited the existing customer journeys across both mobile and internet banking, reviewing onboarding, transfers, bill payments, savings, account management, navigation patterns, and visual hierarchy, to identify where users experienced unnecessary friction and where the interface failed to guide attention effectively.",
      "Reframed onboarding from a compliance problem to an activation problem. Mapped high-frequency customer journeys to understand which actions deserved greater visual priority, and identified how users could experience the value of Digitvant Pay before completing full identity verification.",
      "Standardised reusable UI components and interaction patterns to create consistency across both mobile and web platforms. Also designed an internal customer support dashboard to enable operational teams to manage customer requests more efficiently.",
    ],
    timeline: [
      "Problem Identified",
      "UX Audit",
      "Product Strategy",
      "UI Redesign",
      "Engineering Collaboration",
      "Launch",
      "10,000+ Active Users",
      "Fintech Disruptor of the Year 2025",
    ],
    outcome:
      "The redesign introduced a progressive onboarding experience that reduced activation friction without compromising compliance.",
    outcomeParagraphs: [
      "Instead of requiring complete KYC before account creation, users could register using only their email address and phone number. Immediately after registration, every user received a bank account number and gained access to the dashboard.",
      "Financial transactions remained disabled until BVN and NIN verification were completed, with clear messaging explaining the verification status throughout the experience.",
      "Across the broader banking experience, I restructured navigation, simplified screen layouts, improved information hierarchy, and prioritised high-frequency actions such as transfers, savings, and bill payments. The redesign was supported by a reusable design system that improved consistency between design and engineering implementation.",
    ],
    results: [
      "Complete redesign of the mobile banking and internet banking platforms.",
      "Progressive KYC onboarding that reduced activation friction while maintaining compliance.",
      "Creation of a reusable design system and component library for engineering.",
      "Design of an internal customer support dashboard to improve operational workflows.",
      "Platform growth from over 1,000 beta users to more than 10,000 active users.",
      "Digitvant Pay was recognised as the Fintech Disruptor of the Year 2025, reflecting the company's momentum and market impact.",
    ],
    keyTakeaway:
      "Compliance and usability don't have to compete. By separating account creation from transaction eligibility, we reduced activation friction without compromising regulatory requirements — proving that the right product constraint can become a design advantage.",
    image: "/Digit 2.png",
    challengeImages: ["/Digtvant Before 1.png", "/Digtvant Before 2.png"],
    galleryImages: ["/Ditgit3.png", "/Digit 4.png", "/Digit 5.png", "/Digit 6.png", "/Digit 7.png"],
    tags: ["Mobile Banking", "Internet Banking", "Design System"],
    client: "Digitvant",
    role: "Product Designer",
    roleDescription:
      "I led the redesign of Digitvant Pay's customer banking experience across mobile and web while creating a shared design language that engineering could scale.",
    responsibilities: [
      "Product Strategy",
      "UX Research",
      "Mobile Banking",
      "Internet Banking",
      "Internal Support Dashboard",
      "Design System",
      "Engineering Collaboration",
    ],
    website: "ibank.digitvant.com",
    nextProjectId: "plenti",
    previousProjectId: "vital-swap",
  },
  "vital-swap": {
    id: "vital-swap",
    title: "Vital Swap",
    subtitle: "Back Office for Smooth Operations",
    year: "2025",
    summary:
      "Vital Swap required a unified back office experience for three user types: administrators, agents, and merchants.",
    context:
      "Operations relied on fragmented tools, causing delays, repeated tasks, and low visibility into key activities.",
    challenge:
      "Design a scalable operations cockpit with clear permissions, cleaner information flow, and reusable UI patterns.",
    approach: [
      "Mapped daily jobs-to-be-done for each user type before touching screens.",
      "Created structured navigation and status visibility for high-priority operational actions.",
      "Worked with stakeholders and engineering to align each pattern with real workflows.",
    ],
    outcome:
      "A single system that reduced confusion and helped teams operate faster with better confidence.",
    results: [
      "Faster onboarding for operations staff and agents.",
      "Reduced errors through clearer visibility and role-specific views.",
      "Consistent design language across the back-office product.",
    ],
    image: "/Project 1.png",
    tags: ["Back Office", "Admin Dashboard", "Operations"],
    client: "Vital Swap",
    website: "vitalswap.com",
    nextProjectId: "digitvant-pay",
  },
  momentos: {
    id: "momentos",
    title: "MomentOS",
    subtitle: "Celebration platform for teams, churches and families",
    year: "2026",
    summary:
      "Designed and built MomentOS, a product that remembers the people in an organisation and celebrates them automatically: birthdays, work anniversaries, graduations and other milestones, delivered by email and SMS.",
    pullQuote: "I wasn't solving a birthday problem. I was solving a celebration problem.",
    context:
      "It started at our church's annual media retreat. We were planning this year's birthday templates, the same routine as always: someone remembers the date, updates the design, posts it. I asked friends in HR how their companies handled it and heard the same story everywhere: spreadsheets, calendar reminders, or someone expected to just remember.",
    costOfProblem:
      "Remembering people had quietly become manual work. Birthdays get missed, messages go out late, and the job falls on whoever happens to care most that week. It does not scale past a few dozen people.",
    challenge:
      "How do you make remembering people automatic without making the message feel automated?",
    approach: [
      "Shipped a narrow first version: upload people once with a validated CSV, pick a template, and MomentOS sends a personal birthday message at a set time in the organisation's own timezone. No designer, no spreadsheet, no reminder.",
      "Reframed the product a few weeks in. Users were not only businesses: a founder appreciating employees, a church celebrating its members, a husband who won't forget his anniversary again. Birthdays became one category of Moment, alongside work anniversaries, graduations, career and spiritual milestones, each with its own recurrence and template.",
      "Followed the same logic for delivery: reach people where they already communicate. Email first, then SMS, with WhatsApp next. A template declares which channels it supports, so one message is written once and sent through the channel the person reads.",
      "Chose what not to build. The first instinct for gifting was a marketplace where we buy and deliver items. Changing prices, quality guarantees and vendors with no online store said otherwise. The direction is wishlists that friends contribute to and the recipient redeems, so MomentOS stays in the celebration and payment layer, never logistics.",
    ],
    timeline: ["Birthday emails", "People and CSV import", "Templates", "Moments", "SMS delivery", "Gifting"],
    outcome:
      "A live product at usemomentos.xyz where an organisation adds its people once and every celebration after that runs on its own.",
    outcomeParagraphs: [
      "The dashboard leads with what is coming up this week and today, the people list doubles as the source for every Moment, and templates carry the channels they can be sent on. Next is Birthday Wrapped: a yearly recap of who celebrated you, the messages and the people who show up year after year.",
    ],
    solutionLabel: "From birthdays to celebrations",
    statCards: [
      { value: "7", label: "Celebration categories" },
      { value: "7", label: "Recurrence rules, from one time to yearly" },
      { value: "3", label: "Delivery channels: email, SMS, WhatsApp" },
      { value: "1", label: "Person behind every layer" },
    ],
    results: [
      "A shipped product: sign in, people import with validation, templates with preview and test sends, scheduled delivery per organisation timezone.",
      "Moments: broadcast celebrations for groups and personal ones for individuals, each with a category, a recurrence rule and a template.",
      "Email and SMS delivery with per organisation sender settings, and delivery logs that show what went out and what failed.",
      "An internal admin for organisations, people, templates, delivery logs, audit logs and feedback.",
      "A gifting direction built on wishlists and contributions rather than a marketplace, keeping the product out of logistics.",
    ],
    keyTakeaway:
      "The hardest product decisions rarely involve interface design. They involve deciding what not to build.",
    image: "/case/momentos/dashboard.webp",
    heroImage: "/case/momentos/dashboard.webp",
    galleryImages: [
      "/case/momentos/landing.webp",
      "/case/momentos/people.webp",
      "/case/momentos/moments.webp",
      "/case/momentos/templates.webp",
    ],
    tags: ["SaaS", "Product Strategy", "Design and Engineering"],
    client: "MomentOS",
    role: "Founder, Designer and Engineer",
    roleDescription:
      "MomentOS is entirely designed and engineered by me. I own every layer of the product, from research and strategy to the interface, the backend and deployment.",
    responsibilities: [
      "Product Strategy",
      "User Research",
      "UX and UI Design",
      "Design System",
      "Frontend Development",
      "Backend Development",
      "Deployment",
    ],
    website: "usemomentos.xyz",
  },
  fig2md: {
    id: "fig2md",
    title: "Fig2MD",
    subtitle: "Design system documentation that coding agents can follow",
    year: "2026",
    summary:
      "Designing and building Fig2MD, a Figma plugin and compiler that turns a design system into Markdown in the codebase, so developers and their coding agents build from the same tokens, components and rules the designers set.",
    pullQuote: "A declared gap beats plausible fiction, every time.",
    context:
      "Teams put real thinking into their design systems: colours, type, spacing, components and the rules behind them. All of it lives inside Figma, readable by people but not by the coding agents that now write a growing share of the interface. Ask an agent to build a settings screen and it goes looking for design rules, finds none, and guesses.",
    costOfProblem:
      "Guesses look plausible, which is what makes them expensive. On one early run, token adherence scored 87.1% on output where a designer found the button, the icons and the table hover all wrong. The agent had inlined SVG artwork and reached for the nearest token, and the metric could not see either.",
    challenge:
      "How do you give a coding agent a design system it can follow, without inventing anything the design file does not say?",
    approach: [
      "Built it as a compiler, not a converter. Extraction from Figma is deterministic, any judgment is pinned to a lockfile, and the Markdown it writes is byte identical for the same input. Regenerating after a design change gives a short, readable git diff instead of thousands of changed lines.",
      "Made one rule govern everything: never manufacture information the file does not hold. If Fig2MD does not know a state, the page says it is not defined by this design system. The AGENTS.md it writes tells agents that \"I don't know\" is a valid answer and that they must not substitute another token.",
      "Designed the plugin around review before download. It runs locally with no network access, then shows what Figma could not read, the guesses it is least sure of and what each one does to the docs, and what the system simply does not define.",
      "Let designers correct it once. A correction is saved in fig2md.lock.json and reapplied on the next export, so nobody has to fix the same judgment twice.",
      "Wrote rules for agents into the output: use tokens instead of raw values, reuse the canonical components, use the icon library the file actually uses, and never draw SVG artwork.",
    ],
    timeline: ["Figma file extraction", "IR and lockfile", "Asset inventory", "Benchmark instruments", "Figma plugin", "Human corrections"],
    outcome:
      "Run on a production design system, Fig2MD writes 64 tokens across two modes, 48 text styles, 8 elevations, 80 component pages and an AGENTS.md, with every page saying plainly what it could not read.",
    outcomeParagraphs: [
      "The output lives in the repo next to the code it describes. Developers read it, coding agents follow it, and the design team keeps it current by exporting again rather than editing by hand.",
    ],
    solutionLabel: "Documented, not generated",
    statCards: [
      { value: "64", label: "Tokens documented across 2 modes" },
      { value: "80", label: "Component pages" },
      { value: "48", label: "Text styles on a 9 step scale" },
      { value: "3,846", label: "Claims checked for fabrication" },
    ],
    results: [
      "A Figma plugin that runs entirely on the designer's machine and exports the docs as a zip.",
      "Deterministic Markdown: tokens with CSS variables per mode, typography, elevation, component pages with state to token tables, and an AGENTS.md for coding agents.",
      "A review step that lists what Figma could not read, low confidence guesses with their effect on the docs, and declared gaps.",
      "Designer corrections saved in a lockfile and carried into every later export.",
      "A fabrication check across 3,846 claims, and an agent benchmark that is built but not yet run, so the core claim is still to be proven.",
    ],
    keyTakeaway:
      "A metric can be accurate and still miss what matters. 87.1% token adherence said nothing about the icons. Now I count the same thing two independent ways before I trust a number.",
    image: "/case/fig2md/cover.webp",
    heroImage: "/case/fig2md/cover.webp",
    galleryImages: [
      "/case/fig2md/plugin-review.webp",
      "/case/fig2md/agents-md.webp",
      "/case/fig2md/button-md.webp",
      "/case/fig2md/tokens-md.webp",
    ],
    tags: ["Developer Tools", "Design Systems", "Figma Plugin"],
    client: "Fig2MD",
    role: "Founder, Designer and Engineer",
    roleDescription:
      "I am designing and building Fig2MD on my own: the product definition, the extraction and documentation pipeline, the Figma plugin and the rules it writes for coding agents.",
    responsibilities: [
      "Product Strategy",
      "Product Requirements",
      "Plugin UX",
      "Compiler Architecture",
      "Documentation Design",
      "Evaluation",
    ],
  },
  motobills: {
    id: "motobills",
    title: "Motobills Admin",
    subtitle: "Bills Inventory & Operations Dashboard",
    year: "2024",
    summary:
      "Motobills needed better control over provider balances, restocking cadence, and pricing updates.",
    context:
      "Operations managers had to handle key inventory actions through multiple manual steps, slowing decisions across the platform.",
    challenge:
      "Design a faster inventory control experience with instant balance visibility and reliable action paths.",
    approach: [
      "Studied current admin behavior and mapped bottlenecks in day-to-day inventory management.",
      "Prioritized clarity and speed in table hierarchy, controls, and notification patterns.",
      "Validated updates with operations and business teams to ensure practicality.",
    ],
    outcome:
      "A streamlined module that helped teams restock faster, update pricing confidently, and monitor performance in real time.",
    results: [
      "Restocking turnaround improved across core bill categories.",
      "Balance visibility became immediate for operations managers.",
      "Teams reported smoother day-to-day management and fewer manual loops.",
    ],
    image: "/Project 3.png",
    tags: ["Inventory", "Admin UX", "Fintech Ops"],
    client: "Motobills",
    website: "play.google.com/store/apps/details?id=com.motobills.app",
    previousProjectId: "plenti",
  },
  "moto-ride": {
    id: "moto-ride",
    title: "Moto Ride",
    subtitle: "Rider operations platform for MotoBites, Plenti and Mr Meat",
    year: "2026",
    summary:
      "Designed Moto Ride, one rider network and operations platform that serves three delivery products, MotoBites, Plenti and Mr Meat, from a single pool of riders, with a central engine deciding which rider gets which job.",
    pullQuote:
      "A rider is not busy. They have spare capacity on some legs of their route and none on others.",
    context:
      "Sujimoto Digital Service runs three delivery products: MotoBites for food, Plenti for FMCG and e-commerce, and Mr Meat for meat and fresh food. Built the usual way, each would need its own riders, its own onboarding and its own dispatch. Moto Ride replaces that with one rider identity, verified once and eligible for every product the rider qualifies for, and one dispatch engine shared by all three. The products create jobs; Sujimoto Digital Service owns the riders and decides who carries what.",
    costOfProblem:
      "Separate systems mean duplicated KYC, idle riders on one product while another is short, and no way to combine trips that share a route. A rider heading to Ikoyi for a MotoBites pickup could carry a Plenti parcel to Yaba on the same trip, but three separate systems can never see that.",
    challenge:
      "How do you let one rider carry jobs from three products at once, without a single promised delivery time slipping, and keep every decision the engine makes visible to the people running it?",
    approach: [
      "Wrote the product spec around an engine with operator controls on top, rather than a screen where someone picks a rider. Every new job passes four layers: eligibility (who is allowed), feasibility (whose live route can absorb it), ranking (who is best) and assignment (offer, accept or fall through to a queue for the operations team).",
      "Modelled riders and jobs so the engine can reason about them: vehicles carry capabilities such as load, box size and cold chain, jobs carry matching requirements, and every job has a ready time, a promised time and a latest acceptable time. One rider holds a separate service profile per product, so a suspension on Mr Meat for a cold chain breach leaves MotoBites untouched.",
      "Designed the operations dashboard to answer one question first: is the network healthy right now. Overview leads with riders online, carrying and idle, jobs at risk sorted by time to breach, and whether stacking is hurting promises. Rider records explain themselves: what each vehicle can take for each service, and complaints with photos, the rider's reply and the suspension rule they trigger.",
      "Built the Moto Ride design system alongside the screens: light neutral grounds, white cards with hairline borders, quiet large numbers, and one colour per product used only to tell products apart. Urgency has its own tones and always comes with a glyph. 17 components cover actions, status, data and the rider's live route.",
    ],
    timeline: [
      "Product Spec",
      "Allocation Engine Model",
      "Design System",
      "Operations Dashboard",
      "Rider Management",
    ],
    outcome:
      "One platform where operators see network health at a glance, understand why the engine chose a rider, and act on riders per service without touching the others.",
    outcomeParagraphs: [
      "Queues sort by time to breach, so nobody has to compare two times to know a job is late. A rider's profile shows, per product, what their vehicle can carry and why a product is blocked. Complaints carry the evidence and the rule they trigger, so a Plenti only suspension is a decision the screen supports rather than a guess.",
    ],
    solutionLabel: "One network, three services",
    statCards: [
      { value: "3", label: "Services on one rider pool" },
      { value: "4", label: "Layer allocation engine" },
      { value: "6", label: "User groups served" },
      { value: "17", label: "Design system components" },
    ],
    results: [
      "A product spec defining one rider identity, per service profiles and a four layer allocation engine with an explainability record.",
      "An operations dashboard: network overview, rider management, vehicle capabilities and complaints with service specific suspensions.",
      "Onboarding that approves each service on its own and shows how every identity check was made, and finance that tracks payouts and rider pay by service.",
      "The Moto Ride design system: tokens, type, status tones and 17 components shared across the admin dashboard and rider app.",
      "Service colour reserved for telling products apart, with urgency carried by separate tones and glyphs.",
    ],
    keyTakeaway:
      "When software makes the decision, the design job moves to explaining it. The screens that mattered most were the ones that show why: why this rider, why this vehicle is blocked, why this job is at risk.",
    image: "/case/moto-ride/overview.webp",
    heroImage: "/case/moto-ride/overview.webp",
    backdrop: true,
    galleryImages: [
      "/case/moto-ride/riders.webp",
      "/case/moto-ride/onboarding-services.webp",
      "/case/moto-ride/onboarding-nin-check.webp",
      "/case/moto-ride/rider-vehicles.webp",
      "/case/moto-ride/rider-complaints.webp",
      "/case/moto-ride/rider-suspend-service.webp",
      "/case/moto-ride/finance-overview.webp",
      "/case/moto-ride/finance-rider-pay.webp",
    ],
    tags: ["Logistics", "Dispatch", "Design System"],
    client: "Sujimoto Digital Service",
    role: "Lead Product Designer",
    roleDescription:
      "I wrote the product spec for the Moto Ride platform and designed its operations dashboard and design system, from the allocation model through to the screens operators use every day.",
    responsibilities: [
      "Product Strategy",
      "Product Spec",
      "Information Architecture",
      "UI Design",
      "Design System",
      "Operations Dashboard",
    ],
  },
  plenti: {
    id: "plenti",
    title: "Plenti",
    subtitle: "Building the operational platform behind a fast-growing FMCG business",
    year: "2026",
    summary:
      "Designed the internal operational platform for Plenti, an FMCG and e-commerce business in Lagos, unifying 11 operational modules across 3 role-based portals and more than 150 screens to power the workflows behind every customer order.",
    pullQuote:
      "The goal wasn't to simplify the business. It was to simplify how people interacted with its complexity.",
    context:
      "When customers place an order on an e-commerce platform, they only experience a small part of the journey. Behind every successful order is an operations team coordinating inventory, warehouses, riders, finance, customer support, and product management. Plenti, an FMCG and e-commerce business based in Lagos, Nigeria, needed an internal platform capable of supporting these day-to-day operations as the business continued to grow. I was responsible for designing the operational platform that powered those internal workflows — a connected system that enabled multiple teams to collaborate efficiently while giving each role access only to the tools relevant to their responsibilities.",
    costOfProblem:
      "Unlike consumer-facing products, operational software is used continuously throughout the workday. Small usability issues don't just frustrate users, they slow business operations. Without clear permissions and standardized workflows, employees spent more time navigating systems, switching contexts, and coordinating manually across departments. As Plenti scaled, those inefficiencies became increasingly expensive. Inventory updates affected order fulfillment. Order fulfillment affected rider assignments. Refund requests involved both finance and customer support. The business wasn't simply missing dashboards — it lacked a centralized platform capable of coordinating these moving parts.",
    challenge:
      "How do you design a single platform that coordinates eleven interconnected operational departments while ensuring each team only sees what is relevant to their role?",
    approach: [
      "Before designing any interfaces, I mapped operational workflows across product management, inventory, logistics, customer support, finance, and sales. Working closely with stakeholders, I identified not only what each team needed to accomplish but also how information flowed between departments. One insight quickly became clear: a single business process often travelled through multiple teams before reaching completion. That realization fundamentally shaped the architecture of the product.",
      "Instead of building one large administrative interface and disabling certain actions per user, I designed three dedicated role-based portals. Administrators accessed the complete operational platform, while operational staff, sales teams, and other internal users interacted with experiences tailored specifically to their responsibilities. Permissions became more than an access-control feature — they became part of the user experience itself.",
      "To maintain consistency across more than eleven interconnected modules, I built a scalable design system with over 120 reusable components standardizing tables, forms, filters, modals, navigation patterns, approval flows, and detail pages across the entire platform.",
    ],
    outcome:
      "The final platform unified eleven operational modules into one connected system supporting the complete operational lifecycle across five internal departments.",
    outcomeParagraphs: [
      "Rather than isolated dashboards, the goal was to design an operational ecosystem — one where information flowed naturally between departments and each role only interacted with what mattered to them.",
    ],
    solutionLabel: "Designing an Operational Ecosystem",
    modules: [
      { iconName: "Package", name: "Product Management", description: "Create, update, publish, and organize the product catalogue with consistent structure across the platform." },
      { iconName: "Archive", name: "Inventory Management", description: "Stock transfers, monitoring, approvals, reorder recommendations, and audit histories tracking every movement." },
      { iconName: "TrendingUp", name: "Sales Management", description: "Role-based performance dashboards — managers assign targets, representatives track only their own progress." },
      { iconName: "ShoppingCart", name: "Order Management", description: "Assign riders, monitor deliveries, manage failed orders, and communicate with delivery teams in one place." },
      { iconName: "Truck", name: "Rider Management", description: "Track active riders, manage assignments, and monitor delivery performance in real time." },
      { iconName: "DollarSign", name: "Finance", description: "Revenue monitoring and structured refund approval workflows with proper governance at every step." },
      { iconName: "Headphones", name: "Customer Support", description: "Customer records, order history, and support tickets unified in one workspace for faster resolution." },
      { iconName: "Settings", name: "System Configuration", description: "Roles, permissions, notifications, integrations, commissions, exports, and platform-wide settings." },
    ],
    portalArchitecture: [
      {
        name: "Full Admin Portal",
        color: "#1E3A8A",
        description: "Complete control — all 12 modules including governance",
        modules: [
          { name: "Dashboard", items: ["Overview metrics & charts", "Notification panel"] },
          { name: "User Management", items: ["User directory", "Add user", "Single user profile & stats"] },
          { name: "Product Management", items: ["Product catalog", "Add / edit product", "Unpublished products", "Delete product"] },
          { name: "Order Management", items: ["Order list & detail", "Assign rider", "Mark in transit", "Reassign / delete order"] },
          { name: "Inventory Management", items: ["Stock overview", "Stock transfer", "Reorder recommendations", "Stock alerts", "Approval modals", "Audit log"] },
          { name: "Finance Management", items: ["Finance overview", "Request refund", "Refund approval", "Rejected refund"] },
          { name: "Notification Management", items: ["Template library", "Create template", "Template detail", "Campaigns", "Quick send"] },
          { name: "Marketing & Engagement", items: ["Banners", "Promo codes", "FAQ management"] },
          { name: "Rider Management", items: ["Rider directory", "View rider", "Onboarding pipeline", "Review application", "Rider chat"] },
          { name: "Customer Support", items: ["Ticket queue", "View ticket"] },
          { name: "Team & Performance", items: ["Team members", "Assign target", "Withdrawal requests", "Leaderboard", "Export data"] },
          { name: "System Config", items: ["Account settings", "Control & permissions (RBAC)", "Notification settings", "Integration settings", "Data & backup", "Commission structure"] },
        ],
      },
      {
        name: "Operations Portal",
        color: "#059669",
        description: "Day-to-day execution — scoped module set",
        modules: [
          { name: "Dashboard", items: ["Overview & notifications"] },
          { name: "User Management", items: ["User directory", "Single user profile"] },
          { name: "Product Management", viewOnly: true, items: ["Catalog browsing only"] },
          { name: "Order Management", items: ["Order list & detail", "Order actions & modals"] },
          { name: "Inventory Management", items: ["Stock transfer", "Reorder recommendations", "Stock alerts", "Audit log"] },
          { name: "Customer Support", items: ["Ticket queue", "View ticket"] },
          { name: "My Targets", items: ["View target", "Submit request"] },
        ],
      },
      {
        name: "Team Lead Portal",
        color: "#7C3AED",
        description: "Ops scope + team & performance management",
        modules: [
          { name: "Dashboard", items: ["Team overview"] },
          { name: "User Management", items: ["User directory", "Single user profile"] },
          { name: "Product Management", viewOnly: true, items: ["Catalog browsing only"] },
          { name: "Order Management", items: ["Order list & detail", "Order actions & modals"] },
          { name: "Inventory Management", items: ["Stock transfer", "Reorder recommendations", "Stock alerts", "Audit log"] },
          { name: "Customer Support", items: ["Ticket queue", "View ticket"] },
          { name: "Team Management", items: ["Team members", "Assign target", "Withdrawal requests", "Leaderboard", "Export data"] },
        ],
      },
    ],
    timeline: ["Research", "Information Architecture", "Role Permissions", "Design System", "11 Modules", "Developer Handoff"],
    results: [
      "11 operational modules spanning the complete business lifecycle.",
      "3 role-based portals tailored to administrator, operational, and sales workflows.",
      "150+ production-ready screens with consistent interaction patterns throughout.",
      "Design system of 120+ reusable components standardizing UI across the platform.",
      "Notification system processing individual templates with more than 3,400 sends.",
      "Standardized workflows across inventory, logistics, customer support, finance, sales, and administration.",
    ],
    statCards: [
      { value: "11", label: "Operational Modules" },
      { value: "150+", label: "Production Screens" },
      { value: "120+", label: "Reusable Components" },
      { value: "3,400+", label: "Notification Sends" },
    ],
    keyTakeaway:
      "Consumer products are often measured by delight. Operational products are measured by efficiency, clarity, and reliability. Plenti reinforced that the most valuable enterprise products aren't defined by the number of features they contain, but by how seamlessly they help people work together.",
    image: "/Plenti/Plenti Cover.png",
    heroImages: ["/Plenti/Plenti Cover.png", "/Plenti/Plenti 2.png"],
    galleryImages: [
      "/Plenti/Order Management.png",
      "/Plenti/Inventory Management.png",
      "/Plenti/Dashboard.png",
      "/Plenti/Dashboard-2.png",
      "/Plenti/Dashboard-1.png",
    ],
    tags: ["FMCG", "Operations", "Design System"],
    client: "Plenti",
    role: "Lead Product Designer",
    roleDescription:
      "I led the end-to-end design of Plenti's internal operational platform, from stakeholder discovery and workflow mapping through to a production-ready system of 11 modules, 3 role-based portals, and 150+ screens.",
    responsibilities: [
      "Product Strategy",
      "UX Research",
      "Information Architecture",
      "UI Design",
      "Design System",
      "Role-Based Permissions UX",
      "Engineering Collaboration",
    ],
    previousProjectId: "digitvant-pay",
    nextProjectId: "motobills",
  },
};
