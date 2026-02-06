import { Link } from 'react-router';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import SocialButtons from '../authforms/SocialButtons';
import AuthRegister from '../authforms/AuthRegister';
import { Card } from 'src/components/ui/card';

const Register = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-lightprimary dark:bg-darkprimary">
        <div className="flex h-full justify-center items-center px-4">
          <Card className="md:w-[450px] w-full border-none">
            <div className="flex items-center justify-center mb-6">
              <FullLogo />
            </div>
            <SocialButtons title="or sign up with" />
            <AuthRegister />
            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-start">
              <p>Already have an Account?</p>
              <Link to={'/auth/auth2/login'} className="text-primary text-sm font-medium">
                Sign in
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
