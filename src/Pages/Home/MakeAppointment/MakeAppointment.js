import React from 'react';
import doctor from "../../../assets/images/doctor.png"
import appointment from "../../../assets/images/appointment.png"
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section
        style={{
                background: `${appointment}`
        }}
        >
            <div className="hero bg-slate-50 mt-40">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} className="lg:w-1/2  -mt-32 hidden lg:block md:block rounded-lg" alt='' />
                    <div className='text-black'>
                        <h4>Appointment</h4>
                        <h1 className="text-3xl font-bold">Make an appointment Today</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page.</p>
                        <PrimaryButton>Getting started</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;