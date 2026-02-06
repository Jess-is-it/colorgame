import { Link } from 'react-router';
import { FrontMenu } from '../data';
import { Button } from 'src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from 'src/components/ui/dropdown-menu';
import { IconChevronDown } from '@tabler/icons-react';

const FrontPageMenu = () => {
  return (
    <>
      <div className="relative group/menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="!py-2 px-4 text-base text-ld hover:text-primary hover:bg-lightprimary rounded-md flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
              Frontend Pages <IconChevronDown className="ms-1" size={15} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            className="w-screen xl:w-[1150px] p-0 border-none bg-white shadow-lg rounded-sm mt-2 z-50"
          >
            {/* This is the shared hover group */}
            <div className="xl:p-6 p-3">
              <div className="mb-5">
                <h5 className="card-title">Different Front Pages</h5>
                <p>Included with the Package</p>
              </div>

              <div className="grid lg:grid-cols-5 grid-cols-1 gap-6">
                {FrontMenu.slice(0, 5).map((item, index) => (
                  <div className="group/cards" key={index}>
                    <div className="overflow-hidden border border-ld rounded-md relative flex justify-center items-center">
                      <img src={item.img} alt="tailwindadmin" className="w-full" />

                      {/* Show on group/cards hover if not included */}
                      {item.include === 'Included With The package' ? null : (
                        <>
                          <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="text-xs absolute left-0 right-0 flex justify-center items-center w-fit mx-auto opacity-0 group-hover/cards:opacity-100 z-[1] transition-opacity duration-300"
                          >
                            <Link to={item.link}>Live Preview</Link>
                          </Button>

                          <div className="absolute top-0 left-0 h-full w-full bg-blue-100 mix-blend-multiply opacity-0 group-hover/cards:opacity-100 transition-opacity duration-300" />
                        </>
                      )}
                    </div>

                    <h5 className="text-center p-3 pb-0 text-sm font-semibold">{item.name}</h5>

                    {item.include === 'Included With The package' && (
                      <p className="text-xs text-center text-bodytext">Included With The package</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default FrontPageMenu;
