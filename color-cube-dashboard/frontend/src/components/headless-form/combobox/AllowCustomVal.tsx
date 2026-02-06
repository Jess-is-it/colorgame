import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import HtmlForms from './codes/HtmlFormsCodes';
import HtmlFormsCodes from './codes/HtmlFormsCodes.tsx?raw';

const AllowCustomVal = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">HTML Forms</h4>
            <HtmlForms />
          </div>
          <CodeDialog>{HtmlFormsCodes}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default AllowCustomVal;
