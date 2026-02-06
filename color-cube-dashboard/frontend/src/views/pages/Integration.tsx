import Integartionpage from "src/components/theme-pages/integration/Integartionpage";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";


const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        to: '',
        title: 'Integrations',
    },
]


function Integration() {
    return (
        <>
            <BreadcrumbComp title="Integrations" items={BCrumb} />
            <Integartionpage />
        </>
    )
}

export default Integration