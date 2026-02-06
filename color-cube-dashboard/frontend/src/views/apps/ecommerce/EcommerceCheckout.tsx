import { EcommerceContextProvider } from 'src/context/ecommerce-context';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ProductCheckout from 'src/components/apps/ecommerce/checkout/ProductCheckout';
import { Card } from 'src/components/ui/card';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Checkout',
  },
];

const Checkout = () => {
  return (
    <>
      <EcommerceContextProvider>
        <BreadcrumbComp title="Checkout" items={BCrumb} />
        <Card>
          <ProductCheckout />
        </Card>
      </EcommerceContextProvider>
    </>
  );
};

export default Checkout;
