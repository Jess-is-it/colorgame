import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import PopoverPosition from './codes/PopoverPositionCode';
import PopoverPositionCode from './codes/PopoverPositionCode.tsx?raw';

const PopoverPositioning = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Popover Positioning</h4>
            <PopoverPosition />
          </div>
          <CodeDialog>{PopoverPositionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default PopoverPositioning;
