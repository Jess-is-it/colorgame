import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import DisableListboxOption from './codes/DisableListboxOptionCode';
import DisableListboxOptionCode from './codes/DisableListboxOptionCode.tsx?raw';

const DisableListBox = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disable Listbox Option</h4>
            <DisableListboxOption />
          </div>
          <CodeDialog>{DisableListboxOptionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableListBox;
