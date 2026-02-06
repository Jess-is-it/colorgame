

import CardBox from '../../shared/CardBox'
import CodeDialog from '../../shared/CodeDialog'
import Formcard from './code/FormCardCode'
import FormcardCode from './code/FormCardCode.tsx?raw'

const FormCard = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <Formcard />
        </div>
        <CodeDialog>{FormcardCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default FormCard
