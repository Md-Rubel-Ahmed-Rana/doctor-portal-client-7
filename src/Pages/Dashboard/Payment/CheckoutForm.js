import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState("");
    const [success, setSuccess] = useState("");
    const [transectionId, setTransectionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const { _id, patient, email, price } = booking

    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ price: booking.price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [booking.price]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }

        const {error} = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if(error){
            setCardError(error.message);
        }else{
            setCardError("")
        }

        setCardError("");
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email

                    },
                },
            },
        );
        if (confirmError){
            setCardError(confirmError.message)
            return;
        }
        if (paymentIntent.status === "succeeded"){
            const payment = {
                price,
                transectionId: paymentIntent.id,
                email,
                booking_id: _id

            }

            fetch("http://localhost:5000/payments", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(payment)
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId){
                setSuccess("Congrats!! your payment completed")
                setTransectionId(paymentIntent.id) 
                }
            })
        }
        setProcessing(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button className='btn btn-primary btn-xs mt-6 px-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-400">{cardError}</p>
            {
                success && <div>
                    <h3>{success}</h3>
                    <p>TransectionId: {transectionId}</p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;