import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import laptopDesk from 'src/assets/images/backgrounds/laptop-desk.jpg'
import { Link } from 'react-router';

export default function ProductCarousel() {
  return (
    <Card className="p-0 overflow-hidden h-full">
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        style={
          {
            '--swiper-pagination-color': '#5d87ff',
            '--swiper-navigation-size': '0px',
            '--swiper-pagination-bullet-inactive-color': '#ffffff99',
          } as React.CSSProperties
        }
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="product-carousel h-full"
      >
        <SwiperSlide>
          <div className="realtive overflow-hidden h-full after:absolute after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black/80 after:z-10 after:top-0">
            <img
              src={laptopDesk}
              alt="product_background"
              className="w-full h-full object-cover"
            />
            <div className="w-full flex justify-start absolute bottom-5 start-5 z-20">
              <div className="lg:w-10/12 w-full">
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-white leading-snug">
                    A laptop on a desk with minimal desk
                  </h4>
                  <Link to={'/apps/ecommerce/shop'}>
                    <Button asChild variant="secondary" className="rounded-lg">
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      >
                        Shop Now
                      </motion.button>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="realtive overflow-hidden laptop-desk h-full after:absolute after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black/80 after:z-10 after:top-0">
            <img
              src={laptopDesk}
              alt="product_background"
              className="w-full h-full object-cover"
            />
            <div className="w-full flex justify-start absolute bottom-5 start-5 z-20">
              <div className="lg:w-10/12 w-full">
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-white leading-tight">
                    A laptop on a desk with minimal desk
                  </h4>
                  <Link to={'/apps/ecommerce/shop'}>
                    <Button asChild variant="secondary" className="rounded-lg">
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      >
                        Shop Now
                      </motion.button>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="realtive overflow-hidden laptop-desk h-full after:absolute after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black/80 after:z-10 after:top-0">
            <img
              src={laptopDesk}
              alt="product_background"
              className="w-full h-full object-cover"
            />
            <div className="w-full flex justify-start absolute bottom-5 start-5 z-20">
              <div className="lg:w-10/12 w-full">
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-white leading-tight">
                    A laptop on a desk with minimal desk
                  </h4>
                  <Link to={'/apps/ecommerce/shop'}>
                    <Button asChild variant="secondary" className="rounded-lg">
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      >
                        Shop Now
                      </motion.button>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </Card>
  );
}
