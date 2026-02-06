import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import DisableItem from './codes/DisableItemCode';
import DisableItemCode from './codes/DisableItemCode.tsx?raw';

const DisablingItem = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disable Items</h4>
            <DisableItem />
          </div>
          <CodeDialog>{DisableItemCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisablingItem;
