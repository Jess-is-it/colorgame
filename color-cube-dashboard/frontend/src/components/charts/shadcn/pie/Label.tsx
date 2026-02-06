import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPielabel from './code/LabelCode'
import ChartPielabelCode from './code/LabelCode.tsx?raw'

const ChartPieLabel = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Label</h4>
          <ChartPielabel />
        </div>
        <CodeDialog>{ChartPielabelCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartPieLabel
