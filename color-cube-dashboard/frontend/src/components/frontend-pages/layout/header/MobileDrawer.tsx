import { useEffect, useState } from 'react';
import { Button } from 'src/components/ui/button'
import { Badge } from 'src/components/ui/badge'
import { Sheet, SheetTrigger, SheetContent } from 'src/components/ui/sheet'
import { IconMenu2 } from '@tabler/icons-react';
import { useLocation, Link } from 'react-router';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';

const MobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
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

  const location = useLocation();

  const pathname = location.pathname;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        handleClose();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>      
      <div className='lg:hidden flex'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant='lightprimary'>
              <IconMenu2 className='!shrink-0' />
            </Button>
          </SheetTrigger>

          <SheetContent side='left' className='h-full p-3 w-[280px]'>
            <div className='my-2.5 flex justify-center'>
              <FullLogo />
            </div>
            <div className='overflow-y-auto max-h-[80vh] px-4 pb-6'>
              <div className='flex flex-col gap-4'>
                {Links.map((item) => {
                  const isActive = pathname === item.link ||
                      (pathname.startsWith('/frontend-pages/blog/detail/') &&
                        item.title === 'Blog')

                  if (!item.isBadge) {
                    return (
                      <Link
                        onClick={() => handleClose()}
                        key={item.key}
                        to={item.link}
                        className={`text-[15px] py-2.5 px-4 rounded-md ${
                          isActive
                            ? 'text-primary dark:text-primary bg-lightprimary'
                            : 'text-link dark:text-darklink font-medium'
                        }`}>
                        {item.title}
                      </Link>
                    )
                  } else {
                    return (
                      <Link
                        onClick={() => handleClose()}
                        key={item.key}
                        to={item.link}
                        className={`py-2.5 px-4 flex items-center rounded-md group gap-2 ${
                          pathname === '/frontend-pages/portfolio'
                            ? 'text-primary dark:text-primary bg-lightprimary'
                            : 'text-link dark:text-darklink'
                        }`}>
                        <span className='group-hover:text-primary text-[15px] block font-medium'>
                          Portfolio
                        </span>
                        <Badge
                          variant={'lightPrimary'}
                          className='text-xs font-semibold'>
                          New
                        </Badge>
                      </Link>
                    )
                  }
                })}
              </div>
              <Button className='mt-6 w-full' asChild>
                <Link to='/auth/auth2/login' onClick={() => handleClose()}>
                  Login
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileDrawer;
