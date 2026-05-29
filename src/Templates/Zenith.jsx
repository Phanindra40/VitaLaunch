import "./Styling/Zenith.css";
import PortfolioTemplateShell from "./PortfolioTemplateShell";

export default function Zenith({ profile, portfolioData }) {
	return (
		<div className="zenith">
			<div className="zenith-container">
				<PortfolioTemplateShell
					templateLabel="Zenith"
					templateTone="Clear and credible"
					templateDescription="A recruiter-friendly portfolio with clean hierarchy, ATS-friendly structure, and low visual noise."
					profile={profile}
					portfolioData={portfolioData}
					themeClass="template-theme-zenith"
				/>
			</div>
		</div>
	);
}
