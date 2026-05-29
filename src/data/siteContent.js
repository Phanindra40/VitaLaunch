import {
  MonitorSmartphone,
  Layers3,
  BadgeCheck,
  Orbit,
  Sparkle,
  LayoutTemplate,
  Palette,
  Zap,
  Code2,
  Globe,
  ShieldCheck,
  Workflow,
  Rocket,
  CheckCircle2,
} from "lucide-react";

export const navItems = [
  { label: "Home", to: "/" },
  { label: "Build", to: "/build" },
  { label: "Features", to: "/features" },
  { label: "Templates", to: "/templates" },
  { label: "Ecosystem", to: "/ecosystem" },
  { label: "How It Works", to: "/workflow" },
];

export const features = [
  {
    icon: LayoutTemplate,
    title: "Template Engine",
    text: "Start from production-ready portfolios crafted for engineers, founders, and creators.",
  },
  {
    icon: Palette,
    title: "Brand Control",
    text: "Fine-tune colors, spacing, layout rhythm, and typography without writing extra code.",
  },
  {
    icon: Zap,
    title: "AI Content Assist",
    text: "Generate sharper bios, impact-driven project summaries, and cleaner role descriptions.",
  },
  {
    icon: Code2,
    title: "Developer Native",
    text: "Showcase GitHub work, stack depth, architecture choices, and technical leadership.",
  },
  {
    icon: Globe,
    title: "Instant Publish",
    text: "Export and launch in minutes with a polished, recruiter-ready responsive experience.",
  },
  {
    icon: ShieldCheck,
    title: "Career Ready",
    text: "Designed to align with the VitaForge AI career ecosystem for consistent brand trust.",
  },
];

export const templates = [
  {
    name: "NovaDev",
    label: "Modern Developer",
    accent: "nova",
    bestFor: "Full Stack Developers, AI Engineers, Startup Builders",
    philosophy:
      "A cinematic dark portfolio with dashboard-style glass panels and futuristic motion.",
    identity: ["Dark premium background", "Purple + blue glow", "Grid-based layout"],
    features: ["Terminal-style intro", "Floating tech pills", "Bento project cards"],
    tone: "High-performance and technical",
    icon: MonitorSmartphone,
    colors: ["#020617", "#7C3AED", "#3B82F6", "#06B6D4"],
    unique: ["Terminal-style intro mode", "Cursor glow tracking", "Dynamic section transitions"],
  },
  {
    name: "GlassEdge",
    label: "Premium Glassmorphism",
    accent: "glass",
    bestFor: "Freelancers, Designers, Premium portfolios",
    philosophy: "Elegant translucency with refined spacing and luxury SaaS styling.",
    identity: ["Frosted glass UI", "Soft gradients", "Floating layers"],
    features: ["Parallax depth", "Glass reflection cards", "Luxury CTA blocks"],
    tone: "Premium and polished",
    icon: Layers3,
    colors: ["#9333EA", "#6366F1", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.1)"],
    unique: ["Mouse-based parallax", "Floating layered UI", "Smooth blur transitions"],
  },
  {
    name: "Zenith",
    label: "Minimal Professional",
    accent: "zenith",
    bestFor: "Freshers, Corporate roles, Internship applicants",
    philosophy:
      "A recruiter-friendly portfolio with clean hierarchy, ATS-friendly structure, and light visual noise.",
    identity: ["White background", "Slate typography", "Structured spacing"],
    features: ["Print-friendly layout", "Resume-first sections", "Fast-loading cards"],
    tone: "Clear and credible",
    icon: BadgeCheck,
    colors: ["#FFFFFF", "#0F172A", "#334155", "#6366F1"],
    unique: ["Recruiter mode", "Print-friendly layout", "Fast-loading UI"],
  },
  {
    name: "NeonForge",
    label: "Futuristic AI",
    accent: "neon",
    bestFor: "AI Engineers, ML Developers, Startup founders",
    philosophy:
      "A cyberpunk-inspired AI interface with neon borders, holographic surfaces, and immersive grids.",
    identity: ["Deep black background", "Neon gradients", "HUD overlays"],
    features: ["Animated grid background", "Holographic skill cards", "Tech orbit effects"],
    tone: "Bold and futuristic",
    icon: Orbit,
    colors: ["#030712", "#A855F7", "#3B82F6", "#F43F5E"],
    unique: ["AI dashboard style", "Animated HUD overlays", "Interactive lighting"],
  },
  {
    name: "PixelFlow",
    label: "Creative Interactive",
    accent: "pixel",
    bestFor: "UI/UX Designers, Frontend Developers, Creative Technologists",
    philosophy:
      "An experimental, motion-heavy layout for storytelling and memorable interaction.",
    identity: ["Asymmetrical layout", "Gradient blocks", "Dynamic storytelling"],
    features: ["Scroll-triggered animation", "Layout shifts", "Interactive reveals"],
    tone: "Playful and expressive",
    icon: Sparkle,
    colors: ["#F97316", "#F43F5E", "#9333EA", "#4F46E5"],
    unique: ["Scroll-triggered animations", "Dynamic layout shifts", "Interactive cursor effects"],
  },
];

export const ecosystemHighlights = [
  {
    icon: CheckCircle2,
    title: "ATS Scanner Alignment",
    text: "Keep portfolio content and resume narratives consistent.",
  },
  {
    icon: Workflow,
    title: "Unified Career Workflow",
    text: "Move from profile drafting to application readiness in one flow.",
  },
  {
    icon: Rocket,
    title: "Launch-Ready Presence",
    text: "Share a premium link that reflects the VitaForge brand quality.",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Import Your Profile",
    text: "Bring in your projects, experience, and achievements.",
  },
  {
    step: "02",
    title: "Select Premium Template",
    text: "Pick a style and instantly apply VitaForge color intelligence.",
  },
  {
    step: "03",
    title: "Publish + Connect",
    text: "Go live and plug directly into your career outreach workflow.",
  },
];

export const templateDetails = [
  "Recognizable VitaForge design language",
  "Premium motion-friendly structure",
  "Career-ready responsive layout",
];