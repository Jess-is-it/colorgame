import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import SepratingItems from './codes/SepratingItemsCode';
import SepratingItemsCode from './codes/SepratingItemsCode.tsx?raw';

const SepratorDropdown = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Separating Items</h4>
            <SepratingItems />
          </div>
          <CodeDialog>{SepratingItemsCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default SepratorDropdown;
