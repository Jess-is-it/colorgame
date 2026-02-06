import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Dropdownposition from './codes/DropdownPositionCode';
import DropdownpositionCode from './codes/DropdownPositionCode.tsx?raw';

const DropDownPosition = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Position</h4>
            <Dropdownposition />
          </div>
          <CodeDialog>{DropdownpositionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DropDownPosition;
