import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { Work } from "./screens/Work/Work";
import { ProjectDetail } from "./screens/ProjectDetail/ProjectDetail";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:projectId" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
