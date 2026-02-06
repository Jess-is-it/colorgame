import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import ButtonAction from './codes/ButtonActionCode';
import ButtonActionCode from './codes/ButtonActionCode.tsx?raw';

const ButtonDropdown = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Button Action</h4>
            <ButtonAction />
          </div>
          <CodeDialog>{ButtonActionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default ButtonDropdown;
