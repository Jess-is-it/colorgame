import UserDataTable from "src/components/react-tables/user-datatable"
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp"


const BCrumb = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'React Tables',
  },
]
function page() {
  return (
    <>
      <BreadcrumbComp title='User Table' items={BCrumb} />
      <UserDataTable />
    </>
  )
}

export default page
