import BasicSkeleton from 'src/components/shadcn-ui/skeleton/BasicSkeleton';
import CardSkeleton from 'src/components/shadcn-ui/skeleton/CardSkeleton';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Skeleton',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Skeleton" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicSkeleton />
        </div>
        <div className="col-span-12">
          <CardSkeleton />
        </div>
      </div>
    </>
  );
};

export default page;
