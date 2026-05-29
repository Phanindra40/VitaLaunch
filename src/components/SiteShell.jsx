import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { navItems } from "../data/siteContent";

export default function SiteShell({ children }) {
  return (
    <div className="portfolio-shell">
      <nav className="navbar shell-navbar">
        <Link to="/" className="logo-wrap shell-logo-wrap">
          <div className="logo">
            Vita<span>Launch</span>
          </div>
          <p>Part of the VitaForge AI Career Ecosystem</p>
        </Link>

        <div className="nav-links shell-nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}

          <Link to="/build" className="nav-btn shell-cta">
            Launch Generator
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="site-footer-brand">
          <span className="site-footer-kicker">
            <Sparkles size={14} />
            VitaForge AI Career Ecosystem
          </span>
          <h2>VitaLaunch</h2>
          <p>Premium portfolio and career presence tools designed to stay visually aligned with VitaForge AI.</p>
        </div>

        <div className="site-footer-meta">
          <p className="site-footer-label">Brand system</p>
          <p>Unified across build, templates, and portfolio output for a consistent, recruiter-ready identity.</p>
          <p className="site-footer-note">Responsive for web, Windows, and mobile with refined motion and glass surfaces.</p>
        </div>
      </footer>
    </div>
  );
}