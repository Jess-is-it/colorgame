import { useState } from 'react';
import { EcommerceContextProvider } from 'src/context/ecommerce-context';
import ProductFilter from 'src/components/apps/ecommerce/productgrid/ProductFilter';
import ProductList from 'src/components/apps/ecommerce/productgrid/ProductList';
import { Card } from 'src/components/ui/card';
import { Sheet, SheetContent } from 'src/components/ui/sheet';

const EcommerceShop = () => {
  const [isOpenShop, setIsOpenShop] = useState(false);

  return (
    <>
      <EcommerceContextProvider>
        <Card className="p-0">
          {/* ------------------------------------------- */}
          {/* Left part */}
          {/* ------------------------------------------- */}
          <div className="flex">
            <div className="lg:relative lg:block hidden max-w-[250px] w-full">
              <ProductFilter />
            </div>

            {/* Mobile Filter using Sheet/Drawer */}
            <Sheet open={isOpenShop} onOpenChange={setIsOpenShop}>
              <SheetContent side="left" className="w-[250px] p-0 lg:hidden">
                <ProductFilter />
              </SheetContent>
            </Sheet>
            {/* ------------------------------------------- */}
            {/* Right part */}
            {/* ------------------------------------------- */}
            <div className="p-6 w-full">
              <ProductList openShopFilter={setIsOpenShop} />
            </div>
          </div>
        </Card>
      </EcommerceContextProvider>
    </>
  );
};

export default EcommerceShop;
