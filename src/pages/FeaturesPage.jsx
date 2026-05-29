import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { features } from "../data/siteContent";

export default function FeaturesPage() {
  return (
    <section className="page-section page-panel">
      <div className="page-hero compact">
        <span className="page-kicker">Features</span>
        <h1>Built for portfolio speed, clarity, and conversion.</h1>
        <p>
          VitaForge combines premium design with practical career tooling, so each page feels polished without losing usefulness.
        </p>
        <Link to="/templates" className="page-link-button">
          See templates
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="feature-grid feature-grid-wide">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article className="feature-card" key={feature.title}>
              <Icon size={38} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}