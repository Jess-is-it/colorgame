import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Basictabs from './codes/BasicTabsCode';
import BasictabsCode from './codes/BasicTabsCode.tsx?raw';

const BasicTabs = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic Tabs</h4>
            <Basictabs />
          </div>
          <CodeDialog>{BasictabsCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicTabs;
