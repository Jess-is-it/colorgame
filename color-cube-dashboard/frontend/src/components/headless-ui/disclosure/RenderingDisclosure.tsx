import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import RenderDiclosure from './codes/RenderDiclosureCode';
import RenderDiclosureCode from './codes/RenderDiclosureCode.tsx?raw';

const RenderingDisclosure = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Rendering As Different Elements</h4>
            <RenderDiclosure />
          </div>
          <CodeDialog>{RenderDiclosureCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default RenderingDisclosure;
