import OutlineCard from 'src/components/shared/OutlineCard';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from 'src/components/ui/tooltip';

const BillsTabs = () => {
  return (
    <>
      <TooltipProvider>
        <div className="flex justify-center">
          <div className="lg:w-3/4 w-full flex flex-col gap-7">
            <OutlineCard>
              <h5 className="card-title">Billing Information</h5>
              <div className="grid grid-cols-12 gap-6">
                <div className="md:col-span-6 col-span-12">
                  <div className="flex flex-col gap-3 mt-3">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="bnm">Business Name*</Label>
                      </div>
                      <Input id="bnm" type="text" placeholder="Visitors Analytics" />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="banm">Business Address*</Label>
                      </div>
                      <Input id="banm" type="text" />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="fnm">First Name*</Label>
                      </div>
                      <Input id="fnm" type="text" />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-6 col-span-12">
                  <div className="flex flex-col gap-3 mt-3">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="bssector">Business Sector*</Label>
                      </div>
                      <Input id="bssector" type="text" placeholder="Arts, Media & Entertainment" />
                    </div>

                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="ct">Country*</Label>
                      </div>
                      <Input id="ct" type="text" placeholder="Romania" />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="lnm">Last Name*</Label>
                      </div>
                      <Input id="lnm" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </OutlineCard>

            <OutlineCard>
              <h5 className="card-title">
                Current Plan : <span className="text-success">Executive</span>
              </h5>
              <p className="card-subtitle -mt-1">
                Thanks for being a premium member and supporting our development.
              </p>
              <div className="flex items-center mt-6">
                <div className="flex gap-3.5">
                  <div className="flex justify-center h-12 w-12 rounded-md bg-lightgray dark:bg-darkmuted items-center text-ld">
                    <Icon icon="solar:box-linear" height={20} />
                  </div>
                  <div>
                    <p className="text-sm text-bodytext">Current Plan</p>
                    <h6 className="text-base">750.000 Monthly Visits</h6>
                  </div>
                </div>
                <div className="ms-auto">
                  <Tooltip>
                    <TooltipTrigger>
                      <Icon
                        icon="solar:add-circle-outline"
                        height={18}
                        className="text-dark dark:text-darklink cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>Add</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <Button>Change Plan</Button>
                <Button variant={'lighterror'}>Reset Plan</Button>
              </div>
            </OutlineCard>

            <OutlineCard>
              <h5 className="card-title">Payment Method</h5>
              <p className="card-subtitle -mt-1">On 26 December, 2023</p>
              <div className="flex items-center mt-6">
                <div className="flex gap-3.5">
                  <div className="flex justify-center h-12 w-12 rounded-md bg-lightgray dark:bg-darkmuted items-center text-ld">
                    <Icon icon="solar:box-linear" height={20} />
                  </div>
                  <div>
                    <h6 className="text-base">Visa</h6>
                    <p className="text-sm text-dark dark:text-bodytext">*****2102</p>
                  </div>
                </div>
                <div className="ms-auto">
                  <Tooltip>
                    <TooltipTrigger>
                      <Icon
                        icon="solar:pen-2-outline"
                        height={18}
                        className="text-dark dark:text-darklink cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <p className="text-sm text-bodytext">
                If you updated your payment method, it will only be dislpayed here after your next
                billing cycle.
              </p>
              <Button variant={'lighterror'} className="w-fit">
                Cancel Subscription
              </Button>
            </OutlineCard>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-7">
          <Button>Save</Button>
          <Button variant={'lighterror'}>Cancel</Button>
        </div>
      </TooltipProvider>
    </>
  );
};

export default BillsTabs;
