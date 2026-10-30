import { FC } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "../../components/site/SiteChrome";
import "./CaseStudy.css";

const IMG = "/case/digitvant";

const APPROACH = [
  {
    title: "Audit the real journeys",
    body: "Reviewed onboarding, transfers, bill payments, savings, account management, navigation and visual hierarchy across mobile and internet banking, to find where people met friction and where the interface failed to guide attention.",
  },
  {
    title: "Reframe compliance as activation",
    body: "Treated onboarding as an activation problem rather than a compliance one. Mapped high frequency journeys to decide which actions deserved visual priority, and found how people could get value before full verification.",
  },
  {
    title: "Build a system engineering could scale",
    body: "Standardised reusable components and interaction patterns across mobile and web, and designed an internal customer support dashboard so operations teams could handle requests faster.",
  },
];

const TIMELINE = [
  { label: "01 PROBLEM IDENTIFIED" },
  { label: "02 UX AUDIT" },
  { label: "03 PRODUCT STRATEGY" },
  { label: "04 UI REDESIGN" },
  { label: "05 ENGINEERING COLLABORATION" },
  { label: "06 LAUNCH" },
  { label: "07 10,000+ ACTIVE USERS", dark: true },
  { label: "08 FINTECH DISRUPTOR OF THE YEAR 2025", dark: true },
];

const GALLERY = [
  { src: `${IMG}/data.jpg`, alt: "Digitvant data purchase screen on a phone" },
  { src: `${IMG}/virtual-card.jpg`, alt: "Digitvant virtual card screen on a phone" },
  { src: `${IMG}/referral.jpg`, alt: "Digitvant referral screen on a phone" },
  { src: `${IMG}/freeze-card.jpg`, alt: "Digitvant freeze card screen on a phone" },
  { src: `${IMG}/electricity.jpg`, alt: "Digitvant electricity payment screen on a phone" },
];

const RESULTS = [
  "Platform growth from 1,000+ beta users to 10,000+ active users",
  "Progressive KYC onboarding that reduced activation friction while keeping compliance",
  "Complete redesign of the mobile and internet banking platforms",
  "A reusable design system and component library for engineering",
  "An internal customer support dashboard for operations teams",
  "Digitvant Pay was recognised as Fintech Disruptor of the Year 2025",
];

const ROLE_TAGS = [
  "PRODUCT STRATEGY",
  "UX RESEARCH",
  "MOBILE BANKING",
  "INTERNET BANKING",
  "SUPPORT DASHBOARD",
  "DESIGN SYSTEM",
  "ENGINEERING COLLABORATION",
];

