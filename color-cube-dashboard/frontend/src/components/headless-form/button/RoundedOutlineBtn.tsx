import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import RoundedOutlinedBtn from './codes/RoundedOutlinedBtnCode';
import RoundedOutlinedBtnCode from './codes/RoundedOutlinedBtnCode.tsx?raw';

const RoundedOutlineBtn = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Rounded Outlined Buttons</h4>
            <RoundedOutlinedBtn />
          </div>
          <CodeDialog>{RoundedOutlinedBtnCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default RoundedOutlineBtn;
