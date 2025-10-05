import '../tailwind.css'; // Correct path, file is in project root
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { Work } from "./screens/Work/Work";
import { ProjectDetail } from "./screens/ProjectDetail/ProjectDetail";
import { WorkWithMe } from "./screens/WorkWithMe/WorkWithMe";
import { Preloader } from "./components/Preloader";

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

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {showContent && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:projectId" element={<ProjectDetail />} />
            <Route path="/work-with-me" element={<WorkWithMe />} />
            <Route path="*" element={<div style={{padding:'2rem',textAlign:'center'}}><h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
