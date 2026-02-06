import album1 from 'src/assets/images/music/album1.jpg';
import album2 from 'src/assets/images/music/album2.jpg';
import album3 from 'src/assets/images/music/album3.jpg';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { Card } from 'src/components/ui/card';
import AnimatedItem from 'src/components/animated-component/ListAnimation';

export const MostPopular = () => {
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const TrendingSongs = [
    {
      key: 'trendingSong1',
      album: album1,
    },
    {
      key: 'trendingSong2',
      album: album2,
    },
    {
      key: 'trendingSong3',
      album: album3,
    },
  ];

  const togglePlay = (key: string) => {
    setPlayingKey((prevKey) => (prevKey === key ? null : key)); // Toggle logic
  };
  return (
    <Card className="h-full">
      <div className="flex flex-col gap-6">
        <div>
          <h6 className="card-title">Most Popular this week</h6>
          <p className="card-subtitle">Based on your preferences</p>
        </div>
        <div className="flex flex-col space-y-6">
          {TrendingSongs.map((item, index) => {
            const isPlaying = playingKey === item.key;
            return (
              <div
                className="p-4 rounded-md border border-border dark:border-darkborder hover:bg-lightprimary group"
                key={item.key}
              >
                <AnimatedItem key={index} index={index}>
                  <div className="flex items-center gap-3">
                    <div className="img-wrapper shrink-0 relative">
                      <div className="overflow-hidden rounded-md">
                        <img
                          src={item.album}
                          width={97}
                          alt="album-image"
                          className="group-hover:scale-[1.03] duration-300"
                        />
                      </div>
                      <div
                        onClick={() => togglePlay(item.key)}
                        className="h-11 w-11 rounded-full bg-primary hover:bg-primaryemphasis flex cursor-pointer items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        {/* <Icon icon="tabler:player-play" className="text-white text-lg shrink-0" /> */}
                        <Icon
                          icon={isPlaying ? 'solar:pause-linear' : 'solar:play-linear'}
                          className="text-white text-lg shrink-0"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h5 className="text-lg leading-none">Trending Songs</h5>
                      <p className="text-sm truncate xl:max-w-40 lg:max-w-28 sm:max-w-full max-w-28">
                        Top trending hits, refreshemnt
                      </p>
                      <p className="text-xs">Created by Gaana</p>
                    </div>
                  </div>
                </AnimatedItem>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
