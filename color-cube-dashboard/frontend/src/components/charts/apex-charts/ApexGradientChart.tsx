import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexGradientchart from './code/ApexGredientChartCode';
import ApexGradientChartCode from './code/ApexGredientChartCode.tsx?raw';

const ApexGradientChart = () => {
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Gradient Chart</h4>
            <ApexGradientchart />
          </div>
          <CodeDialog>{ApexGradientChartCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexGradientChart;
