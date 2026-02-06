import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Basicdisclosure from './codes/BasicDisclosureCode';
import BasicdisclosureCode from './codes/BasicDisclosureCode.tsx?raw';

const BasicDisclosure = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic Disclosure</h4>
            <Basicdisclosure />
          </div>
          <CodeDialog>{BasicdisclosureCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicDisclosure;
