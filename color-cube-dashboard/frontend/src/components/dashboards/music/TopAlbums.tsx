import { Icon } from '@iconify/react/dist/iconify.js';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import album1 from 'src/assets/images/music/top10-1.jpg';
import album2 from 'src/assets/images/music/top10-2.jpg';
import album3 from 'src/assets/images/music/top10-3.jpg';
import { Card } from 'src/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';

export const TopAlbums = () => {
  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="card-title">Top 10 from this week</h6>
            <p className="card-subtitle">Based on your preferences</p>
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
        <SimpleBar style={{ maxHeight: 450 }}>
          <div className="flex flex-col gap-6">
            <div className="rounded-md overflow-hidden">
              <img src={album1} className="hover:scale-[1.03] duration-300" alt="album1" />
            </div>
            <div className="rounded-md overflow-hidden">
              <img src={album2} className="hover:scale-[1.03] duration-300" alt="album2" />
            </div>
            <div className="rounded-md overflow-hidden">
              <img src={album3} className="hover:scale-[1.03] duration-300" alt="album3" />
            </div>
          </div>
        </SimpleBar>
      </div>
    </Card>
  );
};
