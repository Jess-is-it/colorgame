import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Dropdwonwidth from './codes/DropdwonWidthCode';
import DropdwonwidthCode from './codes/DropdwonWidthCode.tsx?raw';

const DropdownWidth = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Dropdown Width</h4>
            <Dropdwonwidth />
          </div>
          <CodeDialog>{DropdwonwidthCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DropdownWidth;
