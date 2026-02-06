import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { EcommerceContext } from 'src/context/ecommerce-context';
import { ProductType } from 'src/types/apps/ecommerce';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { MdCheck } from 'react-icons/md';
import RatingStars from 'src/components/shared/RatingStars';
import { Alert, AlertDescription } from 'src/components/ui/alert';

const ProductDetail = () => {
  const { products, addToCart } = useContext(EcommerceContext);
  const { id } = useParams<{ id: string }>();

  const [cartAlert, setCartAlert] = useState(false);

  const navigate = useNavigate();

  // Find product by id
  const product: ProductType | undefined = products.find(
    (prod) => prod.id === parseInt(id as string),
  );

  // States for color selection and quantity
  const [scolor, setScolor] = useState<string>(product ? product.colors[0] : '');
  const [count, setCount] = useState<number>(1);

  // Handle color selection
  const setColor = (color: string) => {
    setScolor(color);
  };

  // Handle quantity change
  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setCount(count + 1);
    } else {
      setCount(count > 1 ? count - 1 : 1);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    // if (product) {
    //   addToCart({ ...product, qty: count });
    // }

    setCartAlert(true);
    setTimeout(() => {
      setCartAlert(false);
    }, 3000);
    if (product) {
      addToCart(product.id);
    }
  };

  const handleBuyNow = async () => {
    if (product) {
      await addToCart(product.id); // add product
      navigate('/apps/ecommerce/checkout'); // go to checkout
    }
  };

  return (
    <>
      {/* Category */}
      {product ? (
        <>
          <div className="flex gap-2 items-center">
            <Badge variant={product.stock ? 'default' : 'destructive'}>
              {product.stock == true ? 'In Stock' : ' Out Of Stock'}
            </Badge>
            <span className="text-xs text-darklink"> {product.category}</span>
          </div>
          <h4 className="text-xl my-2">{product.title}</h4>
          <p className="text-sm text-darklink">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex arcu, tincidunt bibendum
            felis.
          </p>
          {/* Price */}
          <h5 className="text-xl flex gap-2 items-center my-3">
            <span className=" text-lg text-darklink line-through font-semibold">
              ${product.salesPrice}
            </span>
            ${product.price}
          </h5>
          {/* Rattings */}
          <div className="flex items-center gap-2">
            <RatingStars rating={4} />
            <span className="text-sm text-ld font-medium">(236 reviews)</span>
          </div>
          <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700 my-6" />
          {/* Colors */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-base text-ld font-semibold">Colors:</span>
            <div className="flex items-center gap-2">
              {product?.colors.map((color, index) => (
                <div
                  key={index}
                  className={`h-6 w-6 rounded-full cursor-pointer flex items-center justify-center ${
                    scolor === color ? `bg-${color}` : ''
                  }`}
                  onClick={() => setColor(color)}
                  style={{
                    transition: '0.1s ease-in',
                    backgroundColor: `${color}`,
                  }}
                >
                  {' '}
                  {scolor === color ? <MdCheck size={16} className="text-white" /> : ''}
                </div>
              ))}
            </div>
          </div>
          {/* Qty */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-base font-semibold">QTY:</span>
            <div className="flex items-center border border-ld rounded-md">
              <button
                type="button"
                onClick={() => handleQuantityChange(false)}
                className="h-10 w-10 flex items-center justify-center hover:bg-accent"
              >
                <span className="text-xl">-</span>
              </button>
              <input
                type="text"
                readOnly
                value={count}
                className="w-12 text-center h-10 border-x border-ld"
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(true)}
                className="h-10 w-10 flex items-center justify-center hover:bg-accent"
              >
                <span className="text-xl">+</span>
              </button>
            </div>
          </div>
          <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700 my-6" />
          {/* Action Buttons */}
          <div className="flex gap-3 items-center mb-6">
            <Button className="px-6 rounded-md" onClick={handleBuyNow}>
              Buy now
            </Button>
            <Button variant={'destructive'} className="px-6 rounded-md" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
          <p className="text-sm text-darklink ">Dispatched in 2-3 weeks</p>
          <Link to="" className="text-sm text-ld text-primary-ld font-medium">
            Why the longer time for delivery?
          </Link>
        </>
      ) : (
        'No product'
      )}

      {cartAlert && (
        <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center">
          <Alert variant="primary" className="max-w-sm w-full text-center rounded">
            <AlertDescription>Item Added to the Cart!!!</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
