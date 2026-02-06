import { Link } from 'react-router';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Footer = () => {
  return (
    <>
      <div className="bg-white dark:bg-dark ">
        <div className="container">
          <div className="py-10 text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <div>
              <p className="text-ld ">
                <span className="opacity-90">
                  All rights reserved by TailwindAdmin.<br></br>
                  Designed & Developed by
                </span>
                <Link
                  to="https://tailwind-admin.com/"
                  target="_blank"
                  className="text-ld  font-medium underline underline-offset-4 decoration-primary text-primary-ld ps-1"
                >
                  Tailwind Admin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
