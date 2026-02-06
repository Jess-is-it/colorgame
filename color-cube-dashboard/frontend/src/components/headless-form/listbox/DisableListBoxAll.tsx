import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import DisableListbox from './codes/DisableListboxCode';
import DisableListboxCode from './codes/DisableListboxCode.tsx?raw';

const DisableListAll = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disable Listbox</h4>
            <DisableListbox />
          </div>
          <CodeDialog>{DisableListboxCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableListAll;
