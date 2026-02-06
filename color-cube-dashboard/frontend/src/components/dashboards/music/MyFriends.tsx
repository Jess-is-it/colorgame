import userProfile1 from 'src/assets/images/profile/user-5.jpg';
import userProfile2 from 'src/assets/images/profile/user-2.jpg';
import userProfile3 from 'src/assets/images/profile/user-3.jpg';
import userProfile4 from 'src/assets/images/profile/user-4.jpg';
import { Card } from 'src/components/ui/card';
import { Link } from 'react-router';

export const MyFriends = () => {
  const Friends = [
    {
      key: 'friend1',
      profile: userProfile1,
    },
    {
      key: 'friend2',
      profile: userProfile2,
    },
    {
      key: 'friend3',
      profile: userProfile3,
    },
    {
      key: 'friend4',
      profile: userProfile4,
    },
    {
      key: 'friend5',
      profile: userProfile1,
    },
  ];
  return (
    <Card>
      <div className="mb-6">
        <h6 className="card-title">My Friends</h6>
        <p className="card-subtitle">The power of friendship</p>
      </div>
      <div className="flex gap-4 lg:justify-start sm:justify-between flex-wrap">
        {Friends.map((item) => {
          return (
            <Link to="#">
              <img
                key={item.key}
                src={item.profile}
                width={67}
                alt="profile-image"
                className="rounded-md hover:scale-[1.03] duration-300"
              />
            </Link>
          );
        })}
      </div>
    </Card>
  );
};
