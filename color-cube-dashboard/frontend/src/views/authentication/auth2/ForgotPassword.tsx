import { Link } from 'react-router';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import AuthForgotPassword from '../authforms/AuthForgotPassword';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';

const ForgotPassword = () => {
  return (
    <div className="relative overflow-hidden h-screen bg-lightprimary dark:bg-darkprimary">
      <div className="flex h-full justify-center items-center px-4">
        <Card className="md:w-[450px] w-full border-none">
          <div className="mb-6 flex items-center justify-center">
            <FullLogo />
          </div>
          <p className="text-darklink text-sm text-center my-4">
            Please enter the email address associated with your account and We will email you a link
            to reset your password.
          </p>
          <AuthForgotPassword />
          <Button variant={'lightprimary'} asChild className="w-full mt-3">
            <Link to="/auth/auth2/login">Back to Login</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
