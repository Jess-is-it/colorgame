import { Icon } from '@iconify/react/dist/iconify.js';
import album1 from 'src/assets/images/music/album1.jpg';
import album2 from 'src/assets/images/music/album2.jpg';
import album3 from 'src/assets/images/music/album3.jpg';
import album4 from 'src/assets/images/music/album4.jpg';
import { Badge } from 'src/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import { Card } from 'src/components/ui/card';
import { useState } from 'react';
import AnimatedSlider from 'src/components/animated-component/AnimatedSlider';

export const RecentSearch = () => {
  const [isPlay, setIsPlay] = useState(false);

  const Albums = [
    {
      key: 'music1',
      album: album1,
      title: 'Viva Las',
    },
    {
      key: 'music2',
      album: album2,
      title: 'As it was',
    },
    {
      key: 'music3',
      album: album3,
      title: 'Redtape Anthem',
    },
    {
      key: 'music4',
      album: album4,
      title: 'Viva Las',
    },
    {
      key: 'music5',
      album: album1,
      title: 'Viva Las',
    },
  ];
  return (
    <Card className="h-full flex flex-col justify-between gap-6">
      <div className="">
        <h6 className="card-title">Recent Search</h6>
        <p className="card-subtitle">What's next in the world of search?</p>
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <Badge variant="lightPrimary" className="py-1.5 custome-badge">
          <span className="text-sm me-3">Shiela On7</span>
          <Icon icon="tabler:square-x" className="text-sm" />
        </Badge>
        <Badge variant="lightError" className="py-1.5 custome-badge">
          <span className="text-sm me-3">Denny Caknan</span>
          <Icon icon="tabler:square-x" className="text-sm" />
        </Badge>
      </div>
      <Card className="bg-lightprimary dark:bg-lightprimary">
        <img src={album3} alt="album" className="rounded-md mx-auto" />
        <h5 className="my-4 text-lg text-center">Party Anthemes</h5>
        <div className="flex justify-center items-center gap-7">
          <Icon
            icon="tabler:repeat"
            className="text-base opacity-70 cursor-pointer hover:text-primary"
          />
          <Icon
            icon="tabler:chevrons-left"
            className="text-base opacity-70 cursor-pointer hover:text-primary"
          />
          <button onClick={() => setIsPlay((prev) => !prev)}>
            <Icon
              icon={isPlay ? 'tabler:pause' : 'tabler:player-play'}
              className="text-base text-primary cursor-pointer hover:text-primary"
            />
          </button>
          <Icon
            icon="tabler:chevrons-right"
            className="text-base opacity-70 cursor-pointer hover:text-primary"
          />
          <Icon
            icon="tabler:arrows-shuffle"
            className="text-base opacity-70 cursor-pointer hover:text-primary"
          />
        </div>
        <div className="my-2 flex justify-center">
          <AnimatedSlider
            defaultValue={25}
            min={0}
            max={200}
            step={5}
            color="var(--color-primary)"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-70">00:00</span>
          <Icon icon="tabler:volume-3" className="text-base" />
          <span className="text-sm opacity-70">01:10</span>
        </div>
        <div className="mt-7">
          {Albums.map((item) => {
            return (
              <div
                key={item.key}
                className="p-4 py-[17px] hover:bg-lightprimary rounded-md overflow-hidden cursor-pointer border-b last:border-b-0 border-border dark:border-darkborder"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <img src={item.album} alt="album" className="h-11 w-11 rounded-md" />
                    <div>
                      <h6 className="text-sm font-medium mb-1 max-w-20 truncate">{item.title}</h6>
                      <p className="text-xs">{item.title}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Icon
                        icon="tabler:dots-vertical"
                        className="text-muted dark:text-darklink hover:text-primary dark:hover:text-primary text-lg shrink-0 cursor-pointer"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left" align="start">
                      <DropdownMenuItem>
                        <div className="flex gap-2 items-center text-muted dark:text-darklink">
                          <Icon icon="tabler:share" className="text-base" />
                          Share
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex gap-2 items-center text-muted dark:text-darklink">
                          <Icon icon="tabler:download" className="text-base" />
                          Download
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex gap-2 items-center text-muted dark:text-darklink">
                          <Icon icon="tabler:playlist" className="text-base" />
                          Add to queue
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </Card>
  );
};
