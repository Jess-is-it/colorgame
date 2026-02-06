import iconConnect from 'src/assets/images/svgs/icon-connect.svg';
import iconSpeechBubble from 'src/assets/images/svgs/icon-speech-bubble.svg';
import iconFavorites from 'src/assets/images/svgs/icon-favorites.svg';
import iconMailbox from 'src/assets/images/svgs/icon-mailbox.svg';
import iconBriefcase from 'src/assets/images/svgs/icon-briefcase.svg';
import iconUser from 'src/assets/images/svgs/icon-user-male.svg';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import { Link } from 'react-router';
import { Card } from 'src/components/ui/card';

const TopCards = () => {
  const TopCardInfo = [
    {
      key: 'card1',
      title: 'Invoices',
      desc: '59',
      img: iconConnect,
      bgcolor: 'bg-lightprimary dark:bg-lightprimary ',
      textclr: 'text-primary dark:text-primary',
      url: '/apps/invoice/list',
    },
    {
      key: 'card2',
      title: 'Chats',
      desc: '3,560',
      img: iconSpeechBubble,
      bgcolor: 'bg-lightsuccess dark:bg-lightsuccess',
      textclr: 'text-success dark:text-success',
      url: '/apps/chats',
    },
    {
      key: 'card3',
      title: 'Blogs',
      desc: '696',
      img: iconFavorites,
      bgcolor: 'bg-lighterror dark:bg-lighterror',
      textclr: 'text-error dark:text-error',
      url: '/apps/blog/post',
    },
    {
      key: 'card4',
      title: 'Email',
      desc: '356',
      img: iconMailbox,
      bgcolor: 'bg-lightsecondary dark:bg-lightsecondary',
      textclr: 'text-secondary dark:text-secondary',
      url: '/apps/email',
    },
    {
      key: 'card5',
      title: 'Products',
      desc: '$96k',
      img: iconBriefcase,
      bgcolor: 'bg-lightwarning dark:bg-lightwarning',
      textclr: 'text-warning dark:text-warning',
      url: '/apps/ecommerce/shop',
    },
    {
      key: 'card7',
      title: 'Follower',
      desc: '96',
      img: iconUser,
      bgcolor: 'bg-lightprimary dark:bg-lightprimary',
      textclr: 'text-primary dark:text-primary',
      url: '/apps/user-profile/followers',
    },
    {
      key: 'card8',
      title: 'Icons',
      desc: '696',
      img: iconFavorites,
      bgcolor: 'bg-lighterror dark:bg-lighterror',
      textclr: 'text-error dark:text-error',
      url: '/icons/iconify',
    },
  ];

  return (
    <>
      <div>
        <Swiper
          slidesPerView={6}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          grabCursor={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            1030: { slidesPerView: 4, spaceBetween: 18 },
            1200: { slidesPerView: 6, spaceBetween: 24 },
          }}
          className="mySwiper"
        >
          {TopCardInfo.map((item) => {
            return (
              <SwiperSlide key={item.key}>
                <Link to={item.url}>
                  <Card className={`!shadow-none ${item.bgcolor} w-full border-none!`}>
                    <div className="text-center hover:scale-105 transition-all ease-in-out">
                      <div className="flex justify-center">
                        <img
                          src={item.img}
                          width="50"
                          height="50"
                          className="mb-3"
                          alt="profile-image"
                        />
                      </div>
                      <p className={`font-semibold ${item.textclr} mb-1`}>{item.title}</p>
                      <h5 className={`text-lg font-semibold ${item.textclr} mb-0`}>{item.desc}</h5>
                    </div>
                  </Card>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
export { TopCards };
