import { Link } from 'react-router';
import Banner from 'src/assets/images/landingpage/background/c2a.png';
import { Button } from 'src/components/ui/button';

const LoginReg = () => {
  return (
    <div className="bg-white dark:bg-dark lg:pt-20 pt-8">
      <div className="bg-primary overflow-hidden ">
        <div className="container">
          <div className="lg:flex justify-between items-center">
            <div className="lg:w-1/2 lg:text-start text-center">
              <h2 className="font-bold lg:text-4xl text-3xl text-white mb-7 lg:pt-0 pt-10 sm:!leading-[50px]">
                Build your app with our highly customizable Tailwind based Dashboard
              </h2>
              <div className="sm:flex lg:justify-start justify-center gap-4">
                <Button asChild variant={'white'}>
                  <Link to="/auth/auth1/login">Login</Link>
                </Button>
                <Button asChild variant={'outlinewhite'}>
                  <Link to="/auth/auth1/register">Register</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-[30%]">
              <div className="flex lg:justify-end justify-center">
                <img src={Banner} alt="tailwindadmin" className="w-auto lg:ms-auto  pt-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginReg;
