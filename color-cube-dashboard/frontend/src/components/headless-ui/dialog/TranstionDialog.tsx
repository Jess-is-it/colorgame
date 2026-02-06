import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Transitiondialog from './codes/TransitionDialogCode';
import TransitiondialogCode from './codes/TransitionDialogCode.tsx?raw';

const TranstionDialog = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Transitions Dialog</h4>
            <Transitiondialog />
          </div>
          <CodeDialog>{TransitiondialogCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default TranstionDialog;
