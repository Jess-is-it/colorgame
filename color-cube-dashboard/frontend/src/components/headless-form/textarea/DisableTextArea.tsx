import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import DisableTextArea from './codes/DisableTextAreaCode';
import DisableTextAreaCode from './codes/DisableTextAreaCode.tsx?raw';

const DisableTextarea = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold">Disabled Textarea</h4>
            <DisableTextArea />
          </div>
          <CodeDialog>{DisableTextAreaCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableTextarea;
