import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import ListDesc from './codes/ListDescCode';
import ListDescCode from './codes/ListDescCode.tsx?raw';

const ListboxWithDescription = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Listbox With Description</h4>
            <ListDesc />
          </div>
          <CodeDialog>{ListDescCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default ListboxWithDescription;
