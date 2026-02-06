import { useContext } from 'react';
import { UserDataContext, UserDataContextType } from 'src/context/userdata-context/index';
import { Icon } from '@iconify/react';
import { Card } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import InputPlaceholderAnimate from 'src/components/animated-component/AnimatedInputPlaceholder';

const FollowerCard = () => {
  const { followers, toggleFollow, search, setSearch } = useContext(UserDataContext);
  useContext(UserDataContext) as UserDataContextType;
  return (
    <>
      <div className="md:flex justify-between mb-6">
        <h5 className="text-2xl flex gap-3 items-center sm:my-0 my-4">
          Followers{' '}
          <Badge color={'secondary'} className="rounded-md">
            {followers.length}
          </Badge>
        </h5>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon icon="solar:magnifer-line-duotone" height={18} />
          </span>
          <InputPlaceholderAnimate
            value={search}
            onChange={setSearch}
            placeholders={['Search followers...', 'Find followers...', 'Look up followers...']}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {followers.map((profile) => {
          return (
            <div className="lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12" key={profile.id}>
              <Card>
                <div className="flex gap-3">
                  <Avatar className="shrink-0">
                    <AvatarImage src={profile.avatar} alt={String(profile.name)} />
                    <AvatarFallback>{String(profile.name).charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h6 className="text-base">{profile.name}</h6>
                    <p className="flex gap-1 items-center mt-0.5">
                      <Icon icon="solar:map-point-outline" height="14" />{' '}
                      <span className=" truncat line-clamp-1 text-wrap text-darklink">
                        {profile.country}
                      </span>
                    </p>
                  </div>
                  <div className="ms-auto">
                    {profile.isFollowed ? (
                      <Button onClick={() => toggleFollow(profile.id)}>Followed</Button>
                    ) : (
                      <Button variant={'outline'} onClick={() => toggleFollow(profile.id)}>
                        Follow
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FollowerCard;
