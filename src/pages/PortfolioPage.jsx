import { Navigate, useLocation, useParams } from "react-router-dom";
import NovaDev from "../Templates/NovaDev";
import GlassEdge from "../Templates/GlassEdge";
import Zenith from "../Templates/Zenith";
import NeonForge from "../Templates/NeonForge";
import PixelFlow from "../Templates/PixelFlow";

const templateMap = {
  novadev: NovaDev,
  glassedge: GlassEdge,
  zenith: Zenith,
  neonforge: NeonForge,
  pixelflow: PixelFlow,
};

const defaultProfile = {
  personal: {
    fullName: "Jordan Vale",
    role: "AI Full Stack Developer",
    tagline: "Building premium digital experiences for modern careers.",
    bio: "I build production-grade products with clear UX, clean architecture, and measurable impact.",
    email: "hello@vitalaunch.dev",
    location: "India",
  },
  socials: {},
  skills: [],
  projects: [],
  customization: {
    template: "NovaDev",
  },
};

export default function PortfolioPage() {
  const { templateSlug } = useParams();
  const location = useLocation();
  const portfolioData = location.state?.portfolioData ?? defaultProfile;
  const TemplateComponent = templateMap[templateSlug];

  if (!TemplateComponent) {
    return <Navigate to="/templates" replace />;
  }

  return (
    <section className="portfolio-output-page">
      <TemplateComponent profile={portfolioData.personal} portfolioData={portfolioData} />
    </section>
  );
}
