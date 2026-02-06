

import CardBox from '../../shared/CardBox'
import Basiccard from './code/BasicCardCode'
import BasiccardCode from './code/BasicCardCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BasicCard = () => {
  return (
    <>
      <CardBox className='p-0'>
        <div>
          <div className='p-6'>
            <Basiccard />
          </div>
          <CodeDialog>{BasiccardCode}</CodeDialog>
        </div>
      </CardBox>
    </>
  )
}

export default BasicCard
