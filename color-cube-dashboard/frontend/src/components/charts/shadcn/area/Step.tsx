import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartAreastep from './code/StepCode'
import ChartAreastepCode from './code/StepCode.tsx?raw'

const ChartAreaStep = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Step</h4>
          <ChartAreastep />
        </div>
        <CodeDialog>{ChartAreastepCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartAreaStep
