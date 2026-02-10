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
  context: string;
  challenge: string;
  approach: string[];
  outcome: string;
  results: string[];
  image: string;
  challengeImages?: string[];
  tags: string[];
  client: string;
  website?: string;
  nextProjectId?: string;
  previousProjectId?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "digitvant-pay",
    title: "Digitvant Pay",
    subtitle: "Mobile and internet banking redesign focused on clarity and trust.",
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
    subtitle: "Mobile & Internet Banking Redesign",
    year: "2025",
    summary:
      "Digitvant Pay needed a cleaner, more coherent experience for core banking actions like transfer, bill payment, and savings.",
    context:
      "The product already had useful features, but users struggled with cluttered screens and inconsistent UI patterns. Developers also faced avoidable implementation friction.",
    challenge:
      "Create a trusted, action-first banking interface that simplifies high-frequency user journeys without rebuilding backend logic.",
    approach: [
      "Ran a UX audit to isolate friction in transfer, bill payment, and savings flows.",
      "Rebuilt screen hierarchy and navigation to make primary actions obvious.",
      "Defined cleaner reusable components so design and implementation stayed aligned.",
    ],
    outcome:
      "A sharper interface with clearer journeys, stronger trust signals, and smoother handoff for engineering.",
    results: [
      "Beta crossed 1,000 users with positive usability feedback.",
      "Platform scaled to 10,000+ active users as adoption improved.",
      "Cross-team collaboration improved through a more consistent UI system.",
    ],
    image: "/Project 2.png",
    challengeImages: ["/Before Dashboard.png", "/Before 3.png", "/Before 2.png", "/Before1.png"],
    tags: ["UX Audit", "Mobile Banking", "Web Platform"],
    client: "Digitvant",
    website: "ibank.digitvant.com",
    nextProjectId: "motobills",
    previousProjectId: "vital-swap",
  },
  "vital-swap": {
    id: "vital-swap",
    title: "Vital Swap",
    subtitle: "Back Office for Smooth Operations",
    year: "2024",
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
