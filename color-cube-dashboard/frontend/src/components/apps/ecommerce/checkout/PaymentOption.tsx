import { useState } from 'react';
import OutlineCard from 'src/components/shared/OutlineCard';
import paypal from 'src/assets/images/svgs/paypal.svg';
import master from 'src/assets/images/svgs/mastercard.svg';
import payment from 'src/assets/images/backgrounds/payment.svg';
import { Label } from 'src/components/ui/label';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';

const PaymentOption = () => {
  const [selectedPayment, setSelectedPayment] = useState('payment');

  return (
    <>
      <OutlineCard className="mt-[30px]">
        <h6 className="text-base mb-2">Payment Option</h6>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-8 col-span-12">
            <RadioGroup
              value={selectedPayment}
              onValueChange={setSelectedPayment}
              className="flex flex-col gap-4"
            >
              {/* PayPal Option */}
              <div
                className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${
                  selectedPayment === 'payment' ? 'bg-lightprimary border-primary' : ''
                }`}
              >
                <div className="flex items-center gap-4 sm:ps-2">
                  <RadioGroupItem id="paypal" value="payment" className="peer hidden" />
                  <Label
                    htmlFor="paypal"
                    className="cursor-pointer grow peer-checked:[&_.title]:text-primary peer-checked:[&_.title]:font-semibold"
                  >
                    <div className="title text-ld font-semibold text-base">Pay with Paypal</div>
                    <p className="text-sm font-medium text-darklink">
                      You will be redirected to PayPal website to complete your purchase securely.
                    </p>
                  </Label>
                  <img src={paypal} alt="payment-icon" />
                </div>
              </div>

              {/* Credit Card Option */}
              <div
                className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${
                  selectedPayment === 'Credit' ? 'bg-lightprimary border-primary' : ''
                }`}
              >
                <div className="flex items-center gap-4 sm:ps-2">
                  <RadioGroupItem id="master" value="Credit" className="peer hidden" />
                  <Label
                    htmlFor="master"
                    className="cursor-pointer grow peer-checked:[&_.title]:text-primary peer-checked:[&_.title]:font-semibold"
                  >
                    <div className="title text-ld font-semibold text-base">Credit / Debit Card</div>
                    <p className="text-sm font-medium text-darklink">
                      We support Mastercard, Visa, Discover and Stripe.
                    </p>
                  </Label>
                  <img src={master} alt="payment-icon" />
                </div>
              </div>

              {/* Cash on Delivery Option */}
              <div
                className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${
                  selectedPayment === 'Cash' ? 'bg-lightprimary border-primary' : ''
                }`}
              >
                <div className="flex items-center gap-4 sm:ps-2">
                  <RadioGroupItem id="cash" value="Cash" className="peer hidden" />
                  <Label
                    htmlFor="cash"
                    className="cursor-pointer grow peer-checked:[&_.title]:text-primary peer-checked:[&_.title]:font-semibold"
                  >
                    <div className="title text-ld font-semibold text-base">Cash on Delivery</div>
                    <p className="text-sm font-medium text-darklink">
                      Pay with cash when your order is delivered.
                    </p>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="mx-auto">
              <img src={payment} alt="payment" className="w-full" />
            </div>
          </div>
        </div>
      </OutlineCard>
    </>
  );
};

export default PaymentOption;
