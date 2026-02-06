import { useEffect, useState } from 'react';
import { Card } from 'src/components/ui/card';
import { Badge, BadgeProps } from 'src/components/ui/badge';
import { Table, TableBody, TableCell } from 'src/components/ui/table';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';

// Images
import icon1 from 'src/assets/images/frontend-pages/technology/Categories=Nextjs.svg';
import icon2 from 'src/assets/images/frontend-pages/technology/Typescript.svg';
import icon3 from 'src/assets/images/frontend-pages/technology/Categories=Tailwind.svg';
import icon4 from 'src/assets/images/frontend-pages/technology/Categories=React.svg';

export const OrderStatus = () => {
  const CheckoutStatus = [
    {
      key: 'order1',
      productImg: icon1,
      username: 'Irpun Wicaksono',
      email: 'irpun@gmail.com',
      product: 'React Js - Online Classes',
      status: 'Progress',
      color: 'lightWarning',
      price: '$50.00',
    },
    {
      key: 'order2',
      productImg: icon2,
      username: 'Oyhan Ruhiyan',
      email: 'oyhan@gmail.com',
      product: 'Frontend Dev - Online Classes',
      status: 'Delivered',
      color: 'lightSuccess',
      price: '$49.00',
    },
    {
      key: 'order3',
      productImg: icon3,
      username: 'Dayat Santoso',
      email: 'dayat@gmail.com',
      product: 'UX Research - Power Courses',
      status: 'Cancel',
      color: 'lightError',
      price: '$79.00',
    },
    {
      key: 'order4',
      productImg: icon4,
      username: 'Irpun Wicaksono',
      email: 'irpun@gmail.com',
      product: 'React Js - Online Classes',
      status: 'Delivered',
      color: 'lightSuccess',
      price: '$50.00',
    },
  ];

  const PaidStatus = [
    {
      key: 'order1',
      productImg: icon2,
      username: 'Oyhan Ruhiyan',
      email: 'oyhan@gmail.com',
      product: 'Frontend Dev - Online Classes',
      status: 'Delivered',
      color: 'lightSuccess',
      price: '$49.00',
    },
    {
      key: 'order2',
      productImg: icon1,
      username: 'Irpun Wicaksono',
      email: 'irpun@gmail.com',
      product: 'React Js - Online Classes',
      status: 'Progress',
      color: 'lightWarning',
      price: '$50.00',
    },
    {
      key: 'order3',
      productImg: icon4,
      username: 'Irpun Wicaksono',
      email: 'irpun@gmail.com',
      product: 'React Js - Online Classes',
      status: 'Delivered',
      color: 'lightSuccess',
      price: '$50.00',
    },
    {
      key: 'order4',
      productImg: icon3,
      username: 'Dayat Santoso',
      email: 'dayat@gmail.com',
      product: 'UX Research - Power Courses',
      status: 'Cancel',
      color: 'lightError',
      price: '$79.00',
    },
  ];

  const PackedStatus = [
    {
      key: 'order1',
      productImg: icon3,
      username: 'Dayat Santoso',
      email: 'dayat@gmail.com',
      product: 'UX Research - Power Courses',
      status: 'Cancel',
      color: 'lightError',
      price: '$79.00',
    },
    {
      key: 'order2',
      productImg: icon1,
      username: 'Irpun Wicaksono',
      email: 'irpun@gmail.com',
      product: 'React Js - Online Classes',
      status: 'Progress',
      color: 'lightWarning',
      price: '$50.00',
    },
    {
      key: 'order3',
      productImg: icon4,
      username: 'Irpun Wicaksono',
      email: 'irpun@gmail.com',
      product: 'React Js - Online Classes',
      status: 'Delivered',
      color: 'lightSuccess',
      price: '$50.00',
    },
    {
      key: 'order4',
      productImg: icon2,
      username: 'Oyhan Ruhiyan',
      email: 'oyhan@gmail.com',
      product: 'Frontend Dev - Online Classes',
      status: 'Delivered',
      color: 'lightSuccess',
      price: '$49.00',
    },
  ];

  const statusTabs = ['Checkout', 'Paid', 'Packed'];
  const [status, setStatus] = useState('Checkout');
  const [filteredProducts, setFilteredProducts] = useState(CheckoutStatus);

  const handleStatus = (status: string) => {
    setStatus(status);
  };

  useEffect(() => {
    if (status === 'Checkout') {
      setFilteredProducts(CheckoutStatus);
    } else if (status === 'Paid') {
      setFilteredProducts(PaidStatus);
    } else {
      setFilteredProducts(PackedStatus);
    }
  }, [status]);

  return (
    <Card>
      <div className="flex lg:gap-0 gap-4 flex-wrap items-center justify-between mb-6">
        <div>
          <h4 className="card-title">Order Status</h4>
          <p className="card-subtitle">How to check your order status online</p>
        </div>

        <div className="flex items-center gap-3">
          {statusTabs.map((tab) => (
            <div
              key={tab}
              onClick={() => handleStatus(tab)}
              className={`py-2 px-4 text-base text-link dark:text-darklink
                ${status === tab ? 'bg-primary text-white dark:text-white' : ''}
                hover:bg-primary cursor-pointer rounded-md hover:text-white dark:hover:text-white`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-x-auto overflow-y-hidden">
              <Table className="overflow-y-hidden">
                <TableBody className="divide-y divide-border dark:divide-darkborder">
                  {filteredProducts.map((item, index) => (
                    <motion.tr
                      key={item.key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-b dark:border-darkborder"
                    >
                      <TableCell className="whitespace-nowrap md:min-w-auto min-w-[200px]">
                        <div className="flex gap-3 items-center">
                          <img src={item.productImg} alt="icon" className="w-10 rounded-md" />
                          <div>
                            <h6 className="text-sm font-semibold mb-1">{item.username}</h6>
                            <p className="text-xs font-normal text-bodytext dark:text-darklink">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        <p className="text-link dark:text-white text-sm w-fit">{item.product}</p>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        <p className="dark:text-white text-link text-sm">{item.price}</p>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        <div className="w-fit ms-auto">
                          <Badge variant={item.color as BadgeProps['variant']} className="text-sm">
                            <Icon
                              icon="tabler:point-filled"
                              className={`text-xl shrink-0 ${item.color}`}
                            />
                            <span>{item.status}</span>
                          </Badge>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
