import { InvoiceProvider } from 'src/context/invoice-context/index';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import EditInvoicePage from 'src/components/apps/invoice/edit-invoice/index';
import { Card } from 'src/components/ui/card';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Invoice Edit',
  },
];

function EditPage() {
  return (
    <InvoiceProvider>
      <BreadcrumbComp title="Invoice Edit" items={BCrumb} />
      <Card>
        <EditInvoicePage />
      </Card>
    </InvoiceProvider>
  );
}

export default EditPage;
