import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import GroupItem from './codes/GroupItemCode';
import GroupItemCode from './codes/GroupItemCode.tsx?raw';

const GroupingItems = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Grouping Items</h4>
            <GroupItem />
          </div>
          <CodeDialog>{GroupItemCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default GroupingItems;
