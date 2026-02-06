import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Basicbuttons from './codes/BasicButtonsCode';
import BasicbuttonsCode from './codes/BasicButtonsCode.tsx?raw';

const BasicButtons = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic Buttons</h4>
            <Basicbuttons />
          </div>
          <CodeDialog>{BasicbuttonsCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicButtons;
