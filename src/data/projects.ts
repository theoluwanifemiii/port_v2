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
  image: string;
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
    id: "digitvant-pay",
    title: "Digitvant Pay",
    subtitle: "Redesigning a digital banking experience by reducing onboarding friction and building a scalable design foundation.",
    year: "2025",
    image: "/Project 2.png",
    tags: ["Fintech", "UX Audit", "Design System"],
    projectId: "digitvant-pay",
  },
  {
    id: "vital-swap",
    title: "Vital Swap",
    subtitle: "Back-office platform for admins, agents, and merchants.",
    year: "2024",
    image: "/Project 1.png",
    tags: ["Operations", "Dashboard", "Multi-role"],
    projectId: "vital-swap",
  },
  {
    id: "motobills",
    title: "Motobills Admin",
    subtitle: "Inventory dashboard that speeds up restocking decisions.",
    year: "2024",
    image: "/Project 3.png",
    tags: ["Admin UX", "Inventory", "Fintech"],
    projectId: "motobills",
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
      "Redesigned the mobile and internet banking experience for Digitvant Pay, supporting growth from 1,000 beta users to over 10,000 active users by reducing onboarding friction and building a scalable design foundation.",
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
    galleryImages: ["/Ditgit3.png", "/Digit 4.png", "/Digit 5.png", "/Digit 6.png"],
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
    nextProjectId: "motobills",
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
    previousProjectId: "digitvant-pay",
  },
};
