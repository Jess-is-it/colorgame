import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import WithHtmlRadioForm from './codes/WithHtmlRadioFormCode';
import WithHtmlRadioFormCode from './codes/WithHtmlRadioFormCode.tsx?raw';

const WithHtmlForms = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">With HTML forms</h4>
            <WithHtmlRadioForm />
          </div>
          <CodeDialog>{WithHtmlRadioFormCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default WithHtmlForms;
