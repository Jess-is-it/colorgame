import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import FramerMotionDialog from './codes/FramerMotionDialogCode';
import FramerMotionDialogCode from './codes/FramerMotionDialogCode.tsx?raw';

const FramerAnimationDialog = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Framer Motion Dialog</h4>
            <FramerMotionDialog />
          </div>
          <CodeDialog>{FramerMotionDialogCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default FramerAnimationDialog;
