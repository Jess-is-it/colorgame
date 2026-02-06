import React from 'react';
import { ChildItem } from '../sidebaritems';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from 'src/components/ui/sidebar';
import { Badge } from 'src/components/ui/badge';

interface NavItemsProps {
  item: ChildItem;
  isInsideCollapse?: boolean;
}
const NavItems: React.FC<NavItemsProps> = ({ item, isInsideCollapse }) => {
  const { setOpenMobile } = useSidebar();
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();

  const isExternal = item.url ? /^https?:\/\//.test(item.url) : false;

  const closeSidebar = () => {
    setOpenMobile(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isExternal) {
      e.preventDefault();
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
    closeSidebar();
  };

  return (
    <>
      <Link to={item.url || ''} onClick={handleClick}>
        <SidebarMenuItem
          className={`
    hover:transform hover:translate-x-1 transition-all duration-200 ease-in-out p-3 rounded-md
    ${
      item.disabled
        ? 'opacity-50 cursor-default hover:bg-transparent hover:text-link'
        : item.url === pathname
        ? isInsideCollapse
          ? '!text-primary bg-transparent' // ✅ active inside collapsible → only text color
          : `${
              item.icon ? '!text-white' : '!text-primary'
            } bg-primary hover:bg-primary dark:hover:bg-primary hover:text-white`
        : isInsideCollapse
        ? 'text-link dark:text-darklink hover:text-primary dark:hover:text-primary bg-transparent group/icon' // ✅ hover inside collapsible → no bg
        : 'text-link dark:text-darklink hover:text-primary dark:hover:text-primary bg-transparent hover:bg-lightprimary dark:hover:bg-lightprimary group/icon'
    }
  `}
        >
          <SidebarMenuButton
            asChild
            className="p-0 !h-auto rounded-none
           !bg-transparent 
    !text-inherit 
    !hover:bg-transparent 
    !hover:text-primary 
    !focus-visible:ring-0
    !active:bg-transparent
    !active:text-inherit
  !peer-hover/menu-button:text-primary !important
        
        "
          >
            <span className="flex gap-3 align-center items-center truncate w-full">
              {item.icon ? (
                <Icon
                  icon={item.icon}
                  className={`${item.color} w-5! h-5!`}
                  height={21}
                  width={21}
                />
              ) : (
                <span
                  className={`${
                    item.url == pathname
                      ? 'rounded-full mx-1 group-hover/link:bg-primary !bg-transparent border border-primary size-2 '
                      : 'size-2 !bg-transparent border  border-dark dark:border-darklink rounded-full mx-1 group-hover/link:!border-primary group-hover/icon:border-primary dark:group-hover/icon:border-primary'
                  } `}
                ></span>
              )}
              <div
                className="max-w-36 overflow-hidden hide-menu flex-1 truncate !leading-normal *:
            
              "
              >
                {t(`${item.name}`)}
                {item.subtitle ? <p className="text-xs mt-1">{t(`${item.subtitle}`)}</p> : null}
              </div>
              {item.badge && item.badgeType === 'filled' && (
                <Badge className="hide-menu"> {item.badgeContent}</Badge>
              )}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Link>
    </>
  );
};

export default NavItems;
