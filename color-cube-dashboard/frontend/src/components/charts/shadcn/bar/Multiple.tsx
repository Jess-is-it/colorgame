import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBarmultiple from './code/MultipleCode'
import ChartBarmultipleCode from './code/MultipleCode.tsx?raw'

const ChartBarMultiple = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Multiple</h4>
          <ChartBarmultiple />
        </div>
        <CodeDialog>{ChartBarmultipleCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartBarMultiple
