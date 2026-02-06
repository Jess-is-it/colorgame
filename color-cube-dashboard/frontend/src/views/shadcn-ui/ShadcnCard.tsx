import BasicCard from 'src/components/shadcn-ui/card/BasicCard';
import FormCard from 'src/components/shadcn-ui/card/FormCard';
import NotificationCard from 'src/components/shadcn-ui/card/NotificationCard';
import ChartCard from 'src/components/shadcn-ui/card/ChartCard';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Card',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Card" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicCard />
        </div>
        <div className="col-span-12">
          <FormCard />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <NotificationCard />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <ChartCard />
        </div>
      </div>
    </>
  );
};

export default page;
