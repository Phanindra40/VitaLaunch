import { ArrowRight, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { workflowSteps } from "../data/siteContent";

export default function WorkflowPage() {
  return (
    <section className="page-section page-panel">
      <div className="page-hero compact">
        <span className="page-kicker">How It Works</span>
        <h1>Launch a portfolio in three focused steps.</h1>
        <p>
          The flow is intentionally short: bring in your profile, pick a template, and publish a polished career site.
        </p>
      </div>

      <div className="steps-grid steps-grid-wide">
        {workflowSteps.map((step) => (
          <article className="step-card" key={step.step}>
            <div className="step-number">{step.step}</div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className="cta-box slim">
        <Wand2 size={36} />
        <h2>Ready to move from draft to launch?</h2>
        <p>Choose a template, tune the details, and publish a portfolio that feels considered from the first screen.</p>
        <Link to="/" className="primary-btn large-btn">
          Back to home
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}