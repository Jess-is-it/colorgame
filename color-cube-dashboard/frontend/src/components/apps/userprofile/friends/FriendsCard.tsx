import React, { useContext } from 'react';
import { Link } from 'react-router';
import { UserDataContext } from 'src/context/userdata-context/index';
import { TbBrandFacebook, TbBrandGithub, TbBrandInstagram, TbBrandTwitter } from 'react-icons/tb';
import { Icon } from '@iconify/react';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { Card } from 'src/components/ui/card';

const socialiconCard = [
  {
    icon: <TbBrandFacebook size={17} />,
    color: 'primary',
  },
  {
    icon: <TbBrandInstagram size={17} />,
    color: 'error',
  },
  {
    icon: <TbBrandGithub size={17} />,
    color: 'info',
  },
  {
    icon: <TbBrandTwitter size={17} />,
    color: 'secondary',
  },
];

const FriendsCard = () => {
  const { followers, setSearch } = useContext(UserDataContext);

  return (
    <>
      <div className="md:flex justify-between mb-6">
        <h5 className="text-2xl flex gap-3 items-center sm:my-0 my-4">
          Friends <Badge variant={'secondary'}>{followers.length}</Badge>
        </h5>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon icon="solar:magnifer-line-duotone" height={18} />
          </span>
          <Input
            type="text"
            placeholder="Search Friends"
            className="pl-9"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {followers.map(
          (profile: {
            id: React.Key | null | undefined;
            avatar: string | undefined;
            name:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Iterable<React.ReactNode>
              | null
              | undefined;
            role:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Iterable<React.ReactNode>
              | null
              | undefined;
          }) => {
            return (
              <div
                className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12"
                key={profile.id}
              >
                <Card className="px-0 pb-0  text-center overflow-hidden">
                  <img
                    src={profile.avatar}
                    alt="tailwindadmin"
                    className="rounded-full mx-auto"
                    height={80}
                    width={80}
                  />
                  <div>
                    <h5 className="text-lg mt-3">{profile.name}</h5>
                    <p className="text-xs text-darklink">{profile.role}</p>
                  </div>
                  <div className="flex justify-center gap-4 items-center border-t border-border dark:border-darkborder mt-4 pt-4 bg-lightgray pb-4 dark:bg-darkmuted">
                    {socialiconCard.map((soc, index) => (
                      <Link to={'#'} className={`text-${soc.color}`} key={index}>
                        {soc.icon}
                      </Link>
                    ))}
                  </div>
                </Card>
              </div>
            );
          },
        )}
      </div>
    </>
  );
};

export default FriendsCard;
