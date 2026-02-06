import { Button } from '@headlessui/react'

const BasicButtonsCode = () => {
  return (
    <div>
      <div className='flex gap-3 flex-wrap'>
        <Button className='ui-button bg-primary'>Primary</Button>
        <Button className='ui-button bg-secondary text-black'>Secondary</Button>
        <Button className='ui-button bg-success'>Success</Button>
        <Button className='ui-button bg-error'>Error</Button>
        <Button className='ui-button bg-warning'>Warning</Button>
        <Button className='ui-button bg-info'>Info</Button>
      </div>
    </div>
  )
}

export default BasicButtonsCode
