import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLineinteractive from './code/InteractiveCode'
import ChartLineinteractiveCode from './code/InteractiveCode.tsx?raw'

const ChartLineInteractive = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Interactive</h4>
          <ChartLineinteractive />
        </div>
        <CodeDialog>{ChartLineinteractiveCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartLineInteractive
