import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_51KuwbmATqmUvIGSpGY1Fy9fTqzjtYBrFKTJJs8pyO5ROq5Chgg6SypnuFiMkKhisGKgZYD4DeGfnzpcpoWJbgWJU00jt77dj1Q"


const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}


