import { useContext } from 'react';
import { EcommerceContext } from 'src/context/ecommerce-context';
import { ProductType } from 'src/types/apps/ecommerce';
import { Icon } from '@iconify/react';
import OrderSummary from './OrderSummary';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';

interface BillsAddressProps {
  Discount: number;
  total: number;
}

const ProductCart = ({ Discount, total }: BillsAddressProps) => {
  const { cartItems, incrementQuantity, removeFromCart, decrementQuantity } =
    useContext(EcommerceContext);

  return (
    <>
      {/* Table  */}
      <div className="overflow-x-auto">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm font-semibold py-3 md:min-w-[100px] min-w-[250px]">
                Product
              </TableHead>
              <TableHead className="text-sm font-semibold py-3">Quantity</TableHead>
              <TableHead className="text-sm font-semibold py-3 text-end">Price</TableHead>
            </TableRow>
          </TableHeader>
          {cartItems.map((product: ProductType, index) => (
            <TableBody key={index} className="divide-y divide-border dark:divide-darkborder">
              <TableRow>
                <TableCell className="whitespace-nowrap py-5 lg:min-w-auto min-w-[300px]">
                  <div className="flex gap-3 items-center ">
                    <img
                      src={product.photo}
                      alt="product"
                      className="rounded-md"
                      width={80}
                      height={80}
                    />
                    <div className="">
                      <h6 className="text-base">{product.title}</h6>
                      <p className="text-sm text-darklink mb-1"> {product.category}</p>
                      <Icon
                        icon="solar:trash-bin-minimalistic-outline"
                        height={15}
                        className="text-error cursor-pointer"
                        onClick={() => removeFromCart(product.id)}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-5">
                  <form className="max-w-xs">
                    <div className="relative flex items-center text-wrap">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="quantity-input"
                        onClick={() => decrementQuantity(product.id)}
                        className="focus:ring-0 focus:outline-none border border-ld h-[32px] min-w-10 rounded-s-md rounded-e-none text-center flex justify-center items-center hover:bg-lightprimary hover:text-primary"
                      >
                        <span className="text-2xl">-</span>
                      </button>

                      <input
                        type="text"
                        id="quantity-input"
                        data-input-counter
                        aria-describedby="helper-text-explanation"
                        className="!rounded-s-none !rounded-e-none text-center h-[32px] !border-x-0 w-fit max-w-12 border-y border-ld !focus:ring-0 focus:border-ld focus:ring-transparent focus:ring-offset-0 bg-transparent text-sm"
                        placeholder="0"
                        required
                        readOnly
                        value={product.qty}
                      />

                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="quantity-input"
                        onClick={() => incrementQuantity(product.id)}
                        className="focus:ring-0 focus:outline-none border border-ld h-[32px] min-w-10 rounded-e-md rounded-s-none text-center flex justify-center items-center  hover:bg-lightprimary hover:text-primary"
                      >
                        <span className="text-xl">+</span>
                      </button>
                    </div>
                  </form>
                </TableCell>
                <TableCell className="whitespace-nowrap py-5 text-end">
                  <h5 className="text-base">${product.price * product.qty}</h5>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      {/* Order Summery */}
      <OrderSummary Discount={Discount} total={total} />
    </>
  );
};

export default ProductCart;
