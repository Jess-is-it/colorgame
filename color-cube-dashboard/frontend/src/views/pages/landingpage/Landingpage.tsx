import { useEffect } from 'react';
import LpHeader from 'src/components/landingpage/header/Header';
import LpBanners from 'src/components/landingpage/banner/banner';
import ProductDemos from 'src/components/landingpage/product-demos/Demos';
import AllFeatures from 'src/components/landingpage/features/AllFeatures';
import ClientReviews from 'src/components/landingpage/reviews/ClientReviews';
import Ticket from 'src/components/landingpage/ticket/Ticket';
import Footer from 'src/components/landingpage/footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Development from 'src/components/landingpage/animation/Development';
import LoginReg from 'src/components/landingpage/login/LoginReg';

const Landingpage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <main>
        <div className="landingpage">
          <LpHeader />
          <LpBanners />
          <ProductDemos />
          <Development />
          <ClientReviews />
          <AllFeatures />
          <Ticket />
          <LoginReg />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Landingpage;
