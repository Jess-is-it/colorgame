import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadialgrid from './code/GridCode'
import ChartRadialgridCode from './code/GridCode.tsx?raw'

const ChartRadialGrid = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Grid</h4>
          <ChartRadialgrid />
        </div>
        <CodeDialog>{ChartRadialgridCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadialGrid
