import "./Styling/NeonForge.css";
import PortfolioTemplateShell from "./PortfolioTemplateShell";

export default function NeonForge({ profile, portfolioData }) {
	return (
		<div className="neonforge">
			<div className="neon-grid neon-bg"></div>
			<PortfolioTemplateShell
				templateLabel="NeonForge"
				templateTone="Bold and futuristic"
				templateDescription="A cyberpunk-inspired AI interface with neon borders, holographic surfaces, and immersive grids."
				profile={profile}
				portfolioData={portfolioData}
				themeClass="template-theme-neon"
			/>
		</div>
	);
}
