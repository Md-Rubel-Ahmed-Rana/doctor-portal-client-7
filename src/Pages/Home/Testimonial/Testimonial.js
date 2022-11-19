import React from 'react';
import quote from "../../../assets/icons/quote.svg"
import people1 from "../../../assets/images/people1.png"
import people2 from "../../../assets/images/people2.png"
import people3 from "../../../assets/images/people3.png"
import Review from './Review';

const Testimonial = () => {
    const reviews = [
        {
            id: 1,
            name: "Winson Herry",
            img: people1,
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            country: "California"

        },
        {
            id: 1,
            img: people2,
            name: "Winson Herry",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            country: "California"

        },
        {
            id: 1,
            name: "Winson Herry",
            img: people3,
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            country: "California"

        },
        
    ]

    return (
        <setion>
            <div className='p-20'>
                <div className='flex justify-between'>
                    <div>
                        <h5 className='text-lg'>Testimonial</h5>
                        <h3 className='text-4xl'> What Our Patients Says</h3>
                    </div>
                    <figure> <img className='w-24' src={quote} alt="" /> </figure>
                </div>
                <div className='grid lg:grid-cols-3 gap-10'>
                    {
                        reviews.map((review) => <Review review={review} key={review.id} />)
                    }
                </div>
            </div>
        </setion>
    );
};

export default Testimonial;