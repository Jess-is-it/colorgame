import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import BasicCombo from './codes/BasicComboCode';
import BasicComboCode from './codes/BasicComboCode.tsx?raw';

const BasicCombobox = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic</h4>
            <BasicCombo />
          </div>
          <CodeDialog>{BasicComboCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicCombobox;
