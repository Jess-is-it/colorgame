import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import LabelWithList from './codes/LabelWithListcode';
import LabelWithListCode from './codes/LabelWithListcode.tsx?raw';

const LabelListbox = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Label With Listbox</h4>
            <LabelWithList />
          </div>
          <CodeDialog>{LabelWithListCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default LabelListbox;
