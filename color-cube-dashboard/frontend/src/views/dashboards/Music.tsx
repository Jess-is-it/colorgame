import { FavouriteArtists } from 'src/components/dashboards/music/FavouriteArtists';
import { FollowArtists } from 'src/components/dashboards/music/FollowArtists';
import { MostPopular } from 'src/components/dashboards/music/MostPopular';
import { MyFriends } from 'src/components/dashboards/music/MyFriends';
import { RecentlyPlayed } from 'src/components/dashboards/music/RecentlyPlayed';
import { RecentSearch } from 'src/components/dashboards/music/RecentSearch';
import { TopAlbums } from 'src/components/dashboards/music/TopAlbums';
import { TopPlaylists } from 'src/components/dashboards/music/TopPlaylists';

const Music = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 col-span-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <FollowArtists />
            </div>
            <div className="col-span-12">
              <RecentlyPlayed />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <MyFriends />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <FavouriteArtists />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <RecentSearch />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <TopAlbums />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <TopPlaylists />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <MostPopular />
        </div>
      </div>
    </>
  );
};

export default Music;
