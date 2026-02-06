import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";
import DenseTable from "src/components/react-tables/dense/page";


const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    href: '',
    text: 'React Tables',
  },
]
function page() {
  return (
    <>
      <BreadcrumbComp title="Dense Table " items={BCrumb} />
      <DenseTable />
    </>
  );
}

export default page;
