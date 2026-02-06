import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBarnegative from './code/NegativeCode'
import ChartBarnegativeCode from './code/NegativeCode.tsx?raw'

const ChartBarNegative = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Negative</h4>
          <ChartBarnegative />
        </div>
        <CodeDialog>{ChartBarnegativeCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartBarNegative
