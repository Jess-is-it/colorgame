import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Verticaltabs from './codes/VerticalTabsCode';
import VerticaltabsCode from './codes/VerticalTabsCode.tsx?raw';

const VerticalTabs = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Vertical Tabs</h4>
            <Verticaltabs />
          </div>
          <CodeDialog>{VerticaltabsCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default VerticalTabs;
