import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import ManuallActivetab from './codes/ManuallActiveTabCode';
import ManuallActivetabCode from './codes/ManuallActiveTabCode.tsx?raw';

const MannuallActiveTab = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Manually Active Tab</h4>
            <ManuallActivetab />
          </div>
          <CodeDialog>{ManuallActivetabCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default MannuallActiveTab;
