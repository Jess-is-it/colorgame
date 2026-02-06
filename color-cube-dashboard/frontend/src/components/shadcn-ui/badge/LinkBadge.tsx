
import Linkbadge from './code/LinkBadgeCode'
import LinkBadgeCode from './code/LinkBadgeCode.tsx?raw'
import CardBox from '../../shared/CardBox'
import CodeDialog from '../../shared/CodeDialog'

const LinkBadge = () => {
  return (
    <>
      <CardBox className='p-0'>
        <div>
          <div className='p-6'>
            <h4 className='text-lg font-semibold'>Badge as Link</h4>
            <Linkbadge />
          </div>
          <CodeDialog>{LinkBadgeCode}</CodeDialog>
        </div>
      </CardBox>
    </>
  )
}

export default LinkBadge
