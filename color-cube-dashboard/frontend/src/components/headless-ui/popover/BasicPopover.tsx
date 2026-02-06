import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Basicpopover from './codes/BasicPopoverCode';
import BasicpopoverCode from './codes/BasicPopoverCode.tsx?raw';

const BasicPopover = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic Popover</h4>
            <Basicpopover />
          </div>
          <CodeDialog>{BasicpopoverCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicPopover;
