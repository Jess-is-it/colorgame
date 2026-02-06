import { Description, Field, Label, Textarea } from '@headlessui/react'

const WithDescriptionTextareaCode = () => {
  return (
    <>
      <div>
        <Field>
          <Label className='text-ld mb-1 block font-medium'>Type Here</Label>
          <Description className='text-darklink text-xs mb-2'>
            Add any extra information about your event here.
          </Description>
          <Textarea
            name='description'
            className='ui-form-control rounded-lg'
            rows={6}></Textarea>
        </Field>
      </div>
    </>
  )
}

export default WithDescriptionTextareaCode
