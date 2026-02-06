import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from '@headlessui/react'

const FieldsetCode = () => {
  return (
    <div>
      <div>
        <Fieldset className='space-y-6 rounded-xl bg-lightgray dark:bg-darkbody p-6'>
          <Legend className='text-base font-semibold dark:text-white text-dark'>
            Shipping Details
          </Legend>
          <Field>
            <Label className='text-ld font-medium text-sm'>
              Street address
            </Label>
            <Input className='w-full ui-form-control rounded-md py-2 px-3 mt-3' />
          </Field>
          <Field>
            <Label className='text-ld font-medium text-sm'>Country</Label>
            <Description className='text-xs mt-1'>
              We currently only ship to North America.
            </Description>

            <div className='relative'>
              <Select className='ui-form-control dark:focus:bg-dark rounded-md mt-3 p-2'>
                <option className='ui-dropdown-item'>Canada</option>
                <option className='ui-dropdown-item'>Mexico</option>
                <option className='ui-dropdown-item'>United States</option>
              </Select>
            </div>
          </Field>
          <Field>
            <Label className='text-ld font-medium text-sm'>
              Delivery notes
            </Label>
            <Description className='text-xs mt-1'>
              If you have a tiger, we'd like to know about it.
            </Description>
            <Textarea className='ui-form-control rounded-lg mt-3' rows={3} />
          </Field>
        </Fieldset>
      </div>
    </div>
  )
}

export default FieldsetCode
