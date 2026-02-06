import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

import BasicLayout from 'src/components/form-components/form-horizontal/BasicLayout';
import FormSeprator from 'src/components/form-components/form-horizontal/FormSeprator';
import FormLableAlignment from 'src/components/form-components/form-horizontal/FormLableAlignment';
import CollapsibalForm from 'src/components/form-components/form-horizontal/CollapsibalForm';
import FormWithTabs from 'src/components/form-components/form-horizontal/FormWithTabs';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Form Horizontal',
  },
];
const FormHorizontal = () => {
  return (
    <>
      <BreadcrumbComp title="Form Horizontal" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicLayout />
        </div>
        <div className="col-span-12">
          <FormSeprator />
        </div>
        <div className="col-span-12">
          <FormLableAlignment />
        </div>
        <div className="col-span-12">
          <CollapsibalForm />
        </div>
        <div className="col-span-12">
          <FormWithTabs />
        </div>
      </div>
    </>
  );
};

export default FormHorizontal;
