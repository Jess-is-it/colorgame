import { Link } from 'react-router';
import * as AppsData from 'src/layouts/full/vertical/header/data';
import Quicklinks from 'src/layouts/full/vertical/header/Quicklinks';
import { Button } from 'src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from 'src/components/ui/dropdown-menu';
import { IconChevronDown, IconHelp } from '@tabler/icons-react';

const PagesMenu = () => {
  return (
    <div className="relative group/menu">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="!py-2 px-4 text-base text-ld hover:text-primary hover:bg-lightprimary rounded-md flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            Pages <IconChevronDown className="ms-1" size={15} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[900px] p-0 border border-border dark:border-darkborder mt-2"
          align="center"
        >
          <div className="grid grid-cols-12 w-full">
            <div className="xl:col-span-8 col-span-12 flex items-stretch xl:pr-0 px-5 py-5">
              <div className="grid grid-cols-12 gap-3 w-full">
                {AppsData.appsLink.map((links, index) => (
                  <div className="col-span-12 xl:col-span-6 flex items-stretch" key={index}>
                    <ul>
                      <li>
                        <Link
                          to={links.href}
                          className="flex gap-3 items-center hover:text-primary group relative"
                        >
                          <span className="bg-lightprimary h-10 w-10 flex justify-center items-center rounded-md">
                            <img src={links.avatar} width={20} height={20} alt="tailwindadmin" />
                          </span>
                          <div>
                            <h6 className="font-semibold text-sm text-ld hover:text-primary mb-1">
                              {links.title}
                            </h6>
                            <p className="text-xs text-link dark:text-darklink opacity-90 font-medium">
                              {links.subtext}
                            </p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
                <div className="col-span-12 md:col-span-12 border-t border-border dark:border-darkborder hidden xl:flex items-stretch pt-4 pr-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center text-dark dark:text-darklink">
                      <i className="ti ti-help text-lg"></i>
                      <Link
                        to={'/theme-pages/faq'}
                        className="text-sm font-semibold hover:text-primary ml-2 flex gap-2 items-center"
                      >
                        <IconHelp width={20} />
                        Frequently Asked Questions
                      </Link>
                    </div>
                    <Button>Check</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-4 col-span-12 flex items-stretch">
              <Quicklinks />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PagesMenu;
