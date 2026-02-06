import BasicTab from 'src/components/shadcn-ui/tab/BasicTab';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Tab',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Tab" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicTab />
        </div>
      </div>
    </>
  );
};

export default page;
