import { Link } from 'react-router';
import { Button } from 'src/components/ui/button';
import banner from 'src/assets/images/frontend-pages/background/design-collection.png';

export const FeatureBanner = () => {
  return (
    <div className="px-4 container">
      <div className=" bg-lightprimary rounded-2xl relative overflow-hidden">
        <div className="flex w-full">
          <div className="lg:w-6/12 w-full lg:p-24 py-12 px-4 lg:pe-10 pe-0">
            <h3 className="md:text-40 text-32 font-bold leading-tight text-link dark:text-white">
              Develop with feature-rich ReactJs Dashboard
            </h3>
            <div className="my-6 flex items-center gap-4">
              <Button asChild variant={'default'}>
                <Link to="/auth/auth1/login">Login</Link>
              </Button>
              <Button asChild variant={'outline'}>
                <Link to="/auth/auth1/register">Register</Link>
              </Button>
            </div>
            <p className="text-base font-medium text-link dark:text-white">
              <span className="font-semibold">One-time purchase</span> - no recurring fees.
            </p>
          </div>
        </div>
        <img
          src={banner}
          alt="banner"
          className="absolute top-0 -end-[300px] rtl:-scale-x-100 lg:block hidden"
        />
      </div>
    </div>
  );
};
