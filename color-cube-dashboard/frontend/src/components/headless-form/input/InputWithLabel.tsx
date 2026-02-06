import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import InputWithLbl from './codes/InputWithLblCode';
import InputWithLblCode from './codes/InputWithLblCode.tsx?raw';

const InputWithLabel = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Input With Label</h4>
          <InputWithLbl />
        </div>
        <CodeDialog>{InputWithLblCode}</CodeDialog>
      </CardBox>
    </div>
  );
};

export default InputWithLabel;
