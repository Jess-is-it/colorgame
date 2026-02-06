import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLinelinear from './code/LinearCode'
import ChartLinelinearCode from './code/LinearCode.tsx?raw'

const ChartLineLinear = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Linear</h4>
          <ChartLinelinear />
        </div>
        <CodeDialog>{ChartLinelinearCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartLineLinear
