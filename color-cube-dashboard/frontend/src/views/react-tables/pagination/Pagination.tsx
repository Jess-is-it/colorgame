import PaginationTable from "src/components/react-tables/pagination/page";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";

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
            <BreadcrumbComp title="Pagination Table " items={BCrumb} />
            <PaginationTable />
        </>
    );
}

export default page;
