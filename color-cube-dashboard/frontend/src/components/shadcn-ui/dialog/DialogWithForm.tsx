

import CardBox from '../../shared/CardBox'
import DialogwithForm from './code/DialogWithFormCode'
import DialogWithFormCode from './code/DialogWithFormCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const DialogWithForm = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Dialog With Form</h4>
          <DialogwithForm />
        </div>
        <CodeDialog>{DialogWithFormCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default DialogWithForm
