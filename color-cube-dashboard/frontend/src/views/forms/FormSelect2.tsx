import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import DefaultSelect2 from 'src/components/form-components/form-select2/DefaultSelect2';
import MultiSelect2 from 'src/components/form-components/form-select2/MultiSelect2';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Select2',
  },
];

const FormSelect2 = () => {
  return (
    <>
      <BreadcrumbComp title="Select2" items={BCrumb} />
      <div className="flex flex-col gap-6">
        <div>
          <DefaultSelect2 />
        </div>
        <div>
          <MultiSelect2 />
        </div>
      </div>
    </>
  );
};

export default FormSelect2;
