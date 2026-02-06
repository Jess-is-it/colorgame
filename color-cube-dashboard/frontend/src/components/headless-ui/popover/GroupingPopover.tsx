import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Groupingpopover from './codes/GroupingPopoverCode';
import GroupingpopoverCode from './codes/GroupingPopoverCode.tsx?raw';

const GroupingPopover = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Grouping Related Popover</h4>
            <Groupingpopover />
          </div>
          <CodeDialog>{GroupingpopoverCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default GroupingPopover;
