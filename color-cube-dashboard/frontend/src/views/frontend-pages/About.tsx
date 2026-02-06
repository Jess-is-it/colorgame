import { HeroSection } from 'src/components/frontend-pages/aboutpage/herosection/HeroSection';
import { Metrics } from 'src/components/frontend-pages/aboutpage/metrics/Metrics';
import { Process } from 'src/components/frontend-pages/aboutpage/process/Process';
import { FeatureBanner } from 'src/components/frontend-pages/homepage/feature-banner/FeatureBanner';
import { InfoStrip } from 'src/components/frontend-pages/homepage/info-strip/InfoStrip';
import { Leadership } from 'src/components/frontend-pages/homepage/leadership/Leadership';
import { Licenseuse } from 'src/components/frontend-pages/homepage/licenseuse/Licenseuse';
import { Testimonials } from 'src/components/frontend-pages/homepage/testimonials/Testimonials';

const About = () => {
  return (
    <>
      <HeroSection />
      <Process />
      <Metrics />
      <Leadership />
      <InfoStrip />
      <Testimonials />
      <Licenseuse />
      <FeatureBanner />
    </>
  );
};

export default About;
