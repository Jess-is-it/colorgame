import BasicDropdown from 'src/components/shadcn-ui/dropdown/BasicDropdown';
import DropdownWithRadio from 'src/components/shadcn-ui/dropdown/DropdownWithRadio';
import { DropdownMenuCheckboxes } from 'src/components/shadcn-ui/dropdown/DropdownMenuCheckboxes';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Dropdown',
  },
];

const ShadcnDropdown = () => {
  return (
    <>
      <BreadcrumbComp title="Dropdown" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicDropdown />
        </div>
        <div className="col-span-12">
          <DropdownWithRadio />
        </div>
        <div className="col-span-12">
          <DropdownMenuCheckboxes />
        </div>
      </div>
    </>
  );
};

export default ShadcnDropdown;
