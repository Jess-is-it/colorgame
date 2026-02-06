import { useContext } from 'react';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { Icon } from '@iconify/react';
import { useSidebar } from 'src/components/ui/sidebar';

interface HeaderPropsType {
  layoutType: string;
}

// Minimal header: keep the template styling/colors, but remove app links/features.
const Header = ({ layoutType }: HeaderPropsType) => {
  const { openMobile, setOpenMobile } = useSidebar();
  const { setIsCollapse, isCollapse, setActiveMode, activeMode } = useContext(CustomizerContext);

  const toggleMode = () => setActiveMode(activeMode === 'light' ? 'dark' : 'light');

  return (
    <header className="sticky top-0 z-[2] bg-white dark:bg-dark shadow-md w-full">
      <nav
        className={`px-2 rounded-none bg-transparent py-4 sm:px-6 ${
          layoutType === 'horizontal' ? 'container mx-auto' : ''
        }`}
      >
        <div className="mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              onClick={() => setOpenMobile(!openMobile)}
              className="px-[15px] hover:text-primary dark:hover:text-primary text-link dark:text-darklink relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary after:bg-transparent rounded-full xl:hidden flex justify-center items-center cursor-pointer"
              title="Menu"
            >
              <Icon icon="tabler:menu-2" height={20} />
            </span>

            <div className="text-lg font-semibold text-dark dark:text-white">
              Color Cube Dashboard
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span
              onClick={() => {
                if (isCollapse === 'full-sidebar') setIsCollapse('mini-sidebar');
                else setIsCollapse('full-sidebar');
              }}
              className="px-[15px] relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary after:bg-transparent text-link hover:text-primary dark:text-darklink dark:hover:text-primary rounded-full justify-center items-center cursor-pointer xl:flex hidden"
              title="Toggle sidebar"
            >
              <Icon icon="tabler:menu-2" height={20} />
            </span>

            <span
              className="group hover:text-primary px-4 dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink relative"
              onClick={toggleMode}
              title="Toggle theme"
            >
              <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2 group-hover:after:bg-lightprimary">
                {activeMode === 'light' ? (
                  <Icon icon="tabler:moon" width="20" className="group-hover:text-primary" />
                ) : (
                  <Icon
                    icon="solar:sun-bold-duotone"
                    width="20"
                    className="group-hover:text-primary"
                  />
                )}
              </span>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

