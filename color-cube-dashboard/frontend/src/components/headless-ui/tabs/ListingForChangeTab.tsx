import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import ListingTabChange from './codes/ListingTabChangeCode';
import ListingTabChangeCode from './codes/ListingTabChangeCode.tsx?raw';

const ListingForChangeTab = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Listening For Changes Tab</h4>
            <ListingTabChange />
          </div>
          <CodeDialog>{ListingTabChangeCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default ListingForChangeTab;
