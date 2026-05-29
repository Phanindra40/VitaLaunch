import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ecosystemHighlights, features, templates, workflowSteps } from "../data/siteContent";

export default function HomePage() {
  return (
    <div className="page-home">
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="bg-glow glow-3"></div>

      <section className="hero hero-home">
        <div className="hero-left">
          <div className="hero-badge">
            <Sparkles size={16} />
            Powered by the VitaForge Career Stack
          </div>

          <h1>
            Build a Premium
            <span> Developer Presence </span>
            in Minutes
          </h1>

          <p>
            VitaLaunch helps you launch a polished, high-conversion personal website with the same visual DNA as VitaForge AI. Structured, elegant, and made for career outcomes.
          </p>

          <div className="hero-buttons">
            <Link to="/build" className="primary-btn">
              Start Portfolio Build
              <ArrowRight size={18} />
            </Link>

            <Link to="/features" className="secondary-btn">
              Explore Features
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h2>5+</h2>
              <span>Premium Templates</span>
            </div>

            <div>
              <h2>60s</h2>
              <span>First Draft Live</span>
            </div>

            <div>
              <h2>100%</h2>
              <span>Mobile Optimized</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="portfolio-preview">
            <div className="preview-header">
              <span></span>
              <span></span>
              <span></span>
              <p>VitaLaunch Studio</p>
            </div>

            <div className="preview-body">
              <div className="profile-circle"></div>

              <h3>Phanindra</h3>
              <p>AI Full Stack Developer</p>

              <div className="tech-stack">
                <span>React</span>
                <span>Next.js</span>
                <span>Node.js</span>
                <span>AI Agents</span>
              </div>

              <div className="preview-project">
                <div></div>
                <small>Resume Intelligence Engine</small>
              </div>
              <div className="preview-project">
                <div></div>
                <small>Recruiter Dashboard</small>
              </div>
              <div className="preview-project">
                <div></div>
                <small>Interview Simulation Lab</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="trust-chip">VitaForge Design Language</div>
        <div className="trust-chip">ATS + Portfolio + Interview Workflow</div>
        <div className="trust-chip">Recruiter-First Information Architecture</div>
      </section>

      <section className="features" id="features">
        <div className="section-title">
          <span>FEATURES</span>
          <h2>Everything for a Premium Career Site</h2>
          <p>
            A complete pipeline to transform your raw profile into a polished, high-signal digital presence.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div className="feature-card" key={feature.title}>
                <Icon size={38} />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="templates home-templates" id="templates">
        <div className="section-title">
          <span>TEMPLATES</span>
          <h2>Choose the page that matches your career story</h2>
          <p>
            Every template keeps the VitaForge system recognizable while shifting the visual tone for a distinct audience.
          </p>
        </div>

        <div className="template-showcase home-template-showcase">
          {templates.map((template) => {
            const Icon = template.icon;

            return (
              <article className={`template-card detail ${template.accent}`} key={template.name}>
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
              </article>
            );
          })}
        </div>
      </section>

      <section className="ecosystem" id="ecosystem">
        <div className="section-title">
          <span>ECOSYSTEM FIT</span>
          <h2>Built to Work With VitaForge AI Tools</h2>
        </div>

        <div className="ecosystem-grid">
          {ecosystemHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div className="ecosystem-card" key={item.title}>
                <Icon size={26} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="steps" id="steps">
        <div className="section-title">
          <span>HOW IT WORKS</span>
          <h2>Launch Portfolio in 3 Steps</h2>
        </div>

        <div className="steps-grid">
          {workflowSteps.map((step) => (
            <div className="step-card" key={step.step}>
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-box">
          <Wand2 size={48} />

          <h2>
            Ready to Launch Your
            <span> Premium Portfolio?</span>
          </h2>

          <p>
            Built as a first-class part of the VitaForge AI career ecosystem, with the same premium look, feel, and confidence.
          </p>

          <Link to="/build" className="primary-btn large-btn">
            Start Building Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}