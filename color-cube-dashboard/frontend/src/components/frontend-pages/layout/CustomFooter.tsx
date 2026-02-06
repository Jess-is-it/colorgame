import { Link } from 'react-router';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';
import logo from 'src/assets/images/logos/logo-icon.svg';
import facebook from 'src/assets/images/frontend-pages/svgs/facebook.svg';
import instagram from 'src/assets/images/frontend-pages/svgs/instagram.svg';
import twitter from 'src/assets/images/frontend-pages/svgs/twitter.svg';

export const CustomFooter = () => {
  const navLinks1 = [
    {
      key: "link1",
      title: "Pricing",
      link: "/theme-pages/pricing",
    },
    {
      key: "link2",
      title: "Account Settings",
      link: "/theme-pages/account-settings",
    },
    {
      key: "link3",
      title: "FAQ",
      link: "/theme-pages/faq",
    },
    {
      key: "link4",
      title: "Casl",
      link: "/theme-pages/casl",
    },
  ];
  const navLinks2 = [
    {
      key: "link1",
      title: "Cards",
      link: "https://tailwind-admin.com/ui-blocks#uiBlockCard",
    },
    {
      key: "link2",
      title: "Banners",
      link: "https://tailwind-admin.com/ui-blocks#uiBlockBanner",
    },
    {
      key: "link3",
      title: "Charts",
      link: "https://tailwind-admin.com/ui-blocks#uiBlockChart",
    },
  ];
  const navLinks3 = [
    {
      key: 'link1',
      title: 'Form Layouts',
      link: '/forms/form-layouts',
    },
    {
      key: 'link2',
      title: 'Tables',
      link: '/tables/basic',
    },
    {
      key: 'link3',
      title: 'React Table',
      link: '/react-tables/basic',
    },
    {
      key: "link4",
      title: "Autocomplete",
      link: "/forms/form-autocomplete",
    },
    {
      key: "link5",
      title: "Validation",
      link: "/forms/form-validation",
    },
  ];
  return (
    <>
      <div className="container-md px-4 lg:py-24 py-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-3 sm:col-span-6 col-span-12">
            <h4 className="text-lg text-link dark:text-white font-semibold mb-8">
              Company and team
            </h4>
            <div className="flex flex-col gap-4">
              {navLinks1.map((item) => {
                return (
                  <Link
                    key={item.key}
                    to={item.link}
                    className="text-sm font-medium text-lightmuted hover:text-primary dark:text-darklink dark:hover:text-primary w-fit"
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-3 sm:col-span-6 col-span-12">
            <h4 className="text-lg text-link dark:text-white font-semibold mb-8">Features</h4>
            <div className="flex flex-col gap-4">
              {navLinks2.map((item) => {
                return (
                  <Link
                    key={item.key}
                    to={item.link}
                    target="_blank"
                    className="text-sm font-medium text-lightmuted hover:text-primary dark:text-darklink dark:hover:text-primary w-fit"
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-3 sm:col-span-6 col-span-12">
            <h4 className="text-lg text-link dark:text-white font-semibold mb-8">Resources</h4>
            <div className="flex flex-col gap-4">
              {navLinks3.map((item) => {
                return (
                  <Link
                    key={item.key}
                    to={item.link}
                    className="text-sm font-medium text-lightmuted hover:text-primary dark:text-darklink dark:hover:text-primary w-fit"
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-3 sm:col-span-6 col-span-12">
            <h4 className="text-lg text-link dark:text-white font-semibold mb-8">Followers</h4>
            <div className="flex items-center gap-5">
              <TooltipProvider>
                {/*  */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img src={facebook} alt="social-icon" className="shrink-0 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Facebook</p>
                  </TooltipContent>
                </Tooltip>
                {/*  */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img src={twitter} alt="social-icon" className="shrink-0 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter</p>
                  </TooltipContent>
                </Tooltip>
                {/*  */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img src={instagram} alt="social-icon" className="shrink-0 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram</p>
                  </TooltipContent>
                </Tooltip>
                {/*  */}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
      <div className="container-md px-4 py-10 border-t border-border dark:border-darkborder">
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex items-center gap-4">
            <img src={logo} alt="logo" height={24} />
            <p className="text-base text-lightmuted dark:text-darklink">
              All rights reserved by TailwindAdmin.
            </p>
          </div>
          <p className="text-base text-lightmuted dark:text-darklink flex items-center gap-1">
            Produced by{' '}
            <Link className="text-primary" to="https://tailwind-admin.com/" target='_blank'>
              Tailwind Admin
            </Link>{' '}
          </p>
        </div>
      </div>
    </>
  );
};
