import { UserDataProvider } from 'src/context/userdata-context/index';
import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import GalleryCards from 'src/components/apps/userprofile/gallery/GalleryCards';

const GalleryApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="grid grid-cols-12 gap-6">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          {/* GalleryCards */}
          <div className="col-span-12">
            <GalleryCards />
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default GalleryApp;
