import paypal from 'src/assets/images/svgs/icon-paypal2.svg';
import wallet from 'src/assets/images/svgs/icon-wallet.svg';
import credit from 'src/assets/images/svgs/icon-credit-card.svg';
import refund from 'src/assets/images/svgs/icon-pie2.svg';
import { Link } from 'react-router';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import AnimatedItem from 'src/components/animated-component/ListAnimation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const PaymentGateway = () => {
  const [hovered, setHovered] = useState(false);

  const paymentGateways = [
    {
      key: 'paymentOption1',
      paymentOption: 'Paypal',
      desc: 'Big Brands',
      amount: '+$450',
      paymentImg: paypal,
      color: 'bg-lightprimary dark:bg-lightprimary',
    },
    {
      key: 'paymentOption2',
      paymentOption: 'Google Pay',
      desc: 'Money added',
      paymentImg: wallet,
      amount: '+$345',
      color: 'bg-lightsuccess dark:bg-lightsuccess',
    },
    {
      key: 'paymentOption3',
      paymentOption: 'Credit card',
      desc: 'Money reversed',
      paymentImg: credit,
      amount: '+$2,235',
      color: 'bg-lightwarning dark:bg-lightwarning',
    },
    {
      key: 'paymentOption4',
      paymentOption: 'Refund ',
      desc: 'Bill payment',
      paymentImg: refund,
      amount: '-$32',
      color: 'bg-lighterror dark:bg-lighterror',
    },
  ];

  return (
    <Card className="h-full">
      <div className="flex flex-col gap-6 justify-between h-full">
        <div>
          <h5 className="card-title">Payment Gateways</h5>
          <p className="card-subtitle">Platform for income</p>
        </div>
        <div className="flex flex-col gap-6">
          {paymentGateways.map((item, index) => {
            return (
              <AnimatedItem key={item.key} index={index}>
                <div key={item.key} className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div
                      className={`${item.color} rounded-md flex items-center justify-center h-11 w-11`}
                    >
                      <img src={item.paymentImg} alt="paypal" className="h-6 w-6" />
                    </div>
                    <div>
                      <h6 className="text-base">{item.paymentOption}</h6>
                      <p className=" dark:text-darklink ">{item.desc}</p>
                    </div>
                  </div>
                  <p>{item.amount !== '' ? item.amount : null}</p>
                </div>
              </AnimatedItem>
            );
          })}
        </div>
        {/* <Button variant={'outline'} asChild className="w-full rounded-md">
          <Link to={'/frontend-pages/pricing'}>View all transactions</Link>
        </Button> */}
        {/* Button */}
        <Button asChild variant={'outline'} className="hover:!bg-transparent">
          <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative overflow-hidden cursor-pointer"
          >
            {/* Liquid Fill Layer */}
            <motion.span
              initial={{ height: '0%' }}
              animate={{ height: hovered ? '100%' : '0%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute bottom-0 left-0 w-full bg-primary z-0"
            />

            {/* Button Text */}
            <Link to={'/frontend-pages/pricing'} className="relative z-10">
              View all transactions
            </Link>
          </motion.button>
        </Button>
      </div>
    </Card>
  );
};
