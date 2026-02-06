

import CardBox from '../../shared/CardBox'
import Cardskeleton from './code/CardSkeletonCode'
import CardSkeletonCode from './code/CardSkeletonCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const CardSkeleton = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Card Skeleton</h4>
          <Cardskeleton />
        </div>
        <CodeDialog>{CardSkeletonCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default CardSkeleton
