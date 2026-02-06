import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPieDonuttext from './code/DonutWithTextCode'
import ChartPieDonuttextCode from './code/DonutWithTextCode.tsx?raw'

const ChartPieDonutText = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Donut With Text</h4>
          <ChartPieDonuttext />
        </div>
        <CodeDialog>{ChartPieDonuttextCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartPieDonutText
