import "./Styling/NovaDev.css";
import PortfolioTemplateShell from "./PortfolioTemplateShell";

export default function NovaDev({ profile, portfolioData }) {
	return (
		<div className="novadev">
			<div className="nova-glow nova-glow-1"></div>
			<div className="nova-glow nova-glow-2"></div>
			<PortfolioTemplateShell
				templateLabel="NovaDev"
				templateTone="High-performance and technical"
				templateDescription="A cinematic dark portfolio with dashboard-style glass panels and futuristic motion."
				profile={profile}
				portfolioData={portfolioData}
				themeClass="template-theme-nova"
			/>
		</div>
	);
}
