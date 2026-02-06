import * as ClientRev from '../data';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'src/components/ui/card';
import RatingStars from 'src/components/shared/RatingStars';
import trustPilotlogo from 'src/assets/images/svgs/logo-truestpilot.svg';
import trustPilotlogoDark from 'src/assets/images/svgs/logo-truestpilot-dark.svg';
import { useContext } from 'react';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { Link } from 'react-router';

const ClientReviews = () => {
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    swipeToSlide: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { activeMode } = useContext(CustomizerContext);
  const trustPilotImg = activeMode === 'dark' ? trustPilotlogoDark : trustPilotlogo;

  return (
    <>
      <>
        <div className="bg-white dark:bg-dark">
          <div className="container md:py-20 py-12 ">
            <div className="lg:w-3/5 w-full mx-auto" data-aos="fade-up" data-aos-duration="500">
              <h2
                className="text-center sm:text-4xl text-2xl mt-8 font-bold sm:!leading-[45px]"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                Don’t just take our words for it, See what developers like you are saying
              </h2>
            </div>
            <div
              className="slider-container client-reviews pt-14"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="1000"
            >
              <Slider {...settings}>
                {ClientRev.userReview.map((item, index) => (
                  <div key={index}>
                    <Link to={item.link} target="_blank">
                      <Card className="bg-lightgray dark:bg-darkmuted flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3 items-center">
                            <img src={item.img} alt="review" className="h-10 w-10 rounded-full" />
                            <div>
                              <h6 className="text-base">{item.title}</h6>
                              <p className="text-sm text-ld opacity-80 truncate text-ellipsis max-w-32">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                          <img src={trustPilotImg} alt="Truestpilot" width={80} height={40} />
                        </div>
                        <p className="text-sm text-ld opacity-90 line-clamp-3">{item.review}</p>
                        <div>
                          <RatingStars rating={item.rating} />
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ClientReviews;
