import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexRadialchart from './code/ApexRadialbarChartCode';
import ApexRadialChartCode from './code/ApexRadialbarChartCode.tsx?raw';

const ApexRadialChart = () => {
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Radialbar Chart</h4>
            <ApexRadialchart />
          </div>
          <CodeDialog>{ApexRadialChartCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexRadialChart;
