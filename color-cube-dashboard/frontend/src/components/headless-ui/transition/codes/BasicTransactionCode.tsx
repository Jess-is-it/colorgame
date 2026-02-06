import { useState } from 'react'
import { Transition } from '@headlessui/react'

const BasicTransactionCode = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((open) => !open)}
        className='ui-button bg-primary justify-center'>
        Toggle Transition
      </button>
      <Transition show={open}>
        <div className='transition duration-300 ease-in data-[closed]:opacity-0 bg-lightgray dark:bg-darkbody rounded-sm shadow-md dark:shadow-dark-md p-4 w-72 '>
          I will fade in and out
        </div>
      </Transition>
    </div>
  )
}

export default BasicTransactionCode
