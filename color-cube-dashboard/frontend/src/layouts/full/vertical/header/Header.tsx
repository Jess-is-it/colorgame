import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { CustomizerContext } from 'src/context/CustomizerContext';
import Search from './Search';
import { Icon } from '@iconify/react';
import AppLinks from './AppLinks';
import Messages from './Messages';
import Profile from './Profile';
import { Language } from './Language';
import FullLogo from '../../shared/logo/FullLogo';
import MobileHeaderItems from './MobileHeaderItems';
import HorizontalMenu from '../../horizontal/header/HorizontalMenu';
import SidebarLayout from '../sidebar/Sidebar';
import { useSidebar } from 'src/components/ui/sidebar';
import { Sheet, SheetContent, SheetTitle } from 'src/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface HeaderPropsType {
  layoutType: string;
}

const Header = ({ layoutType }: HeaderPropsType) => {
  const [isSticky, setIsSticky] = useState(false);

  const { setOpenMobile, openMobile } = useSidebar();

  const { setIsCollapse, isCollapse, isLayout, setActiveMode, activeMode } =
    useContext(CustomizerContext);

  const [mobileMenu, setMobileMenu] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileMenu = () => {
    if (mobileMenu === 'active') {
      setMobileMenu('');
    } else {
      setMobileMenu('active');
    }
  };

  const toggleMode = () => {
    setActiveMode(activeMode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setOpenMobile(false);
      }
    };

    // Run on mount and whenever screen resizes
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[2] ${
          isSticky ? 'bg-white dark:bg-dark shadow-md fixed w-full' : 'bg-transparent'
        }`}
      >
        <nav
          className={`px-2 dark:border-gray-700 rounded-none bg-transparent dark:bg-transparent py-4 sm:px-6 ${
            layoutType == 'horizontal' ? 'container mx-auto' : ''
          }  ${isLayout == 'full' ? '!max-w-full' : ''}`}
        >
          <div className="mx-auto flex flex-wrap items-center justify-between">
            <span
              onClick={() => setOpenMobile(!openMobile)}
              className="px-[15px] hover:text-primary dark:hover:text-primary text-link dark:text-darklink relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent rounded-full xl:hidden flex justify-center items-center cursor-pointer"
            >
              <Icon icon="tabler:menu-2" height={20} />
            </span>

            {/* Toggle Icon   */}
            <div className="xl:!block !hidden">
              <div className="flex gap-0 items-center relative">
                {layoutType == 'horizontal' ? (
                  <div className="me-3">
                    <FullLogo />
                  </div>
                ) : null}

                {layoutType != 'horizontal' ? (
                  <span
                    onClick={() => {
                      if (isCollapse === 'full-sidebar') {
                        setIsCollapse('mini-sidebar');
                      } else {
                        setIsCollapse('full-sidebar');
                      }
                    }}
                    className="px-[15px] relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent text-link hover:text-primary dark:text-darklink dark:hover:text-primary rounded-full justify-center items-center cursor-pointer xl:flex hidden"
                  >
                    <Icon icon="tabler:menu-2" height={20} />
                  </span>
                ) : null}

                <Search />

                <AppLinks />

                <Link
                  to="/apps/chats"
                  className="text-sm text-link dark:text-darklink dark:hover:text-primary px-4 h-10 hover:text-primary flex items-center justify-center"
                >
                  Chat
                </Link>

                <Link
                  to="/apps/calendar"
                  className="text-sm text-link dark:text-darklink dark:hover:text-primary px-4 h-10 hover:text-primary flex items-center justify-center"
                >
                  Calendar
                </Link>

                <Link
                  to="/apps/email"
                  className="text-sm text-link dark:text-darklink dark:hover:text-primary px-4 h-10 hover:text-primary flex items-center justify-center"
                >
                  Email
                </Link>
              </div>
            </div>
            {/* mobile-logo */}
            <div className="block xl:hidden">
              <FullLogo />
            </div>
            <div className="xl:!block !hidden md:!hidden">
              <div className="flex gap-0 items-center">
                {/* Theme Toggle */}
                {activeMode === 'light' ? (
                  <div
                    className="group hover:text-primary px-4 dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink relative"
                    onClick={toggleMode}
                  >
                    <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                      <Icon icon="tabler:moon" width="20" className="group-hover:text-primary" />
                    </span>
                  </div>
                ) : (
                  // Dark Mode Button
                  <div
                    className="group hover:text-primary px-4 dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink group relative"
                    onClick={toggleMode}
                  >
                    <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                      <Icon
                        icon="solar:sun-bold-duotone"
                        width="20"
                        className="group-hover:text-primary"
                      />
                    </span>
                  </div>
                )}
                {/* Language Dropdown*/}
                <Language />

                {/* Messages Dropdown */}
                <Messages />

                {/* Profile Dropdown */}
                <Profile />
              </div>
            </div>
            {/* Mobile Toggle Icon */}
            <span
              className="h-10 w-10 flex xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              onClick={handleMobileMenu}
            >
              <Icon icon="tabler:dots" height={21} />
            </span>
          </div>
        </nav>

        <div className={`w-full  xl:hidden block mobile-header-menu ${mobileMenu}`}>
          <MobileHeaderItems />
        </div>

        {/* Horizontal Menu  */}
        {layoutType == 'horizontal' ? (
          <div className="xl:border-y xl:border-ld xl:block hidden">
            <div className={`${isLayout == 'full' ? 'w-full px-6' : 'container'}`}>
              <HorizontalMenu />
            </div>
          </div>
        ) : null}
      </header>

      {/* Mobile Sidebar */}

      <div>
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="border-ld w-[270px]">
            <VisuallyHidden>
              <SheetTitle>sidebar</SheetTitle>
            </VisuallyHidden>
            <SidebarLayout />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Header;
