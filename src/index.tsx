import './tailwind.css';
import { inject } from '@vercel/analytics';
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PageTransition } from "./components/PageTransition";
import { Home } from "./screens/Home/Home";
import { Work } from "./screens/Work/Work";
import { ProjectDetail } from "./screens/ProjectDetail/ProjectDetail";
import { WorkWithMe } from "./screens/WorkWithMe/WorkWithMe";
import { About } from "./screens/About/About";
import { Preloader } from "./components/Preloader";

inject();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

console.log("🚀 App started!");

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    if (hasSeenPreloader) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("hasSeenPreloader", "true");
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  const location = useLocation();
  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {showContent && (
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:projectId" element={<ProjectDetail />} />
            <Route path="/work-with-me" element={<WorkWithMe />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<div style={{padding:'2rem',textAlign:'center'}}><h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
          </Routes>
        </PageTransition>
      )}
    </>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
