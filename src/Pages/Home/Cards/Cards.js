import React from 'react';
import clock from "../../../assets/icons/clock.svg"
import marker from "../../../assets/icons/marker.svg"
import phone from "../../../assets/icons/phone.svg"
import Card from './Card';

const Cards = () => {
    const cardData = [
        {
            id: 1,
            name: "Opening hours",
            description: "Open 9.00 am to  5.00 pm everyday",
            icon: clock,
            bgClass: "bg-gradient-to-r from-primary to-secondary"
        },
        {
            id: 1,
            name: "Visit our location",
            description: "Open 9.00 am to  5.00 pm everyday",
            icon: marker,
            bgClass: "bg-accent"
        },
        {
            id: 1,
            name: "Contact Us",
            description: "Open 9.00 am to  5.00 pm everyday",
            icon: phone,
            bgClass: "bg-gradient-to-r from-primary to-secondary"
        },
    ]

    
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                cardData.map((card) => <Card card={card} key={card.id} /> )
            }
        </div>
    );
};

export default Cards;