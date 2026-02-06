

import CardBox from '../../shared/CardBox'
import IconBadge from './code/IconBadgeCode'
import IconBadgeCode from './code/IconBadgeCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const Iconbadge = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Icon Badge</h4>
          <IconBadge />
        </div>
        <CodeDialog>{IconBadgeCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default Iconbadge
