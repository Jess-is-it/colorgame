import { Link } from 'react-router';
import { Button } from 'src/components/ui/button';
import { Card } from 'src/components/ui/card';

const Ticket = () => {
  return (
    <>
      <div className="bg-white dark:bg-dark">
        <div className="container">
          <div
            className="lg:w-2/4 w-full mx-auto"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="1000"
          >
            <Card className="bg-no-repeat bg-center bg-[url('src/assets/images/landingpage/shape/line-bg.svg')]">
              <div className="pb-4 text-center">
                <h3 className="text-2xl">
                  Haven't found an answer to your question?
                </h3>
                <div className="sm:flex justify-center gap-4 mt-8">
                  <Button
                    asChild
                  >
                    <Link to="https://tailwind-admin.com/support" target="_blank">
                      Submit Ticket
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
