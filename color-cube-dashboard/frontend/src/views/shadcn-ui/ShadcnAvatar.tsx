import BasicAvatar from 'src/components/shadcn-ui/avatar/BasicAvatar';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Avatar',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Avatar" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicAvatar />
        </div>
      </div>
    </>
  );
};

export default page;
