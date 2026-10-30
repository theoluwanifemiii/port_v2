import './tailwind.css';
import { inject } from '@vercel/analytics';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PageTransition } from "./components/PageTransition";
import { Home } from "./screens/Home/Home";
import { Work } from "./screens/Work/Work";
import { Contact } from "./screens/Contact/Contact";
import { DigitvantCase } from "./screens/CaseStudy/DigitvantCase";
import { CaseStudyPage } from "./screens/CaseStudy/CaseStudyPage";
import { About } from "./screens/About/About";
import { Fintech } from "./screens/Fintech/Fintech";
import { PaybleV21 } from "./screens/PaybleV21/PaybleV21";
import { Explorations } from "./screens/Explorations/Explorations";
import { DesignPrinciples } from "./screens/DesignPrinciples/DesignPrinciples";
import { Archive } from "./screens/Archive/Archive";
import { ArchiveXP } from "./screens/Archive/ArchiveXP";
import { Lab } from "./screens/Lab/Lab";
import { MomentOS } from "./screens/Lab/MomentOS";
import { ClientBrief } from "./screens/ClientBrief/ClientBrief";
import { Euphoria } from "./screens/Euphoria/Euphoria";

inject();

const App = () => {
  const location = useLocation();

  // The Euphoria digital menu is opened by restaurant guests from a table QR
  // code, so it runs on its own, without the portfolio route transition.
  if (location.pathname === "/euphoria" || location.pathname.startsWith("/euphoria/")) {
    return (
      <Routes location={location}>
        <Route path="/euphoria/*" element={<Euphoria />} />
      </Routes>
    );
  }

  // The site opens straight on the page; on Home that is the headline intro.
  return (
    <PageTransition routeKey={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/digitvant-pay" element={<DigitvantCase />} />
        <Route path="/work/:projectId" element={<CaseStudyPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work-with-me" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/fintech" element={<Fintech />} /> {/* Hidden page */}
        <Route path="/payble-v21" element={<PaybleV21 />} />
        <Route path="/explorations" element={<Explorations />} />
        <Route path="/design-principles" element={<DesignPrinciples />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/archive/xp" element={<ArchiveXP />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/lab/momentos" element={<MomentOS />} />
        <Route path="/client-brief" element={<ClientBrief />} /> {/* Hidden page */}
        <Route path="*" element={<div style={{padding:'2rem',textAlign:'center'}}><h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
      </Routes>
    </PageTransition>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
