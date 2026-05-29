import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SiteShell from "./components/SiteShell";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import TemplatesPage from "./pages/TemplatesPage";
import EcosystemPage from "./pages/EcosystemPage";
import WorkflowPage from "./pages/WorkflowPage";
import BuildPage from "./pages/BuildPage";
import PortfolioPage from "./pages/PortfolioPage";

function App() {
  return (
    <BrowserRouter>
      <SiteShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/portfolio/:templateSlug" element={<PortfolioPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  );
}

export default App;