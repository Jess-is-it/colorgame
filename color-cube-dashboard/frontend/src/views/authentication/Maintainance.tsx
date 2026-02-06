import { Link } from 'react-router';
import Lottie from 'lottie-react';
import maintenance from 'src/assets/animation/maintenance.json';
import { Button } from 'src/components/ui/button';

const Maintainance = () => {
  return (
    <>
      <div className="h-screen flex items-center  justify-center bg-white dark:bg-darkgray ">
        <div className="text-center">
          <div className="max-w-3xl">
            <Lottie animationData={maintenance} loop={true} />;
          </div>
          <h1 className="text-dark dark:text-white text-4xl mb-6">Maintenance Mode!!!</h1>
          <h6 className="text-xl text-dark dark:text-white">
            Website is Under Construction. Check back later!
          </h6>
          <Button asChild className="mt-6 mx-auto">
            <Link to="/">Go Back to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Maintainance;
