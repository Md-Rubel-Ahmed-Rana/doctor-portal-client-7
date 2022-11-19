import React from 'react';

const Service = ({ service }) => {
    const { name, description, icon } = service;
    return (
        <div className="card  p-5 shadow-xl">
            <figure><img className='w-20 h-20' src={icon} alt="" /></figure>
            <div className="card-body ">
                <h2 className="card-title text-center mx-auto">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Service;