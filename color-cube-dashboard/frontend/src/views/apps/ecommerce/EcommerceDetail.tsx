import { EcommerceContextProvider } from 'src/context/ecommerce-context';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ProductCarousel from 'src/components/apps/ecommerce/productdetail/ProductCarousel';
import ProductDesc from 'src/components/apps/ecommerce/productdetail/ProductDesc';
import ProductDetail from 'src/components/apps/ecommerce/productdetail';
import ProductRelated from 'src/components/apps/ecommerce/productdetail/ProductRelated';
import { Card } from 'src/components/ui/card';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Shop Detail',
  },
];

const EcommerceDetail = () => {
  return (
    <>
      <EcommerceContextProvider>
        <BreadcrumbComp title="Shop Detail" items={BCrumb} />
        {/* Slider and Details of Products */}
        <Card>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-6 col-span-12">
              <ProductCarousel />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <ProductDetail />
            </div>
          </div>
        </Card>
        {/* Description Tabs Products */}
        <Card className="mt-[30px] pt-2">
          <ProductDesc />
        </Card>
        {/* Related Products */}
        <ProductRelated />
      </EcommerceContextProvider>
    </>
  );
};

export default EcommerceDetail;
