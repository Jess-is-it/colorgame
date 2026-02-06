import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router';
import { EcommerceContext } from 'src/context/ecommerce-context';

// Carousel slider for product
import Slider from 'react-slick';

// Carousel slider data
import SliderData from './SliderData';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductCarousel = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const { id } = useParams();
  const { products } = useContext(EcommerceContext);
  // Find the product by Id
  const product = products.find((p) => p.id === Number(id));
  const getProductImage = product ? product.photo : '';

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 6,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: false,
    className: 'centerThumb',
    speed: 500,
  };

  return (
    <>
      <div className="product">
        {/* Main Slider */}
        <Slider asNavFor={nav2 || undefined} ref={sliderRef1} arrows={false}>
          <img
            src={getProductImage}
            alt="Main Product"
            className="w-full h-[500px] object-cover rounded-md"
          />
          {SliderData.map((items, index) => (
            <div key={index}>
              <img
                src={items.imgPath}
                alt="carousel"
                className="w-full h-[500px] object-cover rounded-md"
              />
            </div>
          ))}
        </Slider>

        {/* Thumbnail Slider */}
        <Slider
          asNavFor={nav1 || undefined}
          ref={sliderRef2}
          {...settings}
          className="mt-2 product-thumb"
        >
          <div className="cursor-pointer p-2">
            <img
              src={getProductImage}
              alt="Thumbnail"
              className=" w-[72px] h-[72px] object-cover rounded-md"
            />
          </div>
          {SliderData.map((items, index) => (
            <div key={index} className="cursor-pointer p-2">
              <img
                src={items.imgPath}
                alt={`Thumbnail ${items.id}`}
                className="w-[72px] h-[72px] object-cover rounded-md"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductCarousel;
