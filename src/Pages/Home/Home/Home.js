import React from 'react';
import Banner from '../Banner/Banner';
import Cards from '../Cards/Cards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';
import Treatment from '../Treatment/Treatment';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner />
            <Cards />
            <Services />
            <Treatment />
            <MakeAppointment />
            <Testimonial />
        </div>
    );
};

export default Home;