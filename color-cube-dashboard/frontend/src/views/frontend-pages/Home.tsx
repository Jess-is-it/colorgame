import { DemosSection } from 'src/components/frontend-pages/homepage/demos-section/DemosSection';
import { FAQ } from 'src/components/frontend-pages/homepage/faq/FAQ';
import { FeatureBanner } from 'src/components/frontend-pages/homepage/feature-banner/FeatureBanner';
import { Features } from 'src/components/frontend-pages/homepage/features/Features';
import { HeroSection } from 'src/components/frontend-pages/homepage/hero-section/HeroSection';
import { InfoStrip } from 'src/components/frontend-pages/homepage/info-strip/InfoStrip';
import { Leadership } from 'src/components/frontend-pages/homepage/leadership/Leadership';
import { Licenseuse } from 'src/components/frontend-pages/homepage/licenseuse/Licenseuse';
import { PowerfulTemplates } from 'src/components/frontend-pages/homepage/powerful-templates/PowerfulTemplates';
import { TeamWorks } from 'src/components/frontend-pages/homepage/team-works/TeamWorks';
import { Testimonials } from 'src/components/frontend-pages/homepage/testimonials/Testimonials';

const Home = () => {
  return (
    <>
      <HeroSection />
      <DemosSection />
      <TeamWorks />
      <Leadership />
      <InfoStrip />
      <PowerfulTemplates />
      <Testimonials />
      <Features />
      <Licenseuse />
      <FAQ />
      <FeatureBanner />
    </>
  );
};

export default Home;