export const DigitvantCase: FC = () => (
  <div className="d4 d4-case">
    <SiteHeader active="work" showClock={false} />

    <main className="wrap">
      {/* Intro */}
      <section className="case-intro">
        <div className="mono crumbs">
          <Link to="/#work">← ALL WORK</Link>
          <span className="muted">CASE STUDY 01 OF 06</span>
        </div>
        <h1 className="balance">Digitvant Pay</h1>
        <p className="balance summary">
          Redesigning a digital bank so people get value before paperwork, and growing from 1,000
          beta users to over 10,000 active users.
        </p>
        <dl className="facts">
          <div>
            <dt className="mono">ROLE</dt>
            <dd>Product Designer</dd>
          </div>
          <div>
            <dt className="mono">YEAR</dt>
            <dd>2025</dd>
          </div>
          <div>
            <dt className="mono">SCOPE</dt>
            <dd>Mobile banking, internet banking, internal operations</dd>
          </div>
          <div>
            <dt className="mono">OUTCOME</dt>
            <dd style={{ fontWeight: 500 }}>1K beta to 10K+ active users</dd>
          </div>
          <div>
            <dt className="mono">LIVE</dt>
            <dd>
              <a href="https://ibank.digitvant.com" target="_blank" rel="noopener noreferrer" className="ulink">
                ibank.digitvant.com ↗
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <img
        className="cover"
        src={`${IMG}/hero.jpg`}
        alt="Digitvant Pay mobile app on a phone resting on stone"
      />

      {/* 01 Context */}
      <section className="sec" style={{ marginTop: 80 }}>
        <h2 className="label">(01) CONTEXT</h2>
        <div className="prose">
          <p>
            Digitvant Pay was preparing to launch its digital banking platform, but the customer
            experience created friction long before users could experience any value. The
            onboarding flow required users to complete BVN and NIN verification before receiving a
            bank account. While this satisfied compliance requirements, it introduced unnecessary
            friction at the very first interaction with the product.
          </p>
          <p>
            Beyond onboarding, the banking experience itself had become difficult to navigate. Core
            activities such as transfers, bill payments, savings and account management competed
            equally for attention, making the interface feel crowded and overwhelming. The platform
            also lacked a unified design language. Components were inconsistent across web and
            mobile, increasing engineering effort and making the product harder to scale.
          </p>
        </div>
      </section>

      {/* 02 Why it mattered */}
      <section className="sec">
        <h2 className="label">(02) WHY IT MATTERED</h2>
        <div className="prose">
          <p>
            Every additional verification step delayed activation and increased the likelihood
            that potential customers abandoned onboarding before experiencing any value. For a
            growing digital bank, lower activation meant slower customer acquisition and reduced
            lifetime value.
          </p>
          <p>
            The inconsistent interface added engineering overhead that would compound as the team
            scaled, threatening the product's ability to grow without accumulating technical and
            design debt.
          </p>
        </div>
      </section>

      {/* 03 Challenge */}
      <section className="sec">
        <h2 className="label">(03) THE CHALLENGE</h2>
        <p className="balance statement">
          How can users experience the value of Digitvant Pay before completing full identity
          verification, while remaining compliant with financial regulations?
        </p>
      </section>

      {/* 04 Before and after */}
      <section className="sec">
        <h2 className="label">(04) BEFORE AND AFTER</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div className="ba">
            <div className="ba-card">
              <span className="mono eyebrow">BEFORE</span>
              <ul>
                <li>Full KYC required before account creation</li>
                <li>No bank account issued until verification was complete</li>
                <li>Users abandoned before experiencing any product value</li>
              </ul>
            </div>
            <div className="ba-card is-after">
              <span className="mono eyebrow">AFTER</span>
              <ul>
                <li>Instant account creation with email and phone number</li>
                <li>Bank account number issued immediately after registration</li>
                <li>Transactions unlock once BVN and NIN are verified, with clear progress messaging</li>
              </ul>
            </div>
          </div>
          <div className="shots">
            <figure>
              <img src={`${IMG}/before-1.jpg`} alt="The previous Digitvant onboarding screens" loading="lazy" />
              <figcaption className="mono">THE PREVIOUS EXPERIENCE · 1</figcaption>
            </figure>
            <figure>
              <img src={`${IMG}/before-2.jpg`} alt="The previous Digitvant dashboard screens" loading="lazy" />
              <figcaption className="mono">THE PREVIOUS EXPERIENCE · 2</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 05 Approach */}
      <section className="sec">
        <h2 className="label">(05) APPROACH</h2>
        <ol className="approach">
          {APPROACH.map((step, i) => (
            <li key={step.title}>
              <span className="mono muted" style={{ fontSize: 12, paddingTop: 6 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pull quote */}
      <figure className="pullquote">
        <blockquote className="balance">
          “Users didn't need to be fully verified to receive value.{" "}
          <span className="soft">They only needed to be fully verified to move money.”</span>
        </blockquote>
        <figcaption className="mono">THE INSIGHT THAT SHAPED THE REDESIGN</figcaption>
      </figure>

      {/* 06 Timeline */}
      <section className="sec" style={{ borderTop: 0 }}>
        <h2 className="label">(06) TIMELINE</h2>
        <ol className="pills">
          {TIMELINE.map((t) => (
            <li key={t.label} className={`mono pill${t.dark ? " is-dark" : ""}`}>
              {t.label}
            </li>
          ))}
        </ol>
      </section>

      {/* 07 Outcome */}
      <section className="sec">
        <h2 className="label">(07) OUTCOME</h2>
        <div className="prose">
          <p>
            The redesign introduced progressive onboarding that reduced activation friction without
            compromising compliance. People could register with only an email address and phone
            number, and immediately received a bank account number and access to the dashboard.
          </p>
          <p>
            Financial transactions stayed disabled until BVN and NIN verification were complete,
            with clear messaging about verification status throughout the experience.
          </p>
          <p>
            Across the wider banking experience, I restructured navigation, simplified layouts,
            improved information hierarchy and prioritised high frequency actions like transfers,
            savings and bill payments, all supported by a reusable design system shared with
            engineering.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery">
        {GALLERY.map((g) => (
          <img key={g.src} src={g.src} alt={g.alt} loading="lazy" />
        ))}
        <div className="shipped">
          <span className="mono eyebrow">SHIPPED</span>
          <span className="big">
            Mobile app, internet banking and an internal support dashboard, on one design system.
          </span>
        </div>
      </section>

      {/* 08 Results */}
      <section className="sec">
        <h2 className="label">(08) RESULTS</h2>
        <ol className="results">
          {RESULTS.map((r, i) => (
            <li key={r}>
              <span className="mono n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{r}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 09 Takeaway */}
      <section className="sec">
        <h2 className="label">(09) KEY TAKEAWAY</h2>
        <p className="balance takeaway">
          Compliance and usability don't have to compete. By separating account creation from
          transaction eligibility, we reduced activation friction without compromising regulatory
          requirements.{" "}
          <span className="soft">The right product constraint can become a design advantage.</span>
        </p>
      </section>

      {/* 10 My role */}
      <section className="sec">
        <h2 className="label">(10) MY ROLE</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <p style={{ margin: 0, maxWidth: 720, fontSize: 18, lineHeight: 1.65, color: "#3d3d3d" }}>
            I led the redesign of Digitvant Pay's customer banking experience across mobile and
            web, while creating a shared design language that engineering could scale.
          </p>
          <ul className="pills">
            {ROLE_TAGS.map((tag) => (
              <li key={tag} className="mono pill" style={{ padding: "8px 12px", color: "#191919" }}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next */}
      <Link to="/work/plenti" className="next-link">
        <span style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span className="mono eyebrow">NEXT PROJECT · 02</span>
          <span className="big">Plenti</span>
        </span>
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </main>

    <footer className="wrap mono d4-footer">
      <div>
        <span>© 2026 OLUWANIFEMI OSUNSANYA</span>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          LET'S TALK ABOUT YOUR PRODUCT →
        </Link>
      </div>
    </footer>
  </div>
);
