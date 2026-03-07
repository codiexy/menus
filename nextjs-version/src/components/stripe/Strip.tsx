// pages/index.tsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51O23yNGJcV2oYihkgBLwWx2wRIW7A0SRhczVyXMshSzbuoHn4C36IsrMWOMeJ4eZtf5jCoShjLXu8wpygsvgOtZc00m0DvewLN');

const StripePayment: React.FC = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripePayment;
