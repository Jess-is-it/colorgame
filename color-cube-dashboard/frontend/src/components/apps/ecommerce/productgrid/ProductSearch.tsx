import React, { useContext } from 'react';
import { EcommerceContext } from 'src/context/ecommerce-context';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';
import InputPlaceholderAnimate from 'src/components/animated-component/AnimatedInputPlaceholder';

type Props = {
  onClickFilter: (event: React.MouseEvent<HTMLElement>) => void;
};
const ProductSearch = ({ onClickFilter }: Props) => {
  const { searchProduct, searchProducts } = useContext(EcommerceContext);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <h5 className="card-title lg:flex hidden">Products</h5>
          <Button
            variant={'lightprimary'}
            className="btn-circle p-0 lg:!hidden flex"
            onClick={onClickFilter}
          >
            <Icon icon="tabler:menu-2" height={18} />
          </Button>
        </div>

        <div className="relative">
          <InputPlaceholderAnimate
            value={searchProduct}
            onChange={searchProducts}
            placeholders={['Search products...', 'Find top products...', 'Look up products...']}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon icon="solar:magnifer-line-duotone" height={18} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSearch;
