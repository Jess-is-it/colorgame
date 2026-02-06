import CheckBoxValidation from 'src/components/form-components/form-validation/CheckBoxValidation';
import InputValidationOne from 'src/components/form-components/form-validation/InputValidationOne';
import InputValidationTwo from 'src/components/form-components/form-validation/InputValidationTwo';
import OnLeaveValidation from 'src/components/form-components/form-validation/OnLeaveValidation';
import RadioValidation from 'src/components/form-components/form-validation/RadioValidation';
import SelectValidation from 'src/components/form-components/form-validation/SelectValidation';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Form Validation',
  },
];

const FormValidation = () => {
  return (
    <>
      <BreadcrumbComp title="Form Validation" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <InputValidationOne />
        </div>
        <div className="col-span-12">
          <InputValidationTwo />
        </div>
        <div className="col-span-12">
          <OnLeaveValidation />
        </div>
        <div className="col-span-12">
          <SelectValidation />
        </div>
        <div className="col-span-12">
          <RadioValidation />
        </div>
        <div className="col-span-12">
          <CheckBoxValidation />
        </div>
      </div>
    </>
  );
};

export default FormValidation;
