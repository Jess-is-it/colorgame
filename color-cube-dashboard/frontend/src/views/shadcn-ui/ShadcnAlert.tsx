import BasicAlert from 'src/components/shadcn-ui/alert/BasicAlert';
import LightAlert from 'src/components/shadcn-ui/alert/LightAlert';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Alert',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Alerts" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicAlert />
        </div>
        <div className="col-span-12">
          <LightAlert />
        </div>
      </div>
    </>
  );
};

export default page;
