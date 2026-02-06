import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Disabledfieldset from './codes/DisableFieldsetCode';
import DisabledfieldsetCode from './codes/DisableFieldsetCode.tsx?raw';

const DisableFieldset = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disable Fieldset Form</h4>
            <Disabledfieldset />
          </div>
          <CodeDialog>{DisabledfieldsetCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableFieldset;
