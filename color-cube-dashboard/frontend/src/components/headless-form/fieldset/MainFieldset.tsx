import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Fieldset from './codes/FieldsetCode';
import FieldsetCode from './codes/FieldsetCode.tsx?raw';

const MainFieldset = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Fieldset Form</h4>
            <Fieldset />
          </div>
          <CodeDialog>{FieldsetCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default MainFieldset;
