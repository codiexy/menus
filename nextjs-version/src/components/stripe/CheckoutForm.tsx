// components/CheckoutForm.tsx
import React, { useState } from 'react';
import { useStripe, useElements, CardElement, ElementsConsumer, AfterpayClearpayMessageElement } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [details, setDetails] = useState<any | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const { error, paymentMethod }: any = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)!,
        });

        if (error) {
            console.error(error);
            setPaymentError(error.message);
        } else {

            setDetails(paymentMethod)
            // Handle successful payment, e.g., send paymentMethod.id to your server
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card Details
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </label>
            {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
            <Button type="submit" disabled={!stripe} variant="contained">
                Pay
            </Button>
        </form>
    );
};

export default CheckoutForm;
