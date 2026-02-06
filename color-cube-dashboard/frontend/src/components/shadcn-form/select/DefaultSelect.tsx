
import CardBox from "../../shared/CardBox";
import Defaultselect from "./code/DefaultSelectCode";
import DefaultSelectCode from "./code/DefaultSelectCode.tsx?raw";
import CodeDialog from "../../shared/CodeDialog";
const DefaultSelect = () => {
  return (
    <CardBox className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold">Default</h4>
          <Defaultselect />
        </div>
        <CodeDialog>{DefaultSelectCode}</CodeDialog>
      </div>
    </CardBox>
  );
};

export default DefaultSelect;
