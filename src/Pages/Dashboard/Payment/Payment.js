import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation()
    const { treatment, price } = booking;

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
    if (navigation.state === "loading"){
        return <Loading />
    }
    return (
        <div>
            <h4 className='text-3xl'>Payment for: {treatment}</h4>
            <p>Please pay <strong>${price}</strong> for your treatment.</p>
            <div className='w-96 my-10'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;