import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLinelabel from './code/LabelCode'
import ChartLinelabelCode from './code/LabelCode.tsx?raw'

const ChartLineLabel = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Label</h4>
          <ChartLinelabel />
        </div>
        <CodeDialog>{ChartLinelabelCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartLineLabel
