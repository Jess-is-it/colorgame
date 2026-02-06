import CreateInvoiceApp from 'src/components/apps/invoice/add-invoice';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Invoice Create",
  },
];
function CreateList() {
  return (
    <>
      <BreadcrumbComp title=" Create A New Invoice " items={BCrumb} />
      <CreateInvoiceApp />
    </>
  );
}
export default CreateList;
