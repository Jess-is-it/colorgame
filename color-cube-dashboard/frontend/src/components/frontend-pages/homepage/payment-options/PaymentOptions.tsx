import visa from "src/assets/images/frontend-pages/payments/visa.svg";
import mastercard from "src/assets/images/frontend-pages/payments/master.svg";
import express from "src/assets/images/frontend-pages/payments/american-exp.svg";
import discover from "src/assets/images/frontend-pages/payments/discover.svg";
import paypal from "src/assets/images/frontend-pages/payments/paypal.svg";
import maaestro from "src/assets/images/frontend-pages/payments/maesro.svg";
import jcb from "src/assets/images/frontend-pages/payments/jcb.svg"
import dinners from "src/assets/images/frontend-pages/payments/dinners-clb.svg"


export const PaymentOptions = () => {
    const paymentOptions = [
        {
            key: "option1",
            img: visa
        },
        {
            key: "option2",
            img: mastercard
        },
        {
            key: "option3",
            img: express
        },
        {
            key: "option4",
            img: discover
        },
        {
            key: "option5",
            img: paypal
        },
        {
            key: "option6",
            img: maaestro
        },
        {
            key: "option7",
            img: jcb
        },
        {
            key: "option8",
            img: dinners
        },
    ]
    return (
        <>
            <div className="px-4 pt-12">
                <p className="text-base font-medium text-lightmuted dark:text-darklink text-center mb-8">Secured payment with PayPal & Razorpay</p>
                <div className="flex items-center flex-wrap justify-center gap-12">
                    {
                        paymentOptions.map((item) => {
                            return (
                                <img key={item.key} src={item.img} alt="payment" />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}