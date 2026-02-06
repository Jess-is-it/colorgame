import React, { useState } from 'react';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Card } from 'src/components/ui/card';
import { Link } from 'react-router';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  password: '',
};
interface ErrorMessage {
  name: string;
  email: string;
  password: string;
}
const errorMessage: ErrorMessage = {
  name: '',
  email: '',
  password: '',
};

const InputValidationOne = () => {
  // First Form
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState(errorMessage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages(validate(formData));
  };

  const validate = (formValues: FormData) => {
    let error: ErrorMessage = {
      name: '',
      email: '',
      password: '',
    };
    console.log(formValues);
    if (!formValues.name) {
      error.name = 'Firstname is required';
    } else if (formValues.name.length < 10) {
      error.name = 'Firstname should be minimum 10 characters.';
    } else {
      error.name = '';
    }
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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <Label htmlFor="name" className="mb-2 block">
                Name
              </Label>
              <Input id="name" type="text" onChange={handleChange} value={formData.name} />
              <span className="text-red-500">{errorMessages.name}</span>
            </div>

            <div className="col-span-12">
              <Label htmlFor="email" className="mb-2 block">
                Email
              </Label>
              <Input id="email" type="email" onChange={handleChange} value={formData.email} />
              <span className="text-red-500">{errorMessages.email}</span>
            </div>

            <div className="col-span-12">
              <Label htmlFor="password" className="mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
              />
              <span className="text-red-500">{errorMessages.password}</span>
            </div>

            <div className="col-span-12">
              <Label htmlFor="confirmpassword" className="mb-2 block">
                Confirm Password
              </Label>
              <Input id="confirmpassword" type="password" onChange={handleChange} />
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
              <Button type="submit" variant="default">
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InputValidationOne;
