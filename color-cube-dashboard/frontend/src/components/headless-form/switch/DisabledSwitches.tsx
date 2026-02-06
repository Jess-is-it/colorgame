import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import DisableSwitch from './codes/DisableSwitchesCode';
import DisableSwitchCode from './codes/DisableSwitchesCode.tsx?raw';

const DisabledSwitches = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disabled Switches</h4>
            <DisableSwitch />
          </div>
          <CodeDialog>{DisableSwitchCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisabledSwitches;
