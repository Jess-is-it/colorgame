import { useState, useEffect } from 'react';
import MobileDrawer from './MobileDrawer';
import { useLocation, Link } from 'react-router';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import { Button } from "src/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "src/components/ui/navigation-menu";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
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

  const location = useLocation();

  const pathname = location.pathname;

  const Links = [
    {
      key: 'link1',
      title: 'About Us',
      link: '/frontend-pages/about',
      isBadge: false,
    },
    {
      key: 'link2',
      title: 'Blog',
      link: '/frontend-pages/blog/post',
      isBadge: false,
    },
    {
      key: 'link6',
      title: 'Portfolio',
      link: '/frontend-pages/portfolio',
      isBadge: true,
    },
    {
      key: 'link3',
      title: 'Dashboard',
      link: '/',
      isBadge: false,
    },
    {
      key: 'link4',
      title: 'Pricing',
      link: '/frontend-pages/pricing',
      isBadge: false,
    },
    {
      key: 'link5',
      title: 'Contact',
      link: '/frontend-pages/contact',
      isBadge: false,
    },
  ];

  return (
    <>
      <header
        className={`sticky  top-0 z-50 transition-colors ${
          isSticky ? 'bg-white dark:bg-dark shadow-md ' : 'bg-lightprimary dark:bg-lightprimary'
        }`}
      >
        <div className="flex items-center justify-between px-4 lg:px-6 py-6 container">
            <FullLogo />
          <MobileDrawer />
          {/* Desktop Nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {Links.map((item) =>
              !item.isBadge ? (
                <NavigationMenuItem key={item.key}>
                  <NavigationMenuLink
                    asChild
                    className={`px-3 py-2 text-[15px] font-medium rounded-md transition ${pathname === item.link ||
                      (pathname.startsWith('/frontend-pages/blog/detail/') &&
                        item.title === 'Blog')
                        ? "text-primary bg-lightprimary dark:text-primary"
                        : "text-link dark:text-darklink hover:text-primary dark:hover:text-primary"
                      }`}
                  >
                    <Link to={item.link}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.key}>
                  <NavigationMenuLink
                    asChild
                    className={`px-3 py-2 flex items-center gap-2 text-[15px] font-medium rounded-md transition ${pathname === "/frontend-pages/portfolio"
                        ? "text-primary bg-lightprimary dark:text-primary"
                        : "text-link dark:text-darklink dark:hover:text-primary"
                      }`}
                  >
                    <Link to={item.link}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Login Button */}
        <Button asChild className="hidden lg:inline-flex">
          <Link to="/auth/auth1/login">Login</Link>
        </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
