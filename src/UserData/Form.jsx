import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { templates } from "../data/siteContent";

const STORAGE_KEY = "vitalaunch-portfolio-data";

const initialPortfolioData = {
  personal: {
    fullName: "Phanindra",
    role: "AI Full Stack Developer",
    tagline: "Building AI-powered web experiences",
    bio: "I build production-grade products with clear UX, clean architecture, and measurable impact.",
    location: "India",
    email: "hello@vitalaunch.dev",
    phone: "+91 98765 43210",
    profileImage: "",
    resumeUrl: "",
  },
  socials: {
    github: "",
    linkedin: "",
    portfolio: "",
    twitter: "",
    instagram: "",
    behance: "",
    dribbble: "",
    leetcode: "",
    hackerrank: "",
  },
  skills: [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Tailwind"],
    },
  ],
  projects: [
    {
      title: "PortfolioForge Builder",
      description: "A generator to create recruiter-ready portfolios with live previews and template switching.",
      technologies: ["React", "Vite", "CSS"],
      github: "",
      liveDemo: "",
      image: "",
      featured: true,
    },
  ],
  customization: {
    template: "NovaDev",
  },
};

const stepLabels = ["Personal", "Socials", "Skills", "Projects", "Template"];

export default function Form({ onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [portfolioData, setPortfolioData] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return initialPortfolioData;
    }

    try {
      const parsed = JSON.parse(stored);

      return {
        ...initialPortfolioData,
        ...parsed,
        personal: {
          ...initialPortfolioData.personal,
          ...(parsed.personal ?? {}),
        },
        socials: {
          ...initialPortfolioData.socials,
          ...(parsed.socials ?? {}),
        },
        customization: {
          ...initialPortfolioData.customization,
          ...(parsed.customization ?? {}),
        },
        skills: Array.isArray(parsed.skills) && parsed.skills.length ? parsed.skills : initialPortfolioData.skills,
        projects: Array.isArray(parsed.projects) && parsed.projects.length ? parsed.projects : initialPortfolioData.projects,
      };
    } catch {
      return initialPortfolioData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
  }, [portfolioData]);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.name === portfolioData.customization.template) ?? templates[0],
    [portfolioData.customization.template],
  );

  const SelectedTemplateIcon = selectedTemplate.icon;

  const lowerRole = portfolioData.personal.role.toLowerCase();
  const showDeveloperSocials = /(developer|engineer|full stack|frontend|backend|ai|ml)/i.test(lowerRole);
  const showDesignerSocials = /(designer|ui|ux|product design)/i.test(lowerRole);

  const completionScore = useMemo(() => {
    const checks = [
      portfolioData.personal.fullName.trim().length > 0,
      portfolioData.personal.role.trim().length > 0,
      portfolioData.personal.bio.trim().length > 0,
      portfolioData.skills.some((item) => item.skills.length > 0),
      portfolioData.projects.some((project) => project.title.trim() && project.description.trim()),
    ];

    const done = checks.filter(Boolean).length;
    return Math.round((done / checks.length) * 100);
  }, [portfolioData]);

  const setPersonalField = (name, value) => {
    setPortfolioData((current) => ({
      ...current,
      personal: {
        ...current.personal,
        [name]: value,
      },
    }));
  };

  const setSocialField = (name, value) => {
    setPortfolioData((current) => ({
      ...current,
      socials: {
        ...current.socials,
        [name]: value,
      },
    }));
  };

  const addSkillGroup = () => {
    setPortfolioData((current) => ({
      ...current,
      skills: [...current.skills, { category: "Frontend", skills: [] }],
    }));
  };

  const updateSkillGroup = (index, field, value) => {
    setPortfolioData((current) => {
      const next = [...current.skills];

      if (field === "skills") {
        next[index] = {
          ...next[index],
          skills: value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        };
      } else {
        next[index] = {
          ...next[index],
          [field]: value,
        };
      }

      return {
        ...current,
        skills: next,
      };
    });
  };

  const removeSkillGroup = (index) => {
    setPortfolioData((current) => {
      if (current.skills.length === 1) {
        return current;
      }

      return {
        ...current,
        skills: current.skills.filter((_, skillIndex) => skillIndex !== index),
      };
    });
  };

  const addProject = () => {
    setPortfolioData((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          title: "",
          description: "",
          technologies: [],
          github: "",
          liveDemo: "",
          image: "",
          featured: false,
        },
      ],
    }));
  };

  const updateProject = (index, field, value) => {
    setPortfolioData((current) => {
      const next = [...current.projects];

      if (field === "technologies") {
        next[index] = {
          ...next[index],
          technologies: value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        };
      } else if (field === "featured") {
        next[index] = {
          ...next[index],
          featured: value,
        };
      } else {
        next[index] = {
          ...next[index],
          [field]: value,
        };
      }

      return {
        ...current,
        projects: next,
      };
    });
  };

  const removeProject = (index) => {
    setPortfolioData((current) => {
      if (current.projects.length === 1) {
        return current;
      }

      return {
        ...current,
        projects: current.projects.filter((_, projectIndex) => projectIndex !== index),
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeStep < stepLabels.length - 1) {
      setActiveStep((current) => current + 1);
      return;
    }

    if (onSubmit) {
      onSubmit(portfolioData);
    }
  };

  const goToPreviousStep = () => {
    setActiveStep((current) => Math.max(0, current - 1));
  };

  const featuredProjects = portfolioData.projects.filter((project) => project.featured && project.title.trim());

  const renderActiveStep = () => {
    if (activeStep === 0) {
      return (
        <div className="field-grid">
          <label className="field-block">
            <span>Full Name</span>
            <input
              name="fullName"
              value={portfolioData.personal.fullName}
              onChange={(event) => setPersonalField("fullName", event.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label className="field-block">
            <span>Professional Role</span>
            <input
              name="role"
              value={portfolioData.personal.role}
              onChange={(event) => setPersonalField("role", event.target.value)}
              placeholder="AI Engineer"
              required
            />
          </label>

          <label className="field-block full-width">
            <span>Short Tagline</span>
            <input
              name="tagline"
              value={portfolioData.personal.tagline}
              onChange={(event) => setPersonalField("tagline", event.target.value)}
              placeholder="Building AI-powered web experiences"
            />
          </label>

          <label className="field-block full-width">
            <span>About / Bio</span>
            <textarea
              name="bio"
              value={portfolioData.personal.bio}
              onChange={(event) => setPersonalField("bio", event.target.value)}
              rows="4"
              placeholder="Write a concise, recruiter-friendly summary"
              required
            />
          </label>

          <label className="field-block">
            <span>Profile Image URL</span>
            <input
              name="profileImage"
              value={portfolioData.personal.profileImage}
              onChange={(event) => setPersonalField("profileImage", event.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="field-block">
            <span>Resume URL</span>
            <input
              name="resumeUrl"
              value={portfolioData.personal.resumeUrl}
              onChange={(event) => setPersonalField("resumeUrl", event.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="field-block">
            <span>Location</span>
            <input
              name="location"
              value={portfolioData.personal.location}
              onChange={(event) => setPersonalField("location", event.target.value)}
              placeholder="City, Country"
            />
          </label>

          <label className="field-block">
            <span>Email</span>
            <input
              name="email"
              value={portfolioData.personal.email}
              onChange={(event) => setPersonalField("email", event.target.value)}
              placeholder="hello@domain.com"
            />
          </label>

          <label className="field-block">
            <span>Phone</span>
            <input
              name="phone"
              value={portfolioData.personal.phone}
              onChange={(event) => setPersonalField("phone", event.target.value)}
              placeholder="+91 98765 43210"
            />
          </label>
        </div>
      );
    }

    if (activeStep === 1) {
      return (
        <div className="field-grid">
          <label className="field-block">
            <span>LinkedIn</span>
            <input
              value={portfolioData.socials.linkedin}
              onChange={(event) => setSocialField("linkedin", event.target.value)}
              placeholder="https://linkedin.com/in/..."
            />
          </label>

          <label className="field-block">
            <span>Primary Portfolio</span>
            <input
              value={portfolioData.socials.portfolio}
              onChange={(event) => setSocialField("portfolio", event.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="field-block">
            <span>Twitter / X</span>
            <input
              value={portfolioData.socials.twitter}
              onChange={(event) => setSocialField("twitter", event.target.value)}
              placeholder="https://x.com/..."
            />
          </label>

          <label className="field-block">
            <span>Instagram</span>
            <input
              value={portfolioData.socials.instagram}
              onChange={(event) => setSocialField("instagram", event.target.value)}
              placeholder="https://instagram.com/..."
            />
          </label>

          {(showDeveloperSocials || !showDesignerSocials) && (
            <>
              <label className="field-block">
                <span>GitHub</span>
                <input
                  value={portfolioData.socials.github}
                  onChange={(event) => setSocialField("github", event.target.value)}
                  placeholder="https://github.com/..."
                />
              </label>

              <label className="field-block">
                <span>LeetCode</span>
                <input
                  value={portfolioData.socials.leetcode}
                  onChange={(event) => setSocialField("leetcode", event.target.value)}
                  placeholder="https://leetcode.com/..."
                />
              </label>

              <label className="field-block">
                <span>HackerRank</span>
                <input
                  value={portfolioData.socials.hackerrank}
                  onChange={(event) => setSocialField("hackerrank", event.target.value)}
                  placeholder="https://hackerrank.com/..."
                />
              </label>
            </>
          )}

          {(showDesignerSocials || !showDeveloperSocials) && (
            <>
              <label className="field-block">
                <span>Behance</span>
                <input
                  value={portfolioData.socials.behance}
                  onChange={(event) => setSocialField("behance", event.target.value)}
                  placeholder="https://behance.net/..."
                />
              </label>

              <label className="field-block">
                <span>Dribbble</span>
                <input
                  value={portfolioData.socials.dribbble}
                  onChange={(event) => setSocialField("dribbble", event.target.value)}
                  placeholder="https://dribbble.com/..."
                />
              </label>
            </>
          )}
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <div className="dynamic-blocks">
          {portfolioData.skills.map((skillGroup, index) => (
            <article className="dynamic-item" key={`${skillGroup.category}-${index}`}>
              <div className="dynamic-item-header">
                <strong>Skill Group {index + 1}</strong>
                <button type="button" className="mini-btn" onClick={() => removeSkillGroup(index)}>
                  Remove
                </button>
              </div>

              <div className="field-grid">
                <label className="field-block">
                  <span>Category</span>
                  <select
                    value={skillGroup.category}
                    onChange={(event) => updateSkillGroup(index, "category", event.target.value)}
                  >
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Database</option>
                    <option>AI/ML</option>
                    <option>Cloud</option>
                    <option>DevOps</option>
                    <option>Design</option>
                    <option>Languages</option>
                  </select>
                </label>

                <label className="field-block full-width">
                  <span>Skills (comma separated)</span>
                  <input
                    value={skillGroup.skills.join(", ")}
                    onChange={(event) => updateSkillGroup(index, "skills", event.target.value)}
                    placeholder="React, TypeScript, Next.js"
                  />
                </label>
              </div>
            </article>
          ))}

          <button type="button" className="secondary-btn add-row-btn" onClick={addSkillGroup}>
            + Add Skill Group
          </button>
        </div>
      );
    }

    if (activeStep === 3) {
      return (
        <div className="dynamic-blocks">
          {portfolioData.projects.map((project, index) => (
            <article className="dynamic-item" key={`${project.title}-${index}`}>
              <div className="dynamic-item-header">
                <strong>Project {index + 1}</strong>
                <button type="button" className="mini-btn" onClick={() => removeProject(index)}>
                  Remove
                </button>
              </div>

              <div className="field-grid">
                <label className="field-block">
                  <span>Project Title</span>
                  <input
                    value={project.title}
                    onChange={(event) => updateProject(index, "title", event.target.value)}
                    placeholder="AI Resume Analyzer"
                  />
                </label>

                <label className="field-block">
                  <span>Technologies</span>
                  <input
                    value={project.technologies.join(", ")}
                    onChange={(event) => updateProject(index, "technologies", event.target.value)}
                    placeholder="React, Node.js, MongoDB"
                  />
                </label>

                <label className="field-block full-width">
                  <span>Description</span>
                  <textarea
                    rows="3"
                    value={project.description}
                    onChange={(event) => updateProject(index, "description", event.target.value)}
                    placeholder="Describe scope, outcomes, and impact"
                  />
                </label>

                <label className="field-block">
                  <span>GitHub Link</span>
                  <input
                    value={project.github}
                    onChange={(event) => updateProject(index, "github", event.target.value)}
                    placeholder="https://github.com/..."
                  />
                </label>

                <label className="field-block">
                  <span>Live Demo</span>
                  <input
                    value={project.liveDemo}
                    onChange={(event) => updateProject(index, "liveDemo", event.target.value)}
                    placeholder="https://..."
                  />
                </label>

                <label className="field-block">
                  <span>Thumbnail URL</span>
                  <input
                    value={project.image}
                    onChange={(event) => updateProject(index, "image", event.target.value)}
                    placeholder="https://..."
                  />
                </label>

                <label className="toggle-field">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(event) => updateProject(index, "featured", event.target.checked)}
                  />
                  <span>Featured project</span>
                </label>
              </div>
            </article>
          ))}

          <button type="button" className="secondary-btn add-row-btn" onClick={addProject}>
            + Add Project
          </button>
        </div>
      );
    }

    return (
      <div className="template-choice-group">
        <div className="template-choice-header">
          <span>Choose a template</span>
          <small>{selectedTemplate.label}</small>
        </div>

        <div className="template-choice-grid">
          {templates.map((template) => {
            const TemplateIcon = template.icon;
            const isSelected = portfolioData.customization.template === template.name;

            return (
              <label className={`template-choice ${template.accent} ${isSelected ? "selected" : ""}`} key={template.name}>
                <input
                  type="radio"
                  name="template"
                  value={template.name}
                  checked={isSelected}
                  onChange={(event) => {
                    setPortfolioData((current) => ({
                      ...current,
                      customization: {
                        ...current.customization,
                        template: event.target.value,
                      },
                    }));
                  }}
                />

                <span className="choice-icon">
                  <TemplateIcon size={18} />
                </span>

                <div>
                  <strong>{template.name}</strong>
                  <p>{template.tone}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="builder-layout">
      <form className="builder-form card-panel" onSubmit={handleSubmit}>
        <div className="builder-heading">
          <span className="page-kicker">Build</span>
          <h2>Multi-step smart builder for your portfolio.</h2>
          <p>
            Add only the essential data first. Everything is autosaved locally while you complete each step.
          </p>
        </div>

        <div className="builder-progress">
          <div className="builder-progress-top">
            <strong>Profile Completion: {completionScore}%</strong>
            <small>Step {activeStep + 1} of {stepLabels.length}</small>
          </div>
          <div className="builder-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={completionScore}>
            <span style={{ width: `${completionScore}%` }}></span>
          </div>
        </div>

        <div className="step-tabs" aria-label="Form Steps">
          {stepLabels.map((label, index) => (
            <button
              key={label}
              type="button"
              className={`step-tab ${index === activeStep ? "active" : ""}`}
              onClick={() => setActiveStep(index)}
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>

        {renderActiveStep()}

        <div className="form-nav-row">
          <button type="button" className="secondary-btn" onClick={goToPreviousStep} disabled={activeStep === 0}>
            Previous
          </button>

          <button className="primary-btn builder-submit" type="submit">
            {activeStep === stepLabels.length - 1 ? "Continue to template selector" : "Next Step"}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>

      <aside className={`builder-preview card-panel template-card detail ${selectedTemplate.accent}`}>
        <div className="preview-ribbon">
          <Sparkles size={16} />
          Live Preview
        </div>

        <div className="builder-preview-hero">
          <div className="template-preview template-ornament">
            <SelectedTemplateIcon size={22} />
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
            <span>{portfolioData.personal.email || "Not added"}</span>
          </div>
          <div>
            <strong>Location</strong>
            <span>{portfolioData.personal.location || "Not added"}</span>
          </div>
          <div>
            <strong>Template</strong>
            <span>{selectedTemplate.name}</span>
          </div>
          <div>
            <strong>Projects</strong>
            <span>{portfolioData.projects.filter((project) => project.title.trim()).length}</span>
          </div>
        </div>

        <div className="template-divider"></div>

        <div className="preview-mini-list">
          <strong>Top Skills</strong>
          <p>
            {portfolioData.skills
              .flatMap((item) => item.skills)
              .slice(0, 5)
              .join(" • ") || "Add skills to improve your profile completion"}
          </p>
        </div>

        <div className="preview-mini-list">
          <strong>Featured Projects</strong>
          <p>
            {featuredProjects.length
              ? featuredProjects.map((project) => project.title).join(" • ")
              : "Mark at least one project as featured"}
          </p>
        </div>

        <div className="template-pills">
          {selectedTemplate.unique.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </aside>
    </div>
  );
}