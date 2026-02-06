import { Link } from 'react-router';
import userProfile1 from 'src/assets/images/music/s1.jpg';
import userProfile2 from 'src/assets/images/music/s2.jpg';
import userProfile3 from 'src/assets/images/music/s3.jpg';
import userProfile4 from 'src/assets/images/music/s4.jpg';
import { Card } from 'src/components/ui/card';

export const FavouriteArtists = () => {
  const Artists = [
    {
      key: 'artist1',
      profile: userProfile1,
    },
    {
      key: 'artist2',
      profile: userProfile2,
    },
    {
      key: 'artist3',
      profile: userProfile3,
    },
    {
      key: 'artist4',
      profile: userProfile4,
    },
    {
      key: 'artist5',
      profile: userProfile1,
    },
  ];
  return (
    <Card>
      <div className="mb-6">
        <h6 className="card-title">Favourite Artists</h6>
        <p className="card-subtitle">The iconic music of princep</p>
      </div>
      <div className="flex gap-4 lg:justify-start sm:justify-between flex-wrap">
        {Artists.map((item) => {
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
