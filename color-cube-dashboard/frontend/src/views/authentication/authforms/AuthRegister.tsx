import React from 'react';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { useNavigate } from 'react-router';

const AuthRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Redirect to home or dashboard
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div>
        <Label htmlFor="name" className="font-semibold">
          Name
        </Label>
        <Input id="name" name="name" type="text" placeholder="Enter your full name" required />
      </div>

      <div>
        <Label htmlFor="email" className="font-semibold">
          Email Address
        </Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" required />
      </div>

      <div>
        <Label htmlFor="password" className="font-semibold">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter a strong password"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
};

export default AuthRegister;
