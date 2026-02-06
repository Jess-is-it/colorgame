import { Textarea } from '@headlessui/react'

const BasicTextareaCode = () => {
  return (
    <>
      <div>
        <Textarea
          name='description'
          className='ui-form-control rounded-lg'
          rows={6}></Textarea>
      </div>
    </>
  )
}

export default BasicTextareaCode
