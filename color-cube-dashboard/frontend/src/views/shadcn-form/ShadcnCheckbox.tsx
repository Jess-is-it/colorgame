import CheckboxWithLable from 'src/components/shadcn-form/checkbox/CheckboxWithLable';
import DefaultChecked from 'src/components/shadcn-form/checkbox/DefaultChecked';
import DisabledCehckboxes from 'src/components/shadcn-form/checkbox/DisabledCehckboxes';
import FormCheckbox from 'src/components/shadcn-form/checkbox/FormCheckbox';
import CheckboxWithText from 'src/components/shadcn-form/checkbox/CheckboxWithText';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Checkbox',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Checkbox" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <CheckboxWithLable />
        </div>
        <div className="col-span-12">
          <DefaultChecked />
        </div>
        <div className="col-span-12">
          <DisabledCehckboxes />
        </div>
        <div className="col-span-12">
          <FormCheckbox />
        </div>
        <div className="col-span-12">
          <CheckboxWithText />
        </div>
      </div>
    </>
  );
};

export default page;
