import FormWithTabs from 'src/components/form-components/form-horizontal/FormWithTabs';
import BasicLayout from 'src/components/form-components/form-vertical/BasicLayout';
import CollapsibleSection from 'src/components/form-components/form-vertical/CollapsibleSection';
import MulticolFormSeprator from 'src/components/form-components/form-vertical/MulticolFormSeprator';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Form Vertical',
  },
];

const FormVertical = () => {
  return (
    <>
      <BreadcrumbComp title="Form Vertical" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicLayout />
        </div>
        <div className="col-span-12">
          <MulticolFormSeprator />
        </div>
        <div className="col-span-12">
          <CollapsibleSection />
        </div>
        <div className="col-span-12">
          <FormWithTabs />
        </div>
      </div>
    </>
  );
};

export default FormVertical;
