import BasicCombobox from 'src/components/shadcn-ui/combobox/BasicCombobox';
import PopoverCombobox from 'src/components/shadcn-ui/combobox/PopoverCombobox';
import DropdownCombobox from 'src/components/shadcn-ui/combobox/DropdownCombobox';
import FormCombo from 'src/components/shadcn-ui/combobox/FormCombo';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Combobox',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Combobox" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicCombobox />
        </div>
        <div className="col-span-12">
          <PopoverCombobox />
        </div>
        <div className="col-span-12">
          <DropdownCombobox />
        </div>
        <div className="col-span-12">
          <FormCombo />
        </div>
      </div>
    </>
  );
};

export default page;
