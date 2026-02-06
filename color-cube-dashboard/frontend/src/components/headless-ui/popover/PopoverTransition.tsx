import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Popovertransition from './codes/PopoverTransitionCode';
import PopovertransitionCode from './codes/PopoverTransitionCode.tsx?raw';

const PopoverTransition = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Popover Transitions</h4>
            <Popovertransition />
          </div>
          <CodeDialog>{PopovertransitionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default PopoverTransition;
