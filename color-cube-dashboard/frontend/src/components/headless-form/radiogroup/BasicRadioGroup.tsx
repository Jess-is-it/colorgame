import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import BasicRadiogroup from './codes/BasicRadioGroupCode';
import BasicRadiogroupCode from './codes/BasicRadioGroupCode.tsx?raw';

const BasicRadioGroup = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Styling Radio Group</h4>
            <BasicRadiogroup />
          </div>
          <CodeDialog>{BasicRadiogroupCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicRadioGroup;
