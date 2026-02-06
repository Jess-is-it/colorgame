import { UserDataProvider } from 'src/context/userdata-context/index';
import Introduction from 'src/components/apps/userprofile/profile/Introduction';
import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import Photos from 'src/components/apps/userprofile/profile/Photos';
import Post from 'src/components/apps/userprofile/profile/Post';

const UserProfileApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="grid grid-cols-12 gap-6">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="grid grid-cols-12">
              {/* Introduction */}
              <div className="col-span-12 mb-7">
                <Introduction />
              </div>
              {/* Photos */}
              <div className="col-span-12">
                <Photos />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <Post />
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default UserProfileApp;
