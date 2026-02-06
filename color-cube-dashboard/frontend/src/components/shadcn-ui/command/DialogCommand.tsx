

import CardBox from '../../shared/CardBox'
import Dialogcommand from './code/DialogCommandCode'
import DialogCommandCode from './code/DialogCommandCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const DialogCommand = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <div>
            <h4 className='text-lg font-semibold'>Dialog Command</h4>
            <p>Please press CTRL + J to show command dialog</p>
          </div>
          <Dialogcommand />
        </div>
        <CodeDialog>{DialogCommandCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default DialogCommand
