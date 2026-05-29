import { CheckCircle2, Rocket, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

const ecosystemCards = [
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

export default function EcosystemPage() {
  return (
    <section className="page-section page-panel">
      <div className="page-hero compact">
        <span className="page-kicker">Ecosystem</span>
        <h1>Everything stays aligned with the VitaForge career stack.</h1>
        <p>
          VitaLaunch is designed as part of the broader VitaForge workflow, not as a standalone template gallery.
        </p>
      </div>

      <div className="ecosystem-grid ecosystem-grid-wide">
        {ecosystemCards.map((item) => {
          const Icon = item.icon;

          return (
            <article className="ecosystem-card" key={item.title}>
              <Icon size={26} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>

      <div className="cta-box slim">
        <h2>Portfolio, resume, and interview prep in one brand system.</h2>
        <p>
          Keep your public presence, application story, and recruiter-facing details visually consistent.
        </p>
        <Link to="/templates" className="page-link-button">
          Return to templates
        </Link>
      </div>
    </section>
  );
}