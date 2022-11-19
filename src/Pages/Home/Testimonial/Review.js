import React from 'react';

const Review = ({ review }) => {
    const {img, name, country, review: userReview} = review
    return (
        <div className="card shadow-xl text-black mt-5">
            <div className="card-body">
                <p>{userReview}</p>
                <div className="flex items-center gap-5">
                    <div className="avatar w-10 h-10">
                        <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt="" />
                        </div>
                    </div>
                    <div>
                        <h5 className='text-lg'>{name}</h5>
                        <p>{country}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;