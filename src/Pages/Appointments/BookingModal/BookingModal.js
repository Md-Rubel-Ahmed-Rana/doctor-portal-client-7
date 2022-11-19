import { format } from 'date-fns';
import React, { useContext } from 'react';
import swal from 'sweetalert';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name: treatmentName, slots, price } = treatment;
    const date = format(selectedDate, "PP");
    const {user} = useContext(AuthContext)

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const date = form.date.value;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            patient: name,
            slot,
            email,
            phone,
            price
        };

        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(booking)
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.acknowledged){
                setTreatment(null);
                swal("Good job!", "Booking completed", "success");
                refetch()
            }else{
                swal("Good job!", `${data.message}`, "error");
            }
        })
        .catch((err) => console.log(err))
 
        
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleBooking} className="modal-box relative text-center">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-2">{treatmentName}</h3>
                    <input type="text" name='date'   value={date} readOnly className="input mb-2 input-bordered input-primary w-full max-w-xs" />
                    <select name="slot" className="select  select-bordered w-full mb-3 max-w-xs">
                        {
                            slots.map((slot, index) => <option  key={index} value={slot}>{slot}</option>)
                        }
                    </select>
                    <input defaultValue={user?.displayName} type="text" name='name' placeholder="Your Name" className="input mb-3 input-bordered input-primary w-full max-w-xs" />

                    <input defaultValue={user?.email} type="email" name='email' placeholder="Email Address" className="input mb-3 input-bordered input-primary w-full max-w-xs" readOnly />

                    <input type="text" name='phone' placeholder="Phone Number" className="input mb-3 input-bordered input-primary w-full max-w-xs" />

                    <input type="submit" placeholder="Type here" className="btn btn-primary mb-2 input-primary w-full max-w-xs" />
                </form>
            </div>
        </>
    );
};

export default BookingModal;