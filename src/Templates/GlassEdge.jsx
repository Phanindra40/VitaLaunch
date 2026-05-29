import "./Styling/GlassEdge.css";
import PortfolioTemplateShell from "./PortfolioTemplateShell";

export default function GlassEdge({ profile, portfolioData }) {
	return (
		<div className="glassedge">
			<PortfolioTemplateShell
				templateLabel="GlassEdge"
				templateTone="Premium and polished"
				templateDescription="Elegant translucency with refined spacing and luxury SaaS styling."
				profile={profile}
				portfolioData={portfolioData}
				themeClass="template-theme-glass"
			/>
		</div>
	);
}
