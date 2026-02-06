import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartAreainteractive from './code/InteractiveCode'
import ChartAreainteractiveCode from './code/InteractiveCode.tsx?raw'

const ChartAreaInteractive = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Interactive</h4>
          <ChartAreainteractive />
        </div>
        <CodeDialog>{ChartAreainteractiveCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartAreaInteractive
