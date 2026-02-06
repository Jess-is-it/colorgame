import BasicTooltip from 'src/components/shadcn-ui/tooltip/BasicTooltip';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Tooltip',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Tooltip" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicTooltip />
        </div>
      </div>
    </>
  );
};

export default page;
