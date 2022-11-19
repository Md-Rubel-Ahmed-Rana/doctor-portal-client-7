import React from 'react';
import treatment from "../../../assets/images/treatment.png"
const Treatment = () => {
    return (
        <div className="card lg:card-side shadow-xl lg:px-20">
            <figure><img  src={treatment} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title">Exceptional Dental Care, on Your Terms</h2>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">GET STARTED</button>
                </div>
            </div>
        </div>
    );
};

export default Treatment;