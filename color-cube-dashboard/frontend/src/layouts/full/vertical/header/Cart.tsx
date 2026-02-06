import { useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from 'src/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeDir } = useContext(CustomizerContext);
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="relative">
          <button
            className="h-10 w-10 hover:text-primary text-darklink hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary"
            onClick={() => setIsOpen(true)}
          >
            <Icon icon="solar:cart-large-minimalistic-linear" height={22} />
          </button>
          <span className="rounded-full absolute end-1 top-[4px] bg-info text-[10px] h-4 w-4 flex justify-center items-center text-white">
            0
          </span>
        </div>
      </div>
      {/* <Drawer open={isOpen} onClose={handleClose} position={`${activeDir === "rtl" ? 'left' : 'right'}`} className="dark:bg-dark max-w-[350px] w-full">

        <div className="border-ld  border-b">
          <div className="flex justify-between items-center p-4">
            <h5 className="text-xl">Shopping Cart</h5>
            <DrawerHeader title="" titleIcon={() => <></>} />
          </div>
        </div>
      </Drawer> */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side={activeDir === 'rtl' ? 'left' : 'right'}
          className="dark:bg-dark max-w-[350px] w-full p-0"
        >
          <VisuallyHidden>
            <SheetTitle>My Sheet Title</SheetTitle>
            <SheetDescription>This sheet explains something important.</SheetDescription>
          </VisuallyHidden>
          <div className="border-ld border-b">
            <div className="flex justify-between items-center p-4">
              <h5 className="text-xl">Shopping Cart</h5>
              {/* Close button handled by Sheet internally */}
            </div>
          </div>
          {/* Cart content goes here */}
        </SheetContent>
      </Sheet>
    </div>
  );
};
