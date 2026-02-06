import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import RadioGroupWithDesc from 'src/components/headless-form/radiogroup/RadioGroupWithDesc';
import BasicRadioGroup from 'src/components/headless-form/radiogroup/BasicRadioGroup';
import MainRadioGroup from 'src/components/headless-form/radiogroup/MainRadioGroup';

import WithHtmlForms from 'src/components/headless-form/radiogroup/WithHtmlForms';
import DisabledRadioGroup from 'src/components/headless-form/radiogroup/DisabledRadioGroup';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'RadioGRoup',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Radio Group" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <MainRadioGroup />
        </div>
        <div className="col-span-12">
          <RadioGroupWithDesc />
        </div>
        <div className="col-span-12">
          <DisabledRadioGroup />
        </div>
        <div className="col-span-12">
          <BasicRadioGroup />
        </div>
        <div className="col-span-12">
          <WithHtmlForms />
        </div>
      </div>
    </>
  );
};

export default page;
