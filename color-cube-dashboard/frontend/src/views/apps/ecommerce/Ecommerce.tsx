import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import EcommerceShop from 'src/components/apps/ecommerce/productgrid';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Shop',
  },
];

const Ecommerce = () => {
  return (
    <>
      <BreadcrumbComp title="Shop App" items={BCrumb} />
      <EcommerceShop />
    </>
  );
};

export default Ecommerce;
