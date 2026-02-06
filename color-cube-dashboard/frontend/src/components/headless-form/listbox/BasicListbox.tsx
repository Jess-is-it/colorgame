import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import BasicList from './codes/BasicListCode';
import BasicListCode from './codes/BasicListCode.tsx?raw';

const BasicListbox = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic Listbox</h4>
            <BasicList />
          </div>
          <CodeDialog>{BasicListCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicListbox;
