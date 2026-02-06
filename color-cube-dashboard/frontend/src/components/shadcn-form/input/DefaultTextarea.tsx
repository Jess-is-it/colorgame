
import CardBox from '../../shared/CardBox'
import DafaultTextareacode from './code/DafaultTextareacode'

const DefaultTextarea = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Default Textarea</h4>
          <DafaultTextareacode />
        </div>
      </div>
    </CardBox>
  )
}

export default DefaultTextarea
