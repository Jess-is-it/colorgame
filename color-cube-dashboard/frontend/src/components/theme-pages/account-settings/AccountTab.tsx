import OutlineCard from '../../shared/OutlineCard';
import userImg from 'src/assets/images/profile/user-1.jpg';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';

const AccountTab = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="md:col-span-6 col-span-12">
          <OutlineCard>
            <h5 className="card-title">Change Profile</h5>
            <p className="card-subtitle -mt-1">Change your profile picture from here</p>
            <div className="mx-auto text-center mt-5">
              <img
                src={userImg}
                alt="logo"
                height="120"
                width="120"
                className="rounded-full mx-auto"
              />
              <div className="flex justify-center gap-3 py-6">
                <Button>Upload</Button>
                <Button variant={'lighterror'}>Reset</Button>
              </div>
              <p className="text-sm text-bodytext">Allowed JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </OutlineCard>
        </div>
        <div className="md:col-span-6 col-span-12 h-full">
          <OutlineCard className="h-full">
            <h5 className="card-title">Change Password</h5>
            <p className="card-subtitle -mt-1">To change your password please confirm here</p>
            <div className="flex flex-col gap-3 mt-3">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cpwd">Current Password</Label>
                </div>
                <Input id="cpwd" type="password" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="npwd">New Password</Label>
                </div>
                <Input id="npwd" type="password" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cfpwd">Confirm Password</Label>
                </div>
                <Input id="cfpwd" type="password" />
              </div>
            </div>
          </OutlineCard>
        </div>

        <div className="col-span-12">
          <OutlineCard>
            <h5 className="card-title">Personal Details</h5>
            <p className="card-subtitle -mt-1">
              To change your personal detail , edit and save from here
            </p>
            <div className="grid grid-cols-12 gap-6">
              <div className="md:col-span-6 col-span-12">
                <div className="flex flex-col gap-3 mt-3">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ynm">Your Name</Label>
                    </div>
                    <Input id="ynm" type="text" placeholder="Mathew Anderson" />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="loc">Location</Label>
                    </div>
                    <Select>
                      <SelectTrigger id="loc" className="w-full">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ynm">Email</Label>
                    </div>
                    <Input id="em" type="email" placeholder="info@tailwindadmin.com" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-6 col-span-12">
                <div className="flex flex-col gap-3 mt-3">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="store">Store Name</Label>
                    </div>
                    <Input id="store" type="text" placeholder="Macima Studio" />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="curr">Currency</Label>
                    </div>
                    <Select>
                      <SelectTrigger id="curr" className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IN">India (INR)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="GBP">United Kingdom (Pound)</SelectItem>
                        <SelectItem value="RUB">Russia (Ruble)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ph">Phone</Label>
                    </div>
                    <Input id="ph" type="text" placeholder="+91 1234567895" />
                  </div>
                </div>
              </div>
              <div className="col-span-12 -mt-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="add">Address</Label>
                  </div>
                  <Input id="add" type="text" placeholder="814 Howard Street, 120065, India" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-5">
              <Button>Save</Button>
              <Button variant={'lighterror'}>Cancel</Button>
            </div>
          </OutlineCard>
        </div>
      </div>
    </>
  );
};

export default AccountTab;
