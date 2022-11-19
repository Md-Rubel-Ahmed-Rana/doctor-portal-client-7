import React from 'react';

const AppointmentOptions = ({ appointmentOption, setTreatment }) => {
    const { name, slots, price } = appointmentOption
    return (
        <div className="card w-96 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : "Try another day" }</p>
                <p> {slots.length} {slots.length > 1 ? "spaces" : "space"} available</p>
                <p>Price: ${price}</p>
                <div className="card-actions">
                    <label 
                    disabled={slots.length === 0}
                    onClick={() => setTreatment(appointmentOption)} 
                    htmlFor="booking-modal" 
                    className="btn btn-primary"
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOptions;