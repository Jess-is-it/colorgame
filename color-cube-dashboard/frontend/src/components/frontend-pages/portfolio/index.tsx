import { UserDataProvider } from 'src/context/userdata-context';
import PortfolioCards from './PortfolioCards';

const PortfolioApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="container p-4 py-12 lg:pb-24 pb-12">
          <div className="grid grid-cols-12 gap-6">
            {/* GalleryCards */}
            <div className="col-span-12">
              {/* <GalleryCards /> */}
              <PortfolioCards />
            </div>
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default PortfolioApp;
