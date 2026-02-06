import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Disabletab from './codes/DisableTabCode';
import DisabletabCode from './codes/DisableTabCode.tsx?raw';

const DisableTab = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disable Tab</h4>
            <Disabletab />
          </div>
          <CodeDialog>{DisabletabCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableTab;
