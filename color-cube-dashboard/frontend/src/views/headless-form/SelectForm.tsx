import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import BasicSelect from 'src/components/headless-form/select/BasicSelect';
import WithLabelSelect from 'src/components/headless-form/select/WithLabelSelect';
import WithDescriptionSelect from 'src/components/headless-form/select/WithDescriptionSelect';
import DisabledSelect from 'src/components/headless-form/select/DisableSelect';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Select',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Select" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicSelect />
        </div>
        <div className="col-span-12">
          <WithLabelSelect />
        </div>
        <div className="col-span-12">
          <WithDescriptionSelect />
        </div>
        <div className="col-span-12">
          <DisabledSelect />
        </div>
      </div>
    </>
  );
};

export default page;
