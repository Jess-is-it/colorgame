import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import ListBoxWithHtml from './codes/ListBoxWithHtmlCode';
import ListBoxWithHtmlCode from './codes/ListBoxWithHtmlCode.tsx?raw';

const ListBoxWithHtmlForm = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Using HTML forms</h4>
            <ListBoxWithHtml />
          </div>
          <CodeDialog>{ListBoxWithHtmlCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default ListBoxWithHtmlForm;
