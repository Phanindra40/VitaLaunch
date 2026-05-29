import { useMemo, useRef, useState } from "react";
import { ArrowRight, ExternalLink, Link2, MapPin, Mail, Phone } from "lucide-react";

function getDefaultProject(projects) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return projects.find((project) => project.featured) ?? projects[0];
}

function normalizeSocials(socials = {}) {
  return Object.entries(socials).filter(([, value]) => Boolean(value));
}

function normalizeUrl(url) {
  if (!url) {
    return "";
  }

  if (/^https?:\/\//i.test(url) || url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("/") || url.startsWith("#")) {
    return url;
  }

  return `https://${url}`;
}

export default function PortfolioTemplateShell({ templateLabel, templateTone, templateDescription, profile, portfolioData, themeClass }) {
  const personal = profile ?? portfolioData?.personal ?? {};
  const profileImage = personal.profileImage?.trim() ?? "";
  const skills = portfolioData?.skills ?? [];
  const socials = portfolioData?.socials ?? {};
  const heroPanelRef = useRef(null);
  const projectsSectionRef = useRef(null);

  const projectsStable = useMemo(() => portfolioData?.projects ?? [], [portfolioData?.projects]);

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(() => {
    const defaultProject = getDefaultProject(projectsStable);
    return defaultProject ? projectsStable.indexOf(defaultProject) : 0;
  });

  const selectedProject = useMemo(() => {
    if (projectsStable.length === 0) {
      return null;
    }

    const defaultProject = getDefaultProject(projectsStable);

    if (selectedProjectIndex < projectsStable.length) {
      return projectsStable[selectedProjectIndex];
    }

    return defaultProject;
  }, [projectsStable, selectedProjectIndex]);

  // topSkills intentionally unused for now; keep skills as-is for rendering
  const socialEntries = normalizeSocials(socials).map(([label, value]) => [label, normalizeUrl(value)]);
  const contactCards = [
    personal.location ? { label: "Location", value: personal.location, icon: MapPin } : null,
    personal.email ? { label: "Email", value: personal.email, icon: Mail, href: `mailto:${personal.email}` } : null,
    personal.phone ? { label: "Phone", value: personal.phone, icon: Phone, href: `tel:${personal.phone.replace(/[^+\d]/g, "")}` } : null,
  ].filter(Boolean);

  const projectCount = projectsStable.length;
  const featuredCount = projectsStable.filter((project) => project.featured).length;

  const handleOpenContact = () => {
    if (personal.email) {
      const subject = encodeURIComponent(`Portfolio inquiry for ${personal.fullName ?? personal.name ?? "your work"}`);
      window.open(`mailto:${personal.email}?subject=${subject}`, "_self");
      return;
    }

    heroPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleViewProjects = () => {
    projectsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resumeHref = normalizeUrl(personal.resumeUrl || personal.resume || personal.cvUrl);

  return (
    <div className={`portfolio-template-shell ${themeClass ?? ""}`}>
      <header className="portfolio-template-header">
        <div>
          <span className="portfolio-template-kicker">{templateLabel}</span>
          <h1>{personal.fullName ?? personal.name ?? "Your Name"}</h1>
          <p className="portfolio-template-subtitle">{personal.role ?? "Your Role"}</p>
        </div>

        <div className="portfolio-template-header-actions">
          <span className="portfolio-template-pill">{templateTone}</span>
          <button className="portfolio-template-button" type="button" onClick={handleOpenContact}>
            Open Contact
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <section className="portfolio-template-hero">
        <div className="portfolio-hero-copy">
          <p className="portfolio-template-description">{templateDescription}</p>
          <h2>{personal.tagline || personal.bio || "A portfolio built from your own data."}</h2>
          <p className="portfolio-template-body">
            {personal.bio || "Your summary, projects, and skills are now driving the template content instead of hardcoded filler."}
          </p>

          <div className="portfolio-template-actions-row">
            <button className="portfolio-template-button" type="button" onClick={handleViewProjects}>
              View Projects
              <ArrowRight size={16} />
            </button>

            {resumeHref ? (
              <a className="portfolio-template-button" href={resumeHref} download>
                Download Resume
                <ExternalLink size={16} />
              </a>
            ) : (
              <button className="portfolio-template-button" type="button" onClick={handleOpenContact}>
                Add Resume Link
                <ExternalLink size={16} />
              </button>
            )}
          </div>

          <div className="portfolio-summary-grid">
            <div>
              <strong>{projectCount}</strong>
              <span>Projects</span>
            </div>
            <div>
              <strong>{featuredCount}</strong>
              <span>Featured</span>
            </div>
            <div>
              <strong>{skills.length}</strong>
              <span>Skill Groups</span>
            </div>
          </div>
        </div>

        <aside className="portfolio-hero-panel" ref={heroPanelRef}>
          <div className="portfolio-hero-panel-top">
            <span>Live Profile</span>
            <strong>{personal.location || "Remote"}</strong>
          </div>

          <div className="portfolio-profile-card">
            <div className="portfolio-profile-avatar">
              {profileImage ? (
                <img src={profileImage} alt={personal.fullName ?? "Profile photo"} />
              ) : (
                personal.fullName ? personal.fullName.charAt(0) : "Y"
              )}
            </div>
            <div>
              <h3>{personal.fullName ?? personal.name ?? "Your Name"}</h3>
              <p>{personal.role ?? "Your Role"}</p>
            </div>
          </div>

          <div className="portfolio-contact-grid">
            {contactCards.map((item) => {
              const Icon = item.icon;

              return (
                item.href ? (
                  <a className="portfolio-contact-card" href={item.href} key={item.label}>
                    <Icon size={16} />
                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </div>
                  </a>
                ) : (
                  <div className="portfolio-contact-card" key={item.label}>
                    <Icon size={16} />
                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </div>
                  </div>
                )
              );
            })}
          </div>

          {socialEntries.length > 0 && (
            <div className="portfolio-social-row">
              {socialEntries.map(([label, value]) => (
                <a className="portfolio-social-link" href={value} target="_blank" rel="noreferrer" key={label}>
                  {label}
                </a>
              ))}
            </div>
          )}
        </aside>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section-header">
          <div>
            <span className="portfolio-section-kicker">Skills</span>
            <h3>Structured skill groups</h3>
          </div>
          <p>Skills from the form now shape the template content.</p>
        </div>

        <div className="portfolio-skill-grid">
          {skills.length > 0 ? (
            skills.map((group) => (
              <article className="portfolio-skill-card" key={group.category}>
                <strong>{group.category}</strong>
                <div className="portfolio-chip-row">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className="portfolio-empty-state">
              Add skill groups in the form to populate this section.
            </div>
          )}
        </div>
      </section>

      <section className="portfolio-section" ref={projectsSectionRef}>
        <div className="portfolio-section-header">
          <div>
            <span className="portfolio-section-kicker">Projects</span>
            <h3>Click a project to inspect it</h3>
          </div>
          <p>The spotlight updates from the exact projects the user filled in.</p>
        </div>

        <div className="portfolio-project-layout">
          <div className="portfolio-project-list">
            {projectsStable.length > 0 ? (
              projectsStable.map((project, index) => {
                const isActive = selectedProjectIndex === index;

                return (
                  <button
                    key={`${project.title}-${index}`}
                    type="button"
                    className={`portfolio-project-card ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedProjectIndex(index)}
                  >
                    <div className="portfolio-project-card-top">
                      <strong>{project.title || `Project ${index + 1}`}</strong>
                      {project.featured ? <span>Featured</span> : null}
                    </div>
                    <p>{project.description || "No description added yet."}</p>
                    <div className="portfolio-chip-row">
                      {(project.technologies || []).slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="portfolio-empty-state">
                Add projects in the form to turn this section into a clickable portfolio.
              </div>
            )}
          </div>

          <div className="portfolio-project-spotlight">
            {selectedProject ? (
              <>
                <div className="portfolio-project-spotlight-header">
                  <span>Selected Project</span>
                  <strong>{selectedProject.title}</strong>
                </div>

                <div className="portfolio-project-visual">
                  {selectedProject.image ? (
                    <img src={selectedProject.image} alt={selectedProject.title} />
                  ) : (
                    <div className="portfolio-project-visual-fallback">
                      <span>Project Spotlight</span>
                      <strong>{selectedProject.title}</strong>
                    </div>
                  )}
                </div>

                <p>{selectedProject.description || "No project description added yet."}</p>

                <div className="portfolio-chip-row">
                  {(selectedProject.technologies || []).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="portfolio-project-meta-grid">
                  <div>
                    <strong>Tech Stack</strong>
                    <p>{selectedProject.technologies?.length ? selectedProject.technologies.join(" • ") : "No technologies added"}</p>
                  </div>
                  <div>
                    <strong>Links</strong>
                    <p>
                      {[selectedProject.github, selectedProject.liveDemo].filter(Boolean).length
                        ? "GitHub and live links are available when filled in"
                        : "Add GitHub and live demo links in the form"}
                    </p>
                  </div>
                </div>

                <div className="portfolio-project-links">
                  {selectedProject.github ? (
                    <a href={normalizeUrl(selectedProject.github)} target="_blank" rel="noreferrer">
                      <Link2 size={16} />
                      GitHub
                    </a>
                  ) : null}
                  {selectedProject.liveDemo ? (
                    <a href={normalizeUrl(selectedProject.liveDemo)} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  ) : null}
                  {selectedProject.image ? (
                    <a href={normalizeUrl(selectedProject.image)} target="_blank" rel="noreferrer">
                      <Link2 size={16} />
                      Preview
                    </a>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="portfolio-empty-state">
                Select a project to inspect the details here.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
