import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Disabled from './codes/DisabledCode';
import DisabledCode from './codes/DisabledCode.tsx?raw';

const DisableCombo = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disabled</h4>
            <Disabled />
          </div>
          <CodeDialog>{DisabledCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableCombo;
