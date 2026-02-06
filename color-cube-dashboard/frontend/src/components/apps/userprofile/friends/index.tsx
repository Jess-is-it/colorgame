import { UserDataProvider } from 'src/context/userdata-context/index';
import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import FriendsCard from 'src/components/apps/userprofile/friends/FriendsCard';

const FriendsApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="grid grid-cols-12 gap-6">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          {/* FriendsCard */}
          <div className="col-span-12">
            <FriendsCard />
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default FriendsApp;
