import DefaultRadio from 'src/components/shadcn-form/radio/DefaultRadio';
import FormRadio from 'src/components/shadcn-form/radio/FormRadio';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Radio',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Radio" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DefaultRadio />
        </div>
        <div className="col-span-12">
          <FormRadio />
        </div>
      </div>
    </>
  );
};

export default page;
