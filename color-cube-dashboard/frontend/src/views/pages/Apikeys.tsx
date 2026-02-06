
import ApiKeys from "src/components/theme-pages/api-keys/ApiKeys";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";


const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        to: '',
        title: 'Api Keys',
    },
]

function Apikeys() {
    return (
        <>
            <BreadcrumbComp title="Api Keys" items={BCrumb} />
            <ApiKeys />
        </>
    )
}

export default Apikeys