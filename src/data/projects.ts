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
  image: string;
  heroImage?: string;
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
    architectureDiagram: {
      root: "Admin Portal",
      branches: ["Products", "Inventory", "Orders", "Riders", "Finance", "Sales", "Support", "Notifications", "Settings"],
    },
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
