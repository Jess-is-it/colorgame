import ContactForm from 'src/components/frontend-pages/contact/contact-form/ContactForm';
import ContactMap from 'src/components/frontend-pages/contact/contact-map/ContactMap';
import { HeroSection } from 'src/components/frontend-pages/contact/hero-section/HeroSection';
import { FeatureBanner } from 'src/components/frontend-pages/homepage/feature-banner/FeatureBanner';

const Contact = () => {
  return (
    <>
      <HeroSection />
      <ContactMap />
      <ContactForm />
      <FeatureBanner />
    </>
  );
};

export default Contact;
