import { useState } from 'react'
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

const WithBackdropCode = () => {
  let [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className='ui-button bg-secondary justify-center text-black'>
        Open Dialog
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className='fixed inset-0 bg-black/30' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <DialogPanel
            transition
            className='ui-background-color w-full max-w-md rounded-lg p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>
            <DialogTitle className='text-lg font-semibold text-ld'>
              Deactivate account
            </DialogTitle>
            <Description className='mt-2 text-sm'>
              This will permanently deactivate your account
            </Description>
            <p className='mt-2 text-sm'>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className='flex gap-3 mt-4'>
              <button
                onClick={() => setIsOpen(false)}
                className='ui-button-small bg-error'>
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='ui-button-small bg-warning'>
                Deactivate
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default WithBackdropCode
