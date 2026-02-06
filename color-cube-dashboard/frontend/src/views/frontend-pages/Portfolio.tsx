import { HeroSection } from 'src/components/frontend-pages/shared/HeroSection';
import { FeatureBanner } from 'src/components/frontend-pages/homepage/feature-banner/FeatureBanner';
import PortfolioApp from 'src/components/frontend-pages/portfolio';

const Portfolio = () => {
  return (
    <>
      <HeroSection title="Portfolio" desc="Explore Our Latest Works" />
      <PortfolioApp />
      <FeatureBanner />
    </>
  );
};

export default Portfolio;
