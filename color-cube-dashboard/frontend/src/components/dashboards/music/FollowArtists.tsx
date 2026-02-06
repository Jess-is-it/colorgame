import s1 from 'src/assets/images/music/s1.jpg';
import s2 from 'src/assets/images/music/s2.jpg';
import s3 from 'src/assets/images/music/s3.jpg';
import s4 from 'src/assets/images/music/s4.jpg';
import { Card } from 'src/components/ui/card';

export const FollowArtists = () => {
  const Artists = [
    {
      key: 'artist1',
      profile: s1,
      name: 'Dualia',
    },
    {
      key: 'artist2',
      profile: s2,
      name: 'John',
    },
    {
      key: 'artist3',
      profile: s3,
      name: 'Smith',
    },
    {
      key: 'artist4',
      profile: s4,
      name: 'Sia',
    },
    {
      key: 'artist5',
      profile: s1,
      name: 'Adele',
    },
    {
      key: 'artist6',
      profile: s2,
      name: 'Dualia',
    },
    {
      key: 'artist7',
      profile: s3,
      name: 'Sia',
    },
    {
      key: 'artist8',
      profile: s4,
      name: 'Kathy',
    },
    {
      key: 'artist9',
      profile: s1,
      name: 'Dualia',
    },
    {
      key: 'artist10',
      profile: s2,
      name: 'John',
    },
  ];
  return (
    <Card>
      <div className="mb-6">
        <h6 className="card-title">Follow Artists</h6>
        <p className="card-subtitle">Tips for following local artists</p>
      </div>
      <div className="flex items-center gap-5 overflow-x-auto">
        {Artists.map((item) => {
          return (
            <div key={item.key} className="cursor-pointer group shrink-0">
              <div
                className='p-1 border-2 border-ld group-hover:border-primary box-content rounded-full'
              >
                <img
                  src={item.profile}
                  alt="music-profile"
                  className="w-14 h-14 rounded-full group-hover:scale-105 duration-300"
                />
              </div>
              <p className="mt-1 text-center">{item.name}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
