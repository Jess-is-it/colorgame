import { InvoiceProvider } from 'src/context/invoice-context';
import CreateInvoice from './Create';
import { Card } from 'src/components/ui/card';

function CreateInvoiceApp() {
  return (
    <InvoiceProvider>
      <Card>
        <CreateInvoice />
      </Card>
    </InvoiceProvider>
  );
}
export default CreateInvoiceApp;
