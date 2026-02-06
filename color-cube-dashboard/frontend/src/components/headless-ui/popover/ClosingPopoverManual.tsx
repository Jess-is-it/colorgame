import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import ClosingManually from './codes/ClosingManuallyCode';
import ClosingManuallyCode from './codes/ClosingManuallyCode.tsx?raw';

const ClosingPopoverManual = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Closing Popovers Manually</h4>
            <ClosingManually />
          </div>
          <CodeDialog>{ClosingManuallyCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default ClosingPopoverManual;
