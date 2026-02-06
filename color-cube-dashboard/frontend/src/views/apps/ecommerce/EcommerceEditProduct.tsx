import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import GeneralDetail from 'src/components/apps/ecommerce/editproduct/GeneralDetail';
import Media from 'src/components/apps/ecommerce/editproduct/Media';
import Variation from 'src/components/apps/ecommerce/editproduct/Variation';
import Pricing from 'src/components/apps/ecommerce/editproduct/Pricing';
import Thumbnail from 'src/components/apps/ecommerce/editproduct/Thumbnail';
import Status from 'src/components/apps/ecommerce/editproduct/Status';
import ProductData from 'src/components/apps/ecommerce/editproduct/ProductData';
import Producttemplate from 'src/components/apps/ecommerce/editproduct/ProductTemplate';
import ProductrChart from 'src/components/apps/ecommerce/editproduct/ProductrChart';
import CustomerReviews from 'src/components/apps/ecommerce/editproduct/CustomerReviews';
import { Button } from 'src/components/ui/button';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Edit Product',
  },
];

const EditProduct = () => {
  return (
    <>
      <BreadcrumbComp title="Edit Product" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 col-span-12">
          <div className="flex flex-col gap-6">
            {/* General */}
            <GeneralDetail />
            {/* Media  */}
            <Media />
            {/* Variation  */}
            <Variation />
            {/* Pricing  */}
            <Pricing />
            {/* CustomerReviews */}
            <CustomerReviews />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="flex flex-col gap-6">
            {/* Thumbnail */}
            <Thumbnail />
            {/* Status */}
            <Status />
            {/* ProductData */}
            <ProductData />
            {/* ProductrChart */}
            <ProductrChart />
            {/* Producttemplate */}
            <Producttemplate />
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <div className="sm:flex gap-3">
            <Button className="sm:mb-0 mb-3 w-fit">Save changes</Button>
            <Button variant={'lighterror'} className="w-fit">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
