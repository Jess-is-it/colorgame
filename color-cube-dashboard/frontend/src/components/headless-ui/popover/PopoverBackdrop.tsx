import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import PopoverBgDrop from './codes/PopoverBgDropcode';
import PopoverBgDropCode from './codes/PopoverBgDropcode.tsx?raw';

const PopoverBackdrops = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Popover Backdrop</h4>
            <PopoverBgDrop />
          </div>
          <CodeDialog>{PopoverBgDropCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default PopoverBackdrops;
