import BasicCollapse from 'src/components/shadcn-ui/collapsible/BasicCollapse';
import AdvanceCollapse from 'src/components/shadcn-ui/collapsible/AdvanceCollapse';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Collapsible',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Collapsible" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicCollapse />
        </div>
        <div className="col-span-12">
          <AdvanceCollapse />
        </div>
      </div>
    </>
  );
};

export default page;
