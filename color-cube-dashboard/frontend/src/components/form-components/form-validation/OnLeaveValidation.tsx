import React, { useState } from 'react';
import TitleCard from '../../shared/TitleBorderCard';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';

// Third Form
const onleaveFormData = {
  email: '',
  password: '',
};
interface OnLeaveFormInput {
  email: string;
  password: string;
}

interface ErrorsMessage {
  email: string;
  password: string;
}
const errorsMessage: ErrorsMessage = {
  email: '',
  password: '',
};
const OnLeaveValidation = () => {
  //   Third Form
  const [onleaveData, setOnleaveData] = useState(onleaveFormData);
  const [errorsMessages, setErrorsMessages] = useState(errorsMessage);

  const handlesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOnleaveData({
      ...onleaveData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesBlur = () => {
    setErrorsMessages(validations(onleaveData));
  };

  const handlesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorsMessages(validations(onleaveData));
  };

  //   Third Validate
  const validations = (formValues: OnLeaveFormInput) => {
    let error: ErrorsMessage = {
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
      <TitleCard title="On Leave">
        <form onSubmit={handlesSubmit}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="email">Email Address</Label>
              </div>
              <Input
                id="email"
                type="email"
                onChange={handlesChange}
                onBlur={handlesBlur}
                value={onleaveData.email}
              />
              <span className="text-red-500">{errorsMessages.email}</span>
            </div>
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                onChange={handlesChange}
                onBlur={handlesBlur}
                value={onleaveData.email}
              />
              <span className="text-red-500">{errorsMessages.password}</span>
            </div>
            <div className="col-span-12 flex items-center">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </TitleCard>
    </div>
  );
};

export default OnLeaveValidation;
