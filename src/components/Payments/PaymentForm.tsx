import React, {useState} from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import * as api from "../../api/api";
import { PrimaryButton } from '../UI/Button';

const CARD_OPTIONS = {
    //iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#fce883',
            },
            '::placeholder': {
                color: '#87BBFD',
            },
        },
        invalid: {
            iconColor: '#FFC7EE',
            color: '#FFC7EE',
        },
    },
};


export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await api.makePayment({
                    amount: 1000,
                    id: id 
                });

                if(response.success) {
                    console.log("Successful payment");
                    setSuccess(true);
                }
            } catch (error) {
                console.log("Error", error);
            }
        } else {
            console.log(error.message)
        }
    }
    return (
        <>
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <PrimaryButton onClick={() => console.log("Subscription Clicked")}title={"Subscribe Now"}/>
        </form>
        : 
        <div>
            <h2>
                Thank you for subscribing!
            </h2>
        </div>
        }
        </>
    )
}
