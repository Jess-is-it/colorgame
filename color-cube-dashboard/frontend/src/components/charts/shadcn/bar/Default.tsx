import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBardefault from './code/DefaultCode'
import ChartBardefaultCode from './code/DefaultCode.tsx?raw'

const ChartBarDefault = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Default</h4>
          <ChartBardefault />
        </div>
        <CodeDialog>{ChartBardefaultCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartBarDefault
