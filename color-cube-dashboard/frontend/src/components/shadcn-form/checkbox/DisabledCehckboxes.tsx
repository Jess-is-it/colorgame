
import CardBox from "../../shared/CardBox";
import Disabledcheck from "./code/DisabledCheckCode";
import DisabledCheckCode from "./code/DisabledCheckCode.tsx?raw";
import CodeDialog from "../../shared/CodeDialog";

const DisabledCehckboxes = () => {
  return (
    <CardBox className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold">Disables</h4>
          <Disabledcheck />
        </div>
        <CodeDialog>{DisabledCheckCode}</CodeDialog>
      </div>

    </CardBox>
  );
};

export default DisabledCehckboxes;
