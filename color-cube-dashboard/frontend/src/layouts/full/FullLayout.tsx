import { Activity, FC, useContext } from 'react';
import { Outlet } from 'react-router';
import { CustomizerContext } from '../../context/CustomizerContext';
import Sidebar from './vertical/sidebar/Sidebar';
import Header from './vertical/header/Header';
import { SidebarProvider } from 'src/components/ui/sidebar';

const FullLayout: FC = () => {
  const { activeLayout, isLayout } = useContext(CustomizerContext);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <div className="page-wrapper flex w-full">
          {/* Header/sidebar */}
          <Activity mode={activeLayout == 'vertical' ? 'visible' : 'hidden'}>
            <div className="xl:block hidden">
              <Sidebar />
            </div>
          </Activity>

          <div className="body-wrapper w-full bg-white dark:bg-dark">
            {/* Top Header  */}
            <Header layoutType={activeLayout == 'horizontal' ? 'horizontal' : 'vertical'} />

            {/* Body Content  */}
            <div
              className={` ${
                isLayout == 'full'
                  ? 'w-full py-[30px] md:px-[30px] px-5'
                  : 'container mx-auto  py-[30px]'
              } ${activeLayout == 'horizontal' ? 'xl:mt-3' : ''}
            `}
            >
              <main className="flex-grow">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FullLayout;
