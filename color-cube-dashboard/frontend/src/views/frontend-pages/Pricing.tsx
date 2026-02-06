import { HeroSection } from 'src/components/frontend-pages/shared/HeroSection';
import { FeatureBanner } from 'src/components/frontend-pages/homepage/feature-banner/FeatureBanner';
import { Licenseuse } from 'src/components/frontend-pages/homepage/licenseuse/Licenseuse';

const Pricing = () => {
  return (
    <>
      <HeroSection title="Pricing Page" desc="Choose Your Plan" />
      <Licenseuse />
      <FeatureBanner />
    </>
  );
};

export default Pricing;
