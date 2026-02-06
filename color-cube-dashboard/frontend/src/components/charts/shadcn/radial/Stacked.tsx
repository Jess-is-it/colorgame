import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadialstacked from './code/StackedCode'
import ChartRadialstackedCode from './code/StackedCode.tsx?raw'

const ChartRadialStacked = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Stacked</h4>
          <ChartRadialstacked />
        </div>
        <CodeDialog>{ChartRadialstackedCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadialStacked
