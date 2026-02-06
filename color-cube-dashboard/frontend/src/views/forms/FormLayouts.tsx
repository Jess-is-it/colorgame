import BasicHeaderForm from 'src/components/form-components/form-layouts/BasicHeaderForm';
import DefaultForm from 'src/components/form-components/form-layouts/DefaultForm';
import DisableForm from 'src/components/form-components/form-layouts/DisableForm';
import InputVariants from 'src/components/form-components/form-layouts/InputVariants';
import OrdinaryForm from 'src/components/form-components/form-layouts/OrdinaryForm';
import ReadOnlyForm from 'src/components/form-components/form-layouts/ReadOnlyForm';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Form Layouts',
  },
];

const FormLayouts = () => {
  return (
    <>
      <BreadcrumbComp title="Form Layout" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <OrdinaryForm />
        </div>
        <div className="col-span-12">
          <InputVariants />
        </div>
        <div className="col-span-12">
          <DefaultForm />
        </div>
        <div className="col-span-12">
          <BasicHeaderForm />
        </div>
        <div className="col-span-12">
          <ReadOnlyForm />
        </div>
        <div className="col-span-12">
          <DisableForm />
        </div>
      </div>
    </>
  );
};

export default FormLayouts;
