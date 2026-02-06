import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import WithLabelswitch from './codes/WithLabelSwitchCode';
import WithLabelswitchCode from './codes/WithLabelSwitchCode.tsx?raw';

const WithLabelSwitch = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Adding a Label</h4>
            <WithLabelswitch />
          </div>
          <CodeDialog>{WithLabelswitchCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default WithLabelSwitch;
