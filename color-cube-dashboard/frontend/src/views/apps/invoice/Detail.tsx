import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { InvoiceProvider } from 'src/context/invoice-context/index';
import InvoiceDetail from 'src/components/apps/invoice/invoice-detail/index';
import { Card } from 'src/components/ui/card';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Invoice Details',
  },
];

function InvoiceDetailPage() {
  return (
    <InvoiceProvider>
      <BreadcrumbComp title="Invoice Details" items={BCrumb} />
      <Card>
        <InvoiceDetail />
      </Card>
    </InvoiceProvider>
  );
}
export default InvoiceDetailPage;
