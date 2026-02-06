

import CardBox from '../../shared/CardBox'
import Basiccarousel from './code/BasicCarouselCode'
import BasicCarouselCode from './code/BasicCarouselCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BasicCarousel = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Basic Carousel</h4>
          <Basiccarousel />
        </div>
        <CodeDialog>{BasicCarouselCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BasicCarousel
