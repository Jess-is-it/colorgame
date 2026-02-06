import { Button } from '@headlessui/react'

const DisableOutlineBtn = () => {
  return (
    <div>
      <div className='flex gap-3 flex-wrap'>
        <Button
          className='ui-button border border-primary text-primary !cursor-not-allowed'
          disabled>
          Primary
        </Button>
        <Button
          className='ui-button border border-secondary text-secondary  !cursor-not-allowed'
          disabled>
          Secondary
        </Button>
        <Button
          className='ui-button border border-success text-success !cursor-not-allowed'
          disabled>
          Success
        </Button>
        <Button
          className='ui-button border border-error text-error !cursor-not-allowed'
          disabled>
          Error
        </Button>
        <Button
          className='ui-button border border-warning text-warning !cursor-not-allowed'
          disabled>
          Warning
        </Button>
        <Button
          className='ui-button border border-info text-info !cursor-not-allowed'
          disabled>
          Info
        </Button>
      </div>
    </div>
  )
}

export default DisableOutlineBtn
