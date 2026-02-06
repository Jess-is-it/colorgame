import BasicBreadcrumb from 'src/components/shadcn-ui/breadcrumb/BasicBreadcrumb';
import BreadcrumbWithSeparator from 'src/components/shadcn-ui/breadcrumb/BreadcrumbWithSeparator';
import BreadcrumbWithDropdown from 'src/components/shadcn-ui/breadcrumb/BreadcrumbWithDropdown';
import BreadcrumbWithEllipsis from 'src/components/shadcn-ui/breadcrumb/BreadcrumbWithEllipsis';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Breadcrumb',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Breadcrumb" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicBreadcrumb />
        </div>
        <div className="col-span-12">
          <BreadcrumbWithSeparator />
        </div>
        <div className="col-span-12">
          <BreadcrumbWithDropdown />
        </div>
        <div className="col-span-12">
          <BreadcrumbWithEllipsis />
        </div>
      </div>
    </>
  );
};

export default page;
