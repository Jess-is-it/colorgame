
import CardBox from '../../shared/CardBox'
import Outlinebadge from './code/OutlineBadgeCode'
import OutlineBadgeCode from './code/OutlineBadgeCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const OutlineBadge = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Outline Badge</h4>
          <Outlinebadge />
        </div>
        <CodeDialog>{OutlineBadgeCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default OutlineBadge
