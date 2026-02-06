// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { EcommerceContextProvider } from 'src/context/ecommerce-context';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ProductTableList from 'src/components/apps/ecommerce/product-tablelist/ProductTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Product list',
  },
];

const EcomProductList = () => {
  return (
    <EcommerceContextProvider>
      <BreadcrumbComp title="Product list" items={BCrumb} />
      <ProductTableList />
    </EcommerceContextProvider>
  );
};

export default EcomProductList;
