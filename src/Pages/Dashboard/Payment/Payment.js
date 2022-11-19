import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking);
    return (
        <div>
            <h4 className='text-3xl'>Payment for: {booking.treatment}</h4>
        </div>
    );
};

export default Payment;