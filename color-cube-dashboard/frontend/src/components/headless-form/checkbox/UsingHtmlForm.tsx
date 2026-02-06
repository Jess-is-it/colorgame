import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import UsingHtmlform from './codes/UsingHtmlFormCode';
import UsingHtmlformCode from './codes/UsingHtmlFormCode.tsx?raw';

const UsingHtmlForm = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">With HTML Forms</h4>
            <UsingHtmlform />
          </div>
          <CodeDialog>{UsingHtmlformCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default UsingHtmlForm;
