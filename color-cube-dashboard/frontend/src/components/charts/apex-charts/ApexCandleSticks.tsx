import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexCandlestick from './code/ApexCandlestickChartCode';
import ApexCandleStickCode from './code/ApexCandlestickChartCode.tsx?raw';

const ApexCandleStick = () => {
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Candlestick Chart</h4>
            <ApexCandlestick />
          </div>
          <CodeDialog>{ApexCandleStickCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexCandleStick;
