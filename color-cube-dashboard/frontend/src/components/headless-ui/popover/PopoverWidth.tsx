import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Popoverwidth from './codes/PopoverWidthCode';
import PopoverwidthCode from './codes/PopoverWidthCode.tsx?raw';

const PopoverWidth = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Popover Width</h4>
            <Popoverwidth />
          </div>
          <CodeDialog>{PopoverwidthCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default PopoverWidth;
