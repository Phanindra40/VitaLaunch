import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { templates, templateDetails } from "../data/siteContent";

const defaultProfile = {
  personal: {
    fullName: "Jordan Vale",
    role: "AI Full Stack Developer",
    tagline: "Building premium digital experiences for modern careers.",
    bio: "I build production-grade products with clear UX, clean architecture, and measurable impact.",
    email: "hello@vitalaunch.dev",
    location: "India",
  },
  skills: [],
  projects: [],
  customization: {
    template: "NovaDev",
  },
};

export default function TemplatesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const portfolioData = location.state?.portfolioData ?? defaultProfile;
  const [selectedTemplateName, setSelectedTemplateName] = useState(templates[0].name);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.name === selectedTemplateName) ?? templates[0],
    [selectedTemplateName],
  );
  const SelectedIcon = selectedTemplate.icon;

  const openPortfolio = () => {
    navigate(`/portfolio/${selectedTemplate.name.toLowerCase()}`, {
      state: {
        portfolioData: {
          ...portfolioData,
          customization: {
            ...portfolioData.customization,
            template: selectedTemplate.name,
          },
        },
      },
    });
  };

  return (
    <section className="page-section page-panel selector-page">
      <div className="page-hero">
        <span className="page-kicker">Template Selector</span>
        <h1>Choose your template with live profile preview.</h1>
        <p>
          Your details are loaded. Pick a template style and open the final desktop-ready portfolio in one click.
        </p>

        <div className="page-pills">
          {templateDetails.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="selector-layout">
        <div className="template-showcase selector-showcase">
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedTemplate.name === template.name;

            return (
              <button
                type="button"
                className={`template-card detail selector-card ${template.accent} ${isSelected ? "selected" : ""}`}
                key={template.name}
                onClick={() => setSelectedTemplateName(template.name)}
              >
                <div className="template-card-top">
                  <div className="template-preview template-ornament">
                    <Icon size={22} />
                  </div>

                  <div>
                    <span className="template-label">{template.label}</span>
                    <h3>{template.name}</h3>
                    <p className="template-tone">{template.tone}</p>
                  </div>
                </div>

                <p className="template-philosophy">{template.philosophy}</p>

                <div className="template-meta">
                  <strong>Best for</strong>
                  <span>{template.bestFor}</span>
                </div>

                <div className="template-pills">
                  {template.identity.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="template-divider"></div>

                <div className="template-features">
                  {template.features.map((feature) => (
                    <div key={feature} className="template-feature-row">
                      <span></span>
                      <small>{feature}</small>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <aside className={`builder-preview selector-preview card-panel template-card detail ${selectedTemplate.accent}`}>
          <div className="preview-ribbon">Live Preview</div>

          <div className="builder-preview-hero">
            <div className="template-preview template-ornament">
              <SelectedIcon size={22} />
            </div>

            <div>
              <span className="template-label">{selectedTemplate.label}</span>
              <h3>{portfolioData.personal.fullName}</h3>
              <p className="template-tone">{portfolioData.personal.role}</p>
            </div>
          </div>

          <p className="template-philosophy">{portfolioData.personal.tagline || portfolioData.personal.bio}</p>

          <div className="preview-summary-grid">
            <div>
              <strong>Email</strong>
              <span>{portfolioData.personal.email}</span>
            </div>
            <div>
              <strong>Location</strong>
              <span>{portfolioData.personal.location}</span>
            </div>
            <div>
              <strong>Template</strong>
              <span>{selectedTemplate.name}</span>
            </div>
            <div>
              <strong>Tone</strong>
              <span>{selectedTemplate.tone}</span>
            </div>
          </div>

          <div className="template-divider"></div>

          <div className="template-pills">
            {selectedTemplate.unique.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <button type="button" className="page-link-button selector-open-button" onClick={openPortfolio}>
            Open Portfolio
            <ArrowRight size={16} />
          </button>
        </aside>
      </div>

      <div className="page-action-row">
        <Link to="/build" className="page-link-button">
          Edit profile details
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}