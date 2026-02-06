import React, { useContext } from 'react';

import SidebarData from './sidebaritems';
import NavItems from './nav-items';
import NavCollapse from './nav-collapse';
import SimpleBar from 'simplebar-react';
import { CustomizerContext } from 'src/context/CustomizerContext';

import { Icon } from '@iconify/react/dist/iconify.js';
import FullLogo from '../../shared/logo/FullLogo';
import { useNavigate } from 'react-router';
import profileimg from 'src/assets/images/profile/user-1.jpg';
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/ui/tooltip';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from 'src/components/ui/sidebar';

const SidebarLayout = () => {
  const { isCollapse } = useContext(CustomizerContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex">
        <Sidebar className="fixed menu-sidebar !bg-white dark:bg-dark z-[3] border-ld">
          <SidebarHeader className="p-0">
            <div
              className={`${
                isCollapse === 'full-sidebar' ? 'px-6' : 'px-5'
              } flex items-center brand-logo overflow-hidden`}
            >
              <FullLogo />
            </div>
          </SidebarHeader>

          <SimpleBar className="h-[calc(100vh_-_180px)]">
            <SidebarContent className={`${isCollapse === 'full-sidebar' ? 'px-6' : 'px-4'}`}>
              <SidebarGroup className="sidebar-nav p-0">
                {SidebarData.map((item, index) => (
                  <React.Fragment key={index}>
                    <SidebarGroupLabel className="px-0 caption">
                      <h5 className="text-link font-bold text-xs dark:text-darklink ">
                        <span className="hide-menu leading-21">{item.heading?.toUpperCase()}</span>
                        <Icon
                          icon="tabler:dots"
                          className="text-ld   leading-6 dark:text-opacity-60 hide-icon mx-2.5 md:block hidden"
                          height={18}
                        />
                      </h5>
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                      <SidebarMenu className="gap-0.5">
                        {item.children?.map((child, index) => (
                          <React.Fragment key={child.id && index}>
                            {child.children ? (
                              <div className="collpase-items">
                                <NavCollapse item={child} />
                              </div>
                            ) : (
                              <NavItems item={child} />
                            )}
                          </React.Fragment>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </React.Fragment>
                ))}
              </SidebarGroup>
            </SidebarContent>
          </SimpleBar>
          {/* Sidebar Profile */}
          <SidebarFooter>
            <div className={` my-4 ${isCollapse === 'full-sidebar' ? 'mx-6' : 'mx-0.5'}`}>
              <div
                className={` py-4 ${
                  isCollapse === 'full-sidebar' ? 'px-4' : 'px-2'
                } bg-lightsecondary rounded-md overflow-hidden`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img
                      src={profileimg}
                      alt="profile-image"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-base font-semibold">Mathew</h3>
                      <p className="text-xs font-normal text-muted dark:text-darklink">Designer</p>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-pointer" onClick={() => navigate('/auth/auth1/login')}>
                        <Icon icon="tabler:power" className="text-primary text-2xl" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarLayout;
