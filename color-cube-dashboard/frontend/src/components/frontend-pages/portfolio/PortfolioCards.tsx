import React, { useContext } from 'react';

import { TbDotsVertical } from 'react-icons/tb';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import CardBox from 'src/components/shared/CardBox';
import { UserDataContext } from 'src/context/userdata-context';
import { Badge } from 'src/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import { Input } from 'src/components/ui/input';
import { GallaryType } from 'src/types/apps/users';

const PortfolioCards = () => {
  const { gallery } = useContext(UserDataContext);

  const [search, setSearchLocal] = React.useState('');

  const filterPhotos = (photos: GallaryType[], cSearch: string) => {
    if (photos)
      return photos.filter((t: { name: string }) =>
        t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()),
      );
    return photos;
  };

  const getPhotos = filterPhotos(gallery, search);

  return (
    <>
      <div className="md:flex justify-between mb-6">
        <h5 className="text-2xl flex gap-3 items-center sm:my-0 my-4">
          Portfolio <Badge variant={'secondary'}>{getPhotos.length}</Badge>
        </h5>
        <div className="relative">
          <Icon
            icon="solar:minimalistic-magnifer-linear"
            width={18}
            height={18}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <Input
            type="text"
            placeholder="Search Portfolio"
            className="max-w-[210px] pl-10"
            onChange={(e) => setSearchLocal(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {getPhotos.map((photo) => {
          return (
            <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12" key={photo.id}>
              <CardBox className="overflow-hidden p-0 card-hover">
                <div className="h-[220px]  overflow-hidden">
                  <img
                    src={photo.cover}
                    height={220}
                    width={500}
                    alt="gllery"
                    className="object-center object-cover h-full"
                  />
                </div>
                <div className="pt-4 p-6 flex">
                  <div>
                    <h6 className="text-sm">{photo.name}jpg</h6>
                    <p className="text-xs font-medium text-darklink">
                      {' '}
                      {format(new Date(photo.time), 'E, MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="ms-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                          <TbDotsVertical size={22} />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>{photo.name}.jpg</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardBox>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PortfolioCards;
