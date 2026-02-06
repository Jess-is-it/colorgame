

import CardBox from '../../shared/CardBox'
import Basictab from './code/BasicTabCode'
import BasicTabCode from './code/BasicTabCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BasicTab = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Tab With Form</h4>
          <Basictab />
        </div>
        <CodeDialog>{BasicTabCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BasicTab
