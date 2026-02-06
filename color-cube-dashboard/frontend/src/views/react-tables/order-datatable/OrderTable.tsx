import OrderTable from "src/components/react-tables/order-datatable/page"
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp"




const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '',
    text: 'React Tables',
  },
]
function page() {
  return (
    <>
      <BreadcrumbComp title='Order Table' items={BCrumb} />
      <OrderTable />
    </>
  )
}

export default page
