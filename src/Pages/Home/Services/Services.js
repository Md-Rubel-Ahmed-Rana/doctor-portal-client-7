import React from 'react';
import Fluoride from "../../../assets/images/fluoride.png"
import Cavity from "../../../assets/images/cavity.png"
import Teeth from "../../../assets/images/whitening.png"
import Service from './Service';

const Services = () => {
    const serviceData = [
        {
            id: 1,
            name: "Fluoride Treatment",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: Fluoride,
        },
        {
            id: 1,
            name: "Cavity Filling",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: Cavity,
        },
        {
            id: 1,
            name: "Teeth Whitening",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: Teeth,
        },
    ]
    return (
        <div className='my-10'>
            <div className='text-center my-5'>
                <h4 className='text-2xl'>Our Services</h4>
                <h2 className='text-4xl'>Services We Provide</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    serviceData.map((service) => <Service service={service} key={service.id} />)
                }
            </div>
        </div>
    );
};

export default Services;