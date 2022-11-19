import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyAppointment = () => {
    const {user} = useContext(AuthContext);

    const {data: bookings = []} = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json();
            return data
        }
    })

    return (
        <div>
            <h3 className="text-2xl">My Appointment</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='text-white'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((book, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{book.patient}</td>
                                <td>{book.treatment}</td>
                                <td>{book.appointmentDate}</td>
                                <td>{book.slot}</td>
                                <td>
                                    {
                                        book.price && !book.paid && <Link
                                            to={`/dashboard/payment/${book._id}`}
                                        >
                                            <button className='btn btn-primary btn-xs'>Pay</button>
                                        </Link>
                                    }
                                    {
                                        book.price && book.paid && <span className='text-primary'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;