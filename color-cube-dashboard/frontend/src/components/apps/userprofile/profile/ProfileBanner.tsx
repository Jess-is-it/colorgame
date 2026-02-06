import { Link } from 'react-router';
import ProfileTab from './ProfileTab';
import user1 from 'src/assets/images/profile/user-1.jpg';
import Banner from 'src/assets/images/backgrounds/profilebg.jpg';
import { Card } from 'src/components/ui/card';
import { Button } from "src/components/ui/button";
import {
  TbBrandDribbble,
  TbBrandFacebook,
  TbBrandYoutube,
  TbFileDescription,
  TbUserCheck,
  TbUserCircle,
} from 'react-icons/tb';

const ProfileBanner = () => {
  return (
    <>
      <Card className="p-0 overflow-hidden">
        <img src={Banner} alt="priofile banner" className="w-full" height={330} />
        <div className="bg-white dark:bg-dark p-6 -mt-2">
          <div className="grid grid-cols-12 gap-3">
            <div className="lg:col-span-4 col-span-12 lg:order-1 order-2">
              <div className="flex gap-6 items-center justify-around lg:py-0 py-4">
                <div className="text-center">
                  <TbFileDescription className="block mx-auto text-ld opacity-50 " size="20" />
                  <h4 className="text-xl">938</h4>
                  <p className="text-darklink text-sm">Posts</p>
                </div>
                <div className="text-center">
                  <TbUserCircle className="block mx-auto text-ld opacity-50" size="20" />
                  <h4 className="text-xl">3,586</h4>
                  <p className="text-darklink text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <TbUserCheck className="block mx-auto text-ld opacity-50" size="20" />
                  <h4 className="text-xl">2,659</h4>
                  <p className="text-darklink text-sm">Following</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:order-2 order-1">
              <div className="text-center -mt-20 ">
                <div className="w-[110px] h-[110px] linear-gradient rounded-full flex justify-center items-center mx-auto">
                  <img
                    src={user1}
                    alt="profile"
                    height="100"
                    width="100"
                    className="rounded-full mx-auto border-4 border-white dark:border-darkborder"
                  />
                </div>
                <h5 className="text-lg mt-3"> Mathew Anderson</h5>
                <p className="text-darklink">Designer</p>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:order-3 order-3">
              <div className="flex items-center gap-3.5 lg:justify-end justify-center h-full xl:pe-4">
                <Button className="h-9 w-9 rounded-full p-0" asChild>
                  <Link to={''}>
                    <TbBrandFacebook size={20} />
                  </Link>
                </Button>
                <Button className="h-9 w-9 rounded-full p-0" variant={'secondary'} asChild>
                  <Link to={""}>
                    <TbBrandDribbble size={20} />
                  </Link>
                </Button>
                <Button className="h-9 w-9 rounded-full p-0" variant={'error'} asChild>
                  <Link to={""}>
                    <TbBrandYoutube size={20} />
                  </Link>
                </Button>
                <Button className="rounded-md">Add To Story</Button>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Tabs */}
        <ProfileTab />
      </Card>
    </>
  );
};

export default ProfileBanner;
