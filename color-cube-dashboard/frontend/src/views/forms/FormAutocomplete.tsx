import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CommandAutocomplete from 'src/components/form-components/form-autocomplete/CommandAutocomplete';
import { DefaultAutocomplete } from 'src/components/form-components/form-autocomplete/DefaultAutocomplete';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Autocomplete',
  },
];

const FormAutocomplete = () => {
  return (
    <>
      <BreadcrumbComp title="Autocomplete" items={BCrumb} />
      <div className="flex flex-col gap-6">
        <div>
          <DefaultAutocomplete />
        </div>
        <div>
          <CommandAutocomplete />
        </div>
      </div>
    </>
  );
};

export default FormAutocomplete;
