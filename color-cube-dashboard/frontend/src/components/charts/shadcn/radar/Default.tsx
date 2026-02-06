import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadardefault from './code/DefaultCode'
import ChartRadardefaultCode from './code/DefaultCode.tsx?raw'

const ChartRadarDefault = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Default</h4>
          <ChartRadardefault />
        </div>
        <CodeDialog>{ChartRadardefaultCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadarDefault
