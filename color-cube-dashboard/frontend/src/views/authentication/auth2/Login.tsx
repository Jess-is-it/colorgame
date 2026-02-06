import { Link } from "react-router";
import FullLogo from "src/layouts/full/shared/logo/FullLogo";
import SocialButtons from "../authforms/SocialButtons";
import AuthLogin from "../authforms/AuthLogin";
import { Card } from "src/components/ui/card";


const Login = () => {
  return (
    <>
      <div className="relative overflow-hidden h-screen bg-lightprimary dark:bg-darkprimary">
        <div className="flex h-full justify-center items-center px-4">
          <Card className="md:w-[450px] w-full border-none">
            <div className="mb-6 flex items-center justify-center">
              <FullLogo />
            </div>
            <SocialButtons title="or sign in with" />
            <AuthLogin />
            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
              <p>New to TailwindAdmin?</p>
              <Link
                to={"/auth/auth2/register"}
                className="text-primary text-sm font-medium"
              >
                Create an account
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
