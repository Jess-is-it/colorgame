import { Outlet } from 'react-router';
import { AnnouncementBar } from 'src/components/frontend-pages/layout/header/AnnouncementBar';
import Header from 'src/components/frontend-pages/layout/header/Header';
import { CustomFooter } from 'src/components/frontend-pages/layout/CustomFooter';
import ScrollToTop from 'src/components/shared/ScrollToTop';

const FrontendLayout = () => (
  <>
    <div className="frontend-page">
      <AnnouncementBar />
      <Header />
      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
      <CustomFooter />
    </div>
  </>
);

export default FrontendLayout;
