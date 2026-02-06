import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBarmixed from './code/MixedCode'
import ChartBarmixedCode from './code/MixedCode.tsx?raw'

const ChartBarMixed = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Mixed</h4>
          <ChartBarmixed />
        </div>
        <CodeDialog>{ChartBarmixedCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartBarMixed
