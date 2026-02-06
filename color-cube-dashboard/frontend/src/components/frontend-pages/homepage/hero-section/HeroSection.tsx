import { useState } from 'react';
import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';
import { Icon } from '@iconify/react/dist/iconify.js';
import reactimg from 'src/assets/images/frontend-pages/technology/Categories=React.svg';

import nextimg from 'src/assets/images/frontend-pages/technology/Categories=Nextjs.svg';
import typescriptimg from 'src/assets/images/frontend-pages/technology/Typescript.svg';
import tailwindimg from 'src/assets/images/frontend-pages/technology/Categories=Tailwind.svg';
import shadcnimg from 'src/assets/images/frontend-pages/technology/shadcn-icon.svg';
import leftWidget from 'src/assets/images/frontend-pages/background/banner-left-widget.jpg';
import rightWidget from 'src/assets/images/frontend-pages/background/banner-right-widget.jpg';
import bottomBanner from 'src/assets/images/frontend-pages/background/banner-bottom.png';
import leftWidgetDark from 'src/assets/images/frontend-pages/background/banner-left-widget-dark.png';
import rightWidgetDark from 'src/assets/images/frontend-pages/background/banner-right-widget-dark.png';
import bottomBannerDark from 'src/assets/images/frontend-pages/background/banner-bottom-dark.png';
import { Button } from 'src/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from 'src/components/ui/dialog';
import { Link } from 'react-router';
import AnimatedTooltip from 'src/components/animated-component/AnimatedTooltip';
import { useMotionValue } from 'framer-motion';

export const HeroSection = () => {
  const TechnStacks = [
    {
      key: 'tech1',
      img: reactimg,
      title: 'React',
    },

    {
      key: 'tech3',
      img: nextimg,
      title: 'NextJS',
    },
    {
      key: 'tech4',
      img: typescriptimg,
      title: 'Typescript',
    },
    {
      key: 'tech5',
      img: tailwindimg,
      title: 'Tailwind',
    },
    {
      key: 'tech6',
      img: shadcnimg,
      title: 'Shadcn',
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  const x = useMotionValue(0);

  return (
    <>
      <div className="lg:pt-6 pt-0 bg-lightprimary">
        <div className="container py-4 pb-0 px-4">
          <div className="flex w-full justify-center">
            <div className="md:w-8/12 w-full pt-8">
              <h1 className="lg:text-56 text-4xl leading-tight text-center font-bold text-link dark:text-white">
                Most powerful & <span className="text-primary">Developer friendly</span> Admin
                dashboard
              </h1>
            </div>
          </div>
          <div className="w-full pt-5">
            <div className="flex flex-wrap gap-6 items-center justify-center mx-auto mb-3">
              <div className="flex">
                <img
                  src={user1}
                  alt="user-image"
                  className="w-10 h-10  rounded-full border-2 border-white relative -mr-2.5 z-[2]"
                />
                <img
                  src={user2}
                  alt="user-image"
                  className="w-10 h-10  rounded-full border-2 border-white relative -mr-2.5 z-[1]"
                />
                <img
                  src={user3}
                  alt="user-image"
                  className="w-10 h-10  rounded-full border-2 border-white"
                />
              </div>
              <div className="text-lg text-bodytext dark:text-darklink font-medium text-center">
                52,589+ developers & agencies using our templates
              </div>
            </div>
            <div className="w-full relative p-3 img-wrapper">
              <div className="flex items-center justify-center gap-5 mx-auto">
                <Button asChild className="text-sm font-medium">
                  <Link to="/auth/auth1/login">Login</Link>
                </Button>
                <div
                  onClick={() => setOpenModal(true)}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full flex items-center text-primary group-hover:bg-primary group-hover:text-white justify-center border-2 border-primary">
                    <Icon icon="tabler:player-play-filled" className=" text-base" />
                  </div>
                  <p className="text-link group-hover:text-primary dark:text-darklink font-medium text-[15px]">
                    See how it works
                  </p>
                </div>
              </div>
              <div className="py-9 flex justify-center item-center gap-6 flex-wrap">
                {TechnStacks.map((item) => {
                  return (
                    <div
                      onMouseMove={(e) =>
                        x.set(e.nativeEvent.offsetX - e.currentTarget.offsetWidth / 2)
                      }
                      key={item.key}
                      className="h-14 w-14 rounded-[16px] custom-shadow bg-white dark:bg-darkgray flex items-center justify-center cursor-pointer group relative"
                    >
                      <img src={item.img} alt={'tech-icon'} width={30} height={30} />
                      <AnimatedTooltip name={item.title} x={x} className="-top-10" />
                    </div>
                  );
                })}
              </div>
              {/* left widget */}
              <div>
                <img
                  src={leftWidget}
                  alt="widget"
                  className="absolute top-0 start-0 rounded-2xl custom-shadow animated-img xl:block hidden dark:hidden"
                />
                <img
                  src={leftWidgetDark}
                  alt="widget"
                  className="absolute top-0 start-0 rounded-2xl custom-shadow animated-img xl:dark:block hidden"
                />
              </div>
              {/* right widget */}
              <div>
                <img
                  src={rightWidget}
                  alt="widget"
                  className="absolute -top-7 end-0 rounded-2xl custom-shadow animated-img xl:block hidden dark:hidden"
                />
                <img
                  src={rightWidgetDark}
                  alt="widget"
                  className="absolute -top-7 end-0 rounded-2xl custom-shadow animated-img xl:dark:block hidden"
                />
              </div>
            </div>
            <div className="mt-4">
              {/* bottom banner */}
              <div>
                <img src={bottomBanner} alt="banner-img" className="rounded-2xl dark:hidden" />
                <img
                  src={bottomBannerDark}
                  alt="banner-img"
                  className="rounded-2xl dark:block hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="p-0 max-w-3xl">
          <DialogHeader className="hidden" />
          <iframe
            className="w-full h-96 rounded-md"
            src="https://www.youtube.com/embed/57QrNWhnbxg"
            title="How to Get Started with our NextJs Dashboard Template? | AdminMart&#39;s NextJsTemplate"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
