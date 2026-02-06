import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import WithDescriptiontextarea from './codes/WithDescriptionTextareaCode';
import WithDescriptiontextareaCode from './codes/WithDescriptionTextareaCode.tsx?raw';

const WithDescriptionTextarea = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold">Discription With Textarea</h4>
            <WithDescriptiontextarea />
          </div>
          <CodeDialog>{WithDescriptiontextareaCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default WithDescriptionTextarea;
