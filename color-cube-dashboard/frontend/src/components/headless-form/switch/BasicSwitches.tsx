import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import BasicSwitch from './codes/BasicSwitchCode';
import BasicSwitchCode from './codes/BasicSwitchCode.tsx?raw';

const BasicSwitches = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic Switches</h4>
            <BasicSwitch />
          </div>
          <CodeDialog>{BasicSwitchCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicSwitches;
