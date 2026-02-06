import TitleCard from '../../shared/TitleBorderCard'
import { Label } from 'src/components/ui/label'
import { Input } from 'src/components/ui/input'
import { Checkbox } from 'src/components/ui/checkbox'
import { Button } from 'src/components/ui/button'

const OrdinaryForm = () => {
  return (
    <div>
      <TitleCard title='Ordrinary Form'>
        <div className='flex flex-col gap-6'>
          <div className='space-y-1'>
            <div>
              <Label htmlFor='email1'>Email</Label>
            </div>
            <Input
              className='form-control'
              id='email3'
              type='email'
              placeholder='name@tailwindadmin.com'
              required
            />
            <p>
              <>
                We’ll never share your details. Read our
                <a
                  href='#'
                  className='ml-1 font-medium text-primary hover:underline dark:text-primary'>
                  Privacy Policy
                </a>
                .
              </>
            </p>
          </div>
          <div className='space-y-1'>
            <div>
              <Label htmlFor='password1'>Password</Label>
            </div>
            <Input
              className='form-control'
              id='password1'
              type='password'
              required
            />
            <div className='flex items-center gap-2'>
              <Checkbox id='remember' />
              <Label htmlFor='remember' className='mb-0'>
                RememberMe!
              </Label>
            </div>
          </div>
          <div>
            <Button type='submit'>Submit</Button>
          </div>
        </div>
      </TitleCard>
    </div>
  )
}

export default OrdinaryForm
