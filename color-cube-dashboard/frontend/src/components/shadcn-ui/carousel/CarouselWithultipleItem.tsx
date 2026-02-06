
import CardBox from '../../shared/CardBox'
import CarouselMultipleitem from './code/CarouselMultipleItemCode'
import CarouselMultipleItemCode from './code/CarouselMultipleItemCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const CarouselWithultipleItem = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Carousel With Multiple Item</h4>
          <CarouselMultipleitem />
        </div>
        <CodeDialog>{CarouselMultipleItemCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default CarouselWithultipleItem
