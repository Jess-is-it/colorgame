import BasicDatepicker from 'src/components/shadcn-ui/datepicker/BasicDatepicker';
import DateRangePicker from 'src/components/shadcn-ui/datepicker/DateRangePicker';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Datepicker',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Datepicker" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicDatepicker />
        </div>
        <div className="col-span-12">
          <DateRangePicker />
        </div>
      </div>
    </>
  );
};

export default page;
