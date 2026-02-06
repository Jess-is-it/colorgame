import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartAreastacked from './code/StackedCode'
import ChartAreastackedCode from './code/StackedCode.tsx?raw'

const ChartAreaStacked = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Stacked</h4>
          <ChartAreastacked />
        </div>
        <CodeDialog>{ChartAreastackedCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartAreaStacked
