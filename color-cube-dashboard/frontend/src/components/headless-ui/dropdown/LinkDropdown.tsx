import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import LinkDropDown from './codes/LinkDropdownCode';
import LinkDropDownCode from './codes/LinkDropdownCode.tsx?raw';

const LinkDropdown = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Links Dropdown</h4>
            <LinkDropDown />
          </div>
          <CodeDialog>{LinkDropDownCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default LinkDropdown;
