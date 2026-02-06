import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import MainFieldset from 'src/components/headless-form/fieldset/MainFieldset';
import DisableFieldset from 'src/components/headless-form/fieldset/DisableFieldset';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Fieldset',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Fieldset" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <MainFieldset />
        </div>
        <div className="col-span-12">
          <DisableFieldset />
        </div>
      </div>
    </>
  );
};

export default page;
