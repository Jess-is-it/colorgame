import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import DisableComboOpt from './codes/DisableComboOptCode';
import DisableComboOptCode from './codes/DisableComboOptCode.tsx?raw';

const DisableComboOption = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disabled Combo Option</h4>
            <DisableComboOpt />
          </div>
          <CodeDialog>{DisableComboOptCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableComboOption;
