import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadialsimple from './code/DefaultCode'
import ChartRadialsimpleCode from './code/DefaultCode.tsx?raw'

const ChartRadialSimple = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Default</h4>
          <ChartRadialsimple />
        </div>
        <CodeDialog>{ChartRadialsimpleCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadialSimple
