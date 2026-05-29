import "./Styling/PixelFlow.css";
import PortfolioTemplateShell from "./PortfolioTemplateShell";

export default function PixelFlow({ profile, portfolioData }) {
	return (
		<div className="pixelflow">
			<PortfolioTemplateShell
				templateLabel="PixelFlow"
				templateTone="Playful and expressive"
				templateDescription="An experimental, motion-heavy layout for storytelling and memorable interaction."
				profile={profile}
				portfolioData={portfolioData}
				themeClass="template-theme-pixel"
			/>
		</div>
	);
}
