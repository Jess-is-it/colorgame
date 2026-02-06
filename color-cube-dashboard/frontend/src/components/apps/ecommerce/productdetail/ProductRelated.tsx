import React from 'react';
import { Link } from 'react-router';
import ProductsData from 'src/api/ecommerce/productsdata';
import { Icon } from '@iconify/react';
import RatingStars from 'src/components/shared/RatingStars';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';

const ProductRelated = () => {
  return (
    <>
      <div className="mt-10">
        <h5 className="text-xl">Related Products</h5>
        <div className="grid grid-cols-12 gap-5 mt-4">
          {ProductsData.map((product, index) => (
            <React.Fragment key={index}>
              {product.related == true ? (
                <div className="lg:col-span-3 md:col-span-6 col-span-12" key={product.id}>
                  <Card className="p-0 overflow-hidden group card-hover group">
                    <div className="relative">
                      <Link to={`/apps/ecommerce/detail/${product.id}`}>
                        <div className="overflow-hidden h-[265px]">
                          <img
                            src={product.photo}
                            alt="tailwindadmin"
                            height={265}
                            width={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 pt-4">
                          <div className="flex justify-between items-center -mt-8 ">
                            <div className="ms-auto relative z-10">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="default"
                                      className="ms-auto p-0 h-10 w-10 rounded-full"
                                      aria-label="Add to cart"
                                    >
                                      <Icon icon="tabler:basket" height={18} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="top">Add to Cart</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <h6 className="text-base line-clamp-1 group-hover:text-primary">
                            {product.title}
                          </h6>
                          <div className="flex justify-between items-center mt-1">
                            <h5 className="text-base flex gap-2 items-center">
                              ${product.price}{' '}
                              <span className="font-normal text-sm text-darklink line-through">
                                ${product.salesPrice}
                              </span>
                            </h5>
                            <RatingStars rating={product.rating} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </Card>
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductRelated;
