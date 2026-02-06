
import CardBox from "../../shared/CardBox";
import Scrollableselect from "./code/ScrollableSelectCode";
import ScrollableSelectCode from "./code/ScrollableSelectCode.tsx?raw";
import CodeDialog from "../../shared/CodeDialog";
const ScrollableSelect = () => {
  return (
    <CardBox className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold">Scrollable</h4>
          <Scrollableselect />
        </div>
        <CodeDialog>{ScrollableSelectCode}</CodeDialog>
      </div>
    </CardBox>
  );
};

export default ScrollableSelect;
