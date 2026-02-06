import BasicDrawer from 'src/components/shadcn-ui/drawer/BasicDrawer';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/',
    text: 'Drawer',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Drawer" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          {/* <BasicDropdown /> */}
          <BasicDrawer />
        </div>
      </div>
    </>
  );
};

export default page;
