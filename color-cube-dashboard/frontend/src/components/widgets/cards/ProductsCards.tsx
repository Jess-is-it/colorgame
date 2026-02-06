/*--Products Cards Images--*/
import proimg1 from 'src/assets/images/products/s2.jpg';
import proimg2 from 'src/assets/images/products/s5.jpg';
import proimg3 from 'src/assets/images/products/s8.jpg';
import proimg4 from 'src/assets/images/products/s11.jpg';

import { Link } from 'react-router';
import CardBox from 'src/components/shared/CardBox';
import { Icon } from '@iconify/react/dist/iconify.js';
import RatingStars from 'src/components/shared/RatingStars';

/*--Products Cards--*/
const productsCardData = [
  {
    title: 'Boat Headphone',
    link: '/',
    photo: proimg1,
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: 'MacBook Air Pro',
    link: '/',
    photo: proimg2,
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: 'Red Valvet Dress',
    link: '/',
    photo: proimg3,
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: 'Cute Soft Teddybear',
    link: '/',
    photo: proimg4,
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
];

const ProductsCards = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-7">
        {productsCardData.map((item, i) => (
          <div className="lg:col-span-3 md:col-span-6 col-span-12" key={i}>
            <Link to={item.link} className="group">
              <CardBox className="p-0 overflow-hidden ">
                <div className="relative">
                  <img src={item.photo} alt="tailwindadmin" />
                </div>
                <div className="px-6 pb-6">
                  <button className='rounded-full z-1 absolute right-4 -top-8 bg-primary text-white flex justify-center items-center p-2 '>
                    <Icon
                      icon='solar:bag-5-linear'
                      height={24}
                      width={24}
                      className='w-6 h-6'
                    />
                  </button>
                  <h5 className="text-lg mb-1">{item.title}</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h6 className="text-h6">${item.price}</h6>
                      <span className="text-sm font-medium line-through text-black/50 dark:text-darklink">
                        ${item.salesPrice}
                      </span>
                    </div>
                    <RatingStars rating={item.rating} />
                  </div>
                </div>
              </CardBox>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsCards;
