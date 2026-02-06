import { InvoiceProvider } from 'src/context/invoice-context/index';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import InvoiceList from 'src/components/apps/invoice/invoice-list/index';
import DetailCard from 'src/components/apps/invoice/invoice-list/DetailCard';
import { Card } from 'src/components/ui/card';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Invoice List',
  },
];

function List() {
  return (
    <InvoiceProvider>
      <BreadcrumbComp title="Invoice List" items={BCrumb} />
      <DetailCard />
      <Card>
        <InvoiceList />
      </Card>
    </InvoiceProvider>
  );
}
export default List;
