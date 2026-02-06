import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import WithBackdrop from './codes/WithBackdropCode';
import WithBackdropCode from './codes/WithBackdropCode.tsx?raw';

const DialogWithBackdrop = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Dialog With Backdrop</h4>
            <WithBackdrop />
          </div>
          <CodeDialog>{WithBackdropCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DialogWithBackdrop;
