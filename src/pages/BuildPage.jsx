import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../UserData/Form";

export default function BuildPage() {
  const navigate = useNavigate();

  const handleProfileSubmit = (portfolioData) => {
    navigate("/templates", {
      state: {
        portfolioData,
      },
    });
  };

  return (
    <section className="page-section page-panel build-page">
      <div className="page-hero compact">
        <span className="page-kicker">Builder</span>
        <h1>Add your details first, then choose a template with live preview.</h1>
        <p>
          Step 1 collects your profile details. Step 2 lets you compare templates with a live preview before opening your final portfolio.
        </p>
      </div>

      <Form onSubmit={handleProfileSubmit} />

      <div className="page-action-row">
        <Link to="/templates" className="page-link-button">
          Explore all templates
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}