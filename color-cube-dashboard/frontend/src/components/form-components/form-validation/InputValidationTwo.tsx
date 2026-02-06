import React, { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Card } from 'src/components/ui/card';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import { Link } from 'react-router';

// First Form

const modernizFormData = {
  email: '',
  password: '',
};
interface ErrorrMessage {
  email: string;
  password: string;
}
const errorrMessage: ErrorrMessage = {
  email: '',
  password: '',
};
const InputValidationTwo = () => {
  //   Second Form

  const [modeData, setModeData] = useState(modernizFormData);
  const [errorrMessages, setErrorrMessages] = useState(errorrMessage);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setModeData({
      ...modeData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorrMessages(validation(modeData));
  };
  const validation = (formValues: typeof modernizFormData) => {
    let error: ErrorrMessage = {
      email: '',
      password: '',
    };
    console.log(formValues);
    if (!formValues.email) {
      error.email = 'Email is required';
    } else {
      error.email = '';
    }
    if (!formValues.password) {
      error.password = 'Password is required';
    } else if (formValues.password.length < 8) {
      error.password = 'Password should be a minimum of 8 characters.';
    } else {
      error.password = '';
    }
    return error;
  };
  return (
    <div>
      <Card>
        <div className="pb-10 pt-3">
          <FullLogo />
        </div>
        <form onSubmit={handleSubmited}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="email">Email Address</Label>
              </div>
              <Input id="email" type="email" onChange={handleChanges} value={modeData.email} />
              <span className="text-red-500">{errorrMessages.email}</span>
            </div>
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                onChange={handleChanges}
                value={modeData.password}
              />
              <span className="text-red-500">{errorrMessages.password}</span>
            </div>
            <div className="flex items-center gap-2 lg:col-span-6 col-span-12">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="mb-0">
                Remember this Device
              </Label>
            </div>
            <div className="lg:col-span-6 col-span-12 text-end">
              <Link to="/" className="text-primary">
                Forgot Password ?
              </Link>
            </div>
            <div className="col-span-12 flex items-center gap-[1rem]">
              <Button type="submit">Sign Up</Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InputValidationTwo;
